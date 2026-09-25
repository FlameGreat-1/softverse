import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import fs from "fs";

const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY;
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_KEY;
const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || "softverse-uploads";
const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL || "https://pub-xxxx.r2.dev";

let s3Client: S3Client | null = null;

if (accountId && accessKeyId && secretAccessKey) {
  s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
} else {
  console.warn("Cloudflare R2 credentials are missing in .env. File uploads will be skipped.");
}

/**
 * Uploads a local file from disk to Cloudflare R2
 */
export const uploadToR2 = async (filePath: string, originalName: string, mimeType: string): Promise<string | null> => {
  if (!s3Client) return null;

  const fileExtension = originalName.split(".").pop();
  const randomName = crypto.randomBytes(16).toString("hex");
  const key = `projects/${randomName}.${fileExtension}`;

  const fileStream = fs.createReadStream(filePath);

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: fileStream,
      ContentType: mimeType,
    });

    await s3Client.send(command);
    
    return `${publicUrl}/${key}`;
  } catch (error) {
    console.error("Error uploading to R2:", error);
    throw error;
  }
};
