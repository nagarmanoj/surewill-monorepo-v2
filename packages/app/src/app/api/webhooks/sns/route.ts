import { NextResponse } from "next/server";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { ConfirmSubscriptionCommand } from "@aws-sdk/client-sns";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import type { Readable } from "stream";
import clerk from "@clerk/clerk-sdk-node";
import {
  sendWillCreatedWillExecutorEmail,
  sendWillCreatedWillOwnerEmail,
  sendWillCreatedWillBackupExecutorEmail,
} from "~/libs/mailchimp";
import { s3Client, streamToString } from "~/libs/s3";
import { snsClient } from "~/libs/sns";
import { db } from "~/libs/prisma";
import { env } from "@/env.mjs";

async function handler(request: Request) {
  try {
    const payload = await request.json();
    const messageType = payload?.Type;
    switch (messageType) {
      case "SubscriptionConfirmation":
        const params = {
          Token: payload.Token,
          TopicArn: payload.TopicArn,
        };
        await snsClient.send(new ConfirmSubscriptionCommand(params));
        return new Response(null, { status: 200 });
      case "Notification":
        console.log("Receiving payload >>>", payload);
        const payloadMessage = JSON.parse(payload.Message);
        const uploadedFileKey = payloadMessage.Records?.[0]?.s3?.object?.key;
        const command = new GetObjectCommand({
          Bucket: env.AWS_S3_BUCKET_NAME,
          Key: uploadedFileKey,
        });
        const response = await s3Client.send(command);
        const willId = uploadedFileKey.split("/")[0];
        const will = await db.will.findFirst({
          where: {
            id: willId,
          },
          include: {
            people: true,
            user: {
              select: {
                authUserId: true,
              },
            },
          },
        });

        // If the first and latest generations are within 2 minutes, it's most likely that the Will was generated more than once on create
        // and therefore isn't actually an "update"
        let isNewWill = true;
        if (will?.firstGeneratedAt && will?.lastGeneratedAt) {
          const differenceBetweenFirstAndLastGenerated = differenceInMinutes(
            new Date(will.lastGeneratedAt),
            new Date(will.firstGeneratedAt)
          );
          if (differenceBetweenFirstAndLastGenerated > 2) {
            isNewWill = false;
          }
        }

        const willExecutor = will?.people?.find(
          (person) => person.category === "EXECUTOR"
        );
        const backupExecutor = will?.people?.find(
          (person) => person.category === "EXECUTOR_BACKUP"
        );

        // Get the user's email address from Clerk, because we don't store this in our own database
        const authUser = await clerk.users.getUser(
          will?.user?.authUserId as string
        );
        const emailAddress = authUser.emailAddresses.find(
          (email) => email.id === authUser.primaryEmailAddressId
        )?.emailAddress as string;

        // Format the file for attachment and send email
        const formattedFile = await streamToString(response.Body as Readable);

        const emailsToSend = [
          sendWillCreatedWillOwnerEmail({
            toEmail: emailAddress,
            willAttachment: formattedFile,
            willOwnerFirstName: will?.firstName || "",
            willOwnerLastName: will?.lastName || "",
            isWillUpdate: !isNewWill,
          }),
        ];

        if (willExecutor?.email && willExecutor?.fullName) {
          emailsToSend.push(
            sendWillCreatedWillExecutorEmail({
              toEmail: willExecutor.email,
              executorName: willExecutor.fullName,
              willOwnerName: `${will?.firstName} ${will?.lastName}`,
            })
          );
        }

        if (backupExecutor?.email && backupExecutor?.fullName) {
          emailsToSend.push(
            sendWillCreatedWillBackupExecutorEmail({
              toEmail: backupExecutor.email,
              backupExecutorName: backupExecutor.fullName,
              willOwnerName: `${will?.firstName} ${will?.lastName}`,
            })
          );
        }

        await Promise.all(emailsToSend);
        return new Response(null, { status: 200 });
      default:
        return new Response(null, { status: 200 });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: `Webhook Error: ${error?.message}` },
      {
        status: 400,
      }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
