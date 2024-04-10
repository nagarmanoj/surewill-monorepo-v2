import { SNSClient } from "@aws-sdk/client-sns";
import { PublishCommand, PublishCommandInput } from "@aws-sdk/client-sns";
import { env } from "@/env.mjs";

export const snsClient = new SNSClient({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: env.AWS_SUREWILL_ACCESS_KEY,
    secretAccessKey: env.AWS_SUREWILL_SECRET_KEY,
  },
});

export const sendSnsNotification = (willId: string) => {
  let params: PublishCommandInput = {
    Message: willId,
    TopicArn: env.AWS_SNS_TOPIC_ARN,
  };
  return snsClient.send(new PublishCommand(params));
};
