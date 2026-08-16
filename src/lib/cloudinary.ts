import { v2 as cloudinary } from "cloudinary";
import { isCloudinaryConfigured } from "@/lib/utils";

function configure() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export async function uploadToCloudinary(
  file: File,
  folder: "videos" | "thumbnails" | "images" | "media",
  resourceType: "image" | "video" | "auto" = "auto",
) {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured.");
  }

  configure();
  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

  return cloudinary.uploader.upload(dataUri, {
    folder: `stopsuicide/${folder}`,
    resource_type: resourceType,
  });
}

export function cloudinaryConfigured() {
  return isCloudinaryConfigured();
}
