const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Define the upload directory paths
const avatarDir = path.join(__dirname, "../public/images/uploads/avatars");
const petDir = path.join(__dirname, "../public/images/uploads/pets");
const certificate_dir = path.join(
  __dirname,
  "../public/images/uploads/certificates"
);

// Check and create the upload directory if it doesn't exist
const createDirIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true }); // { recursive: true } 会创建嵌套目录
    console.log(`Directory created: ${dir}`);
  }
};

// Create necessary directories
createDirIfNotExists(avatarDir);
createDirIfNotExists(petDir);
createDirIfNotExists(certificate_dir);

// multer
const createStorage = (subDir) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, `../public/images/uploads/${subDir}`));
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const filename = `${Date.now()}${fileExtension}`;
      cb(null, filename);
    },
  });

// User avatar storage
const avatarStorage = createStorage("avatars");
// Pet avatar storage
const petStorage = createStorage("pets");
// Certificate storage
const certificateStorage = createStorage("certificates");

// Create multer instance
const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

const uploadPetPhoto = multer({
  storage: petStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

const uploadCertificate = multer({
  storage: certificateStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      console.error(`Invalid file type for certificate: ${file.mimetype}`);
      return cb(
        new Error("Only PDF, JPEG, and PNG files are allowed for certificates!")
      );
    }
    cb(null, true);
  },
});

module.exports = { uploadAvatar, uploadPetPhoto, uploadCertificate };
