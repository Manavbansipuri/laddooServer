import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure directory exists
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "";

    if (file.mimetype.startsWith("image/")) uploadPath = "uploads/images/";
    else if (
      file.mimetype.startsWith("audio/") ||
      file.mimetype === "audio/mpeg" ||
      file.mimetype === "audio/wav" ||
      file.mimetype === "audio/mp4" ||
      file.mimetype === "audio/x-m4a" ||
      file.mimetype === "audio/ogg" ||
      file.mimetype === "audio/x-wav" ||
      file.mimetype === "audio/webm" ||
      file.mimetype === "video/mp4"
    ) uploadPath = "uploads/audio/";
    else return cb(new Error("Invalid file type. Only images and audio files are allowed."), false);

    ensureDirExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});

// File filter for images and audio
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("audio/") ||
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/wav" ||
    file.mimetype === "audio/mp4" ||
    file.mimetype === "audio/x-m4a" ||
    file.mimetype === "audio/ogg" ||
    file.mimetype === "audio/x-wav" ||
    file.mimetype === "audio/webm" ||
    file.mimetype === "video/mp4"
  ) cb(null, true);
  else cb(new Error("Only image and audio files (including mp3, mp4, wav, m4a, ogg, webm) are allowed!"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 300 * 1024 * 1024 }, // 300MB file size limit
});

export default upload;