import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const S3_BUCKET = process.env.REACT_APP_AWS_BUCKET_NAME;

export const uploadImageToS3 = async (file: File): Promise<string | null> => {
  if (!file) return null;

  const fileName = `uploads/${Date.now()}_${file.name}`;

  const params: AWS.S3.PutObjectRequest = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: file,
    ContentType: file.type,
    ACL: "public-read", 
  };

  try {
    const { Location } = await s3.upload(params).promise();
    console.log("Uploaded to S3:", Location);
    return Location; 
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

export const uploadMultipleImagesToS3 = async (files: File[]): Promise<string[]> => {
  const uploadPromises = files.map((file) => uploadImageToS3(file));
  const uploadedUrls = await Promise.all(uploadPromises);

  return uploadedUrls.filter((url): url is string => url !== null);
};

export const getPublicUrl = (fileName: string): string => {
  return `https://${S3_BUCKET}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${fileName}`;
};
