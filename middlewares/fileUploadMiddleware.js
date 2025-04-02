import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

// Initialize S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Allowed file formats
const allowedMimeTypes = [
  "audio/mpeg", "audio/mp4", "audio/wav", "audio/x-wav", "audio/aac", "audio/flac",
  "audio/ogg", "audio/x-m4a", "audio/webm", "video/mp4", // Handling some MP4 files as audio
  "image/jpeg", "image/png", "image/webp"
];

// File Filter to Allow Only Images & Audio (including MP4 audio)
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    if (file.mimetype === "video/mp4") {
      // Some MP4 files are actually audio, so allow them
      cb(null, true);
    } else {
      cb(null, true);
    }
  } else {
    cb(new Error("Only images and audio files are allowed!"), false);
  }
};

// Multer S3 Storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileType = file.mimetype.startsWith("image/") ? "images" : "songs";
      cb(null, `${fileType}/${Date.now()}-${file.originalname}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
  fileFilter,
  limits: { fileSize: 300 * 1024 * 1024 }, // 300MB file limit
});

export default upload;
