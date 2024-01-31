import crypto from "crypto";

export async function createFile(input: { fileBlobUrl: string }) {
  // 1. Get File Blob Url
  const { fileBlobUrl } = input;

  // 2. Convert file blob url, to file
  const blob = await fetch(fileBlobUrl).then(async (res) => await res.blob());
  const file = new File([blob], "image-test", { type: blob.type });

  return file;
}

export function generateFileName(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex");
}

export async function computeSHA256(file: File) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

export function createFormData(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  return formData;
}
