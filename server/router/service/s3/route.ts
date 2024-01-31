import { protectedProcedure, publicProcedure, router } from "@/server/trpc";
import { generateFileName } from "@/server/utils";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@clerk/nextjs";
import * as z from "zod";

export const getSignedURL = protectedProcedure
  .input(z.object({ type: z.string(), size: z.number(), checksum: z.string() }))
  .mutation(async ({ input, ctx }) => {
    const { userId } = ctx.auth;
    const { type, size, checksum } = input;

    const s3 = new S3Client({
      region: process.env.AWS_BUCKET_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: generateFileName(),
      ContentType: type,
      ContentLength: size,
      ChecksumSHA256: checksum,
      Metadata: {
        userId: userId,
      },
    });

    const signedUrl = await getSignedUrl(s3, putObjectCommand, {
      expiresIn: 60,
    });

    return { success: { url: signedUrl } };
  });

// export const uploadFile = protectedProcedure
//   .input(
//     z.object({
//       z.infer<typeof FormData>;
//     })
//   )
//   .mutation(async (opts) => {
//     const { input, ctx } = opts;
//     opts

//     // 1. Get File Blob Url
//     const { fileBlobUrl } = input;

//     // 2. Convert file blob url, to file
//     const blob = await fetch(fileBlobUrl).then(async (res) => await res.blob());
//     const file = new File([blob], "image-test", { type: blob.type });

//     console.log(file);

//     // 3. return file
//     return file;
//   });

const s3Router = router({
  getSignedURL,
  // uploadFile,
});

export const s3 = s3Router;
