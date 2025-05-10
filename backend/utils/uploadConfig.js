//utils/uploadConfig.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const rootDir = "public/images/";
const usersDir = "public/images/users/";
const petsDir = "public/images/pets/";

const ensureDirectoriesExist = () => {
  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir, { recursive: true });
  }
  if (!fs.existsSync(usersDir)) {
    fs.mkdirSync(usersDir, { recursive: true });
  }
  if (!fs.existsSync(petsDir)) {
    fs.mkdirSync(petsDir, { recursive: true });
  }
};

ensureDirectoriesExist();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) {
    return cb(null, true);
  }
  cb(new Error("Only image files are allowed"));
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isUserPhoto = req.body.type === "user";
    const destination = isUserPhoto ? usersDir : petsDir;
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = upload;
