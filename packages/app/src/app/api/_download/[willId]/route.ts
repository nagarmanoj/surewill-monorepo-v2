import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { withAuth, RequestWithAuth } from "~/libs/auth";
import { s3Client } from "~/libs/s3";
import { db } from "~/libs/prisma";
import { getWillDocumentName } from "~/utils/will";
import { env } from "@/env.mjs";

const FILENAME = "will.pdf";

const getHandler = async (
  request: RequestWithAuth,
  {
    params,
  }: {
    params: {
      willId: string;
    };
  }
) => {
  try {
    const will = await db.will.findFirst({
      where: {
        id: params.willId,
      },
      select: {
        userId: true,
        firstName: true,
        lastName: true,
      },
    });
    const isWillOwner = will?.userId === request.user.id;
    if (!isWillOwner) {
      return NextResponse.json(
        { success: false, error: "Not Authorized." },
        { status: 401 }
      );
    }

    const command = new GetObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: `${params.willId}/${FILENAME}`,
      ResponseContentEncoding: "application/json",
    });

    const response = await s3Client.send(command);
    const fileName = getWillDocumentName({
      firstName: will.firstName,
      lastName: will.lastName,
    });

    return new Response(response.Body as ReadableStream, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename=${fileName}`,
      },
    });
  } catch {
    return new Response(null, {
      status: 400,
    });
  }
};

export const GET = withAuth(getHandler);
