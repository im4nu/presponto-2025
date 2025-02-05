import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { env } from "../../env";

export const s3Client = new S3Client({
  endpoint: env.MINIO_URL,
  region: env.S3_REGION,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
});

export async function getPresignedPost(key: string) {
  const presignedPost = await createPresignedPost(s3Client, {
    Bucket: env.S3_BUCKET,
    Key: key,
    Conditions: [{ bucket: env.S3_BUCKET }, { key }],
  });

  return presignedPost;
}

export async function getSignedURL(key: string, expiresIn = 600 /* 10min */) {
  const presignedUrl = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: key,
    }),
    {
      expiresIn,
    },
  );

  return presignedUrl;
}

export async function uploadFile(key: string, file: Buffer, mimetype?: string) {
  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
    Body: file,
    ContentType: mimetype,
  });

  await s3Client.send(command);
}

export function getFileUrl(key: string) {
  if (env.MINIO_URL) return `${env.MINIO_URL}/${env.S3_BUCKET}/${key}`;

  return `https://${env.S3_BUCKET}.s3.${env.S3_REGION}.amazonaws.com/${key}`;
}
