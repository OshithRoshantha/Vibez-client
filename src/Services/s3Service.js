import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";

const s3 = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  }
});

const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME;

export const uploadFile = async (file) => {
  try {
    const buffer = await file.arrayBuffer();

    const params = {
      Bucket: BUCKET_NAME,
      Key: `uploads/${Date.now()}-${file.name}`,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);
    const data = await s3.send(command);
    return `https://${BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${params.Key}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;  
  }
};


export const uploadMultipleFiles = async (files) => {
  try {
    const uploadPromises = files.map(file => uploadFile(file));
    const uploadUrls = await Promise.all(uploadPromises);
    return uploadUrls;
  } catch (error) {
    console.error("Error uploading multiple files:", error);
    throw error; 
  }
};
