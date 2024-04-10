import { S3Client } from "@aws-sdk/client-s3";
import type { Readable } from "stream";
import { env } from "@/env.mjs";

export const s3Client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: env.AWS_SUREWILL_ACCESS_KEY,
    secretAccessKey: env.AWS_SUREWILL_SECRET_KEY,
  },
});

export async function streamToString(stream: Readable): Promise<string> {
  stream.setEncoding("base64");
  return await new Promise((resolve, reject) => {
    const chunks: String[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(chunks.join()));
  });
}
