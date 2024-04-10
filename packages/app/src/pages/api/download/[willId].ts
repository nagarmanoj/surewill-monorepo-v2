import { getAuth } from "@clerk/nextjs/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "~/libs/s3";
import { db } from "~/libs/prisma";
import { getWillDocumentName } from "~/utils/will";
import { env } from "@/env.mjs";
import { NextApiRequest, NextApiResponse } from "next";

const S3_FILENAME = "will.pdf";

const handler = async (request: NextApiRequest, res: NextApiResponse) => {
  const { userId: authUserId } = getAuth(request);
  const { willId } = request.query;

  const will = await db.will.findFirst({
    where: {
      id: willId as string,
    },
    select: {
      userId: true,
      firstName: true,
      lastName: true,
      user: {
        select: {
          authUserId: true,
        },
      },
    },
  });

  const isWillOwner = will?.user?.authUserId === authUserId;
  if (!isWillOwner) {
    return res.status(401).send({ success: false, error: "Not Authorized." });
  }

  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: `${willId}/${S3_FILENAME}`,
    ResponseContentEncoding: "application/json",
  });

  const response = await s3Client.send(command);
  const fileName = getWillDocumentName({
    firstName: will.firstName,
    lastName: will.lastName,
  });

  if (response.ContentLength) {
    res.setHeader("Content-Length", response.ContentLength);
  }

  if (response.ContentType) {
    res.setHeader("Content-Type", response.ContentType);
  }

  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

  return res.send(response.Body);
};

export default handler;
