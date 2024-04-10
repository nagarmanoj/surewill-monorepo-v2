import express from "express";
import env from "dotenv";
import { ConfirmSubscriptionCommand } from "@aws-sdk/client-sns";
import * as Sentry from "@sentry/node";
import {
  generateAndUploadWill,
  updateWillGenerationValues,
} from "./services/will";
import { prisma } from "./libs/prisma";
import { snsClient } from "./libs/sns";

env.config();
const app = express();

if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}
app.use(Sentry.Handlers.requestHandler());

app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    express.json({
      type: [
        "application/json",
        "text/plain", // AWS sends this content-type for its messages/notifications
      ],
    })(req, res, next);
  }
);

app.post("/webhook/sns", async (req, res) => {
  const payload = req.body;
  const messageType = payload.Type;
  try {
    switch (messageType) {
      case "SubscriptionConfirmation":
        const params = {
          Token: payload.Token,
          TopicArn: payload.TopicArn,
        };
        await snsClient.send(new ConfirmSubscriptionCommand(params));
        return res.sendStatus(200);
      case "Notification":
        const willId = payload.Message;
        if (!willId) {
          return res.send(400).json({
            success: false,
            message: "Notification is missing Will ID in message.",
          });
        }
        const will = await prisma.will.findFirst({
          where: {
            id: willId,
          },
        });
        if (!will) {
          return res.status(400).json({
            success: false,
            message: `Will not found with ID ${willId}`,
          });
        }
        await generateAndUploadWill(will);
        await updateWillGenerationValues(will);
        return res.sendStatus(200);
      default:
        return res.sendStatus(200);
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
});

app.get("/health-check", (_, res) => {
  res.sendStatus(200);
});

app.use(Sentry.Handlers.errorHandler());

app.listen(process.env.PORT || 8000, () => {
  console.log(
    `The application is listening on port ${process.env.PORT || 8000}! 🚀`
  );
});
