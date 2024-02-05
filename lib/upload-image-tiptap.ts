import { uploadImageToS3 } from "@/server/router/service/s3/controller";
import { computeSHA256, createFile, createFormData } from "@/server/utils";

export async function recursUploadImage(
  obj: Record<string, any>,
  s3Getter: ({
    size,
    type,
  }: {
    size: number;
    type: string;
    checksum: string;
  }) => Promise<{ success: { url: string } }>
) {
  if (obj["content"] && Array.isArray(obj["content"])) {
    for (let content of obj["content"]) {
      await recursUploadImage(content, s3Getter);
    }
  } else {
    if (obj["type"] === "image") {
      const fileBlobUrl = obj.attrs.src;
      // 1. Create file from FileBlobURL
      const file = await createFile({ fileBlobUrl });

      // 2. Get Signed URL
      const { size, type } = file;
      const s3URL = await s3Getter({
        size,
        type,
        checksum: await computeSHA256(file),
      });

      if (!s3URL.success) throw new Error("Can't generate URL to upload image");

      // 3. Create Form Data and upload
      const formData = createFormData(file);
      const { data: uploadedURL } = await uploadImageToS3(
        formData,
        s3URL.success.url
      );

      // 4. Attach the URL to image
      obj.attrs.src = uploadedURL;
    }
  }
}
