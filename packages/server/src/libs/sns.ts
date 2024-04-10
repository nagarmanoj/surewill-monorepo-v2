import { SNSClient } from "@aws-sdk/client-sns";
import { awsAccessKey, awsSecretKey } from "../env";

export const snsClient = new SNSClient({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  },
});
