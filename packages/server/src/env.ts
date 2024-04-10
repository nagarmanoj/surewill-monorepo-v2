import "dotenv/config";

export const databaseUrl = process.env.DATABASE_URL as string;
if (!databaseUrl) {
  throw new Error("Missing env variable DATABASE_URL");
}

export const surewillAppUrl = process.env.SUREWILL_APP_URL as string;
if (!surewillAppUrl) {
  throw new Error("Missing env variable SUREWILL_APP_URL");
}

export const awsAccessKey = process.env.AWS_SUREWILL_ACCESS_KEY as string;
if (!awsAccessKey) {
  throw new Error("Missing env variable AWS_SUREWILL_SECRET_KEY");
}
export const awsSecretKey = process.env.AWS_SUREWILL_SECRET_KEY as string;
if (!awsSecretKey) {
  throw new Error("Missing env variable AWS_SUREWILL_SECRET_KEY");
}
export const awsS3BucketName = process.env.AWS_S3_BUCKET_NAME as string;
if (!awsS3BucketName) {
  throw new Error("Missing env variable AWS_S3_BUCKET_NAME");
}
