"use server";

import { auth } from "@clerk/nextjs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const getSignedURL = async () => {
  const session = await auth();

  if (!session) {
    return { error: "Not authenticated" };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: "test-file",
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedUrl } };
};

export const uploadFile = async (form: FormData, url: string) => {
  const file = form.get("image") as File;

  const uploadRes = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });
  console.log(uploadRes);
};
