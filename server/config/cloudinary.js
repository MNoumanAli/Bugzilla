import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_ACCESS_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: process.env.CLOUD_FOLDER,
  allowedFormats: ["png", "gif"],
});

const parser = multer({ storage: storage });
export default parser;
