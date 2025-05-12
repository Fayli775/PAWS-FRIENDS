const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { IS_PRODUCTION } = require('../config/const');

let avatarStorage, petStorage, certificateStorage;

if (IS_PRODUCTION) {
  // For Vercel Blob, use memoryStorage to get the file buffer
  const memoryStorage = multer.memoryStorage();
  avatarStorage = memoryStorage;
  petStorage = memoryStorage;
  certificateStorage = memoryStorage;
} else {
  // For local development, use diskStorage

  const avatarDir = path.join(__dirname, "../public/images/uploads/avatars");
  const petDir = path.join(__dirname, "../public/images/uploads/pets");
  const certificate_dir = path.join(
    __dirname,
    "../public/images/uploads/certificates"
  );

  const createDirIfNotExists = (dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Directory created: ${dir}`);
    }
  };

  createDirIfNotExists(avatarDir);
  createDirIfNotExists(petDir);
  createDirIfNotExists(certificate_dir);

  const createDiskStorage = (subDir) =>
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

  avatarStorage = createDiskStorage("avatars");
  petStorage = createDiskStorage("pets");
  certificateStorage = createDiskStorage("certificates");
}

// Common file filter and limits
const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"));
  }
  cb(null, true);
};

const certificateFileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    console.error(`Invalid file type for certificate: ${file.mimetype}`);
    return cb(
      new Error("Only PDF, JPEG, and PNG files are allowed for certificates!")
    );
  }
  cb(null, true);
};

const commonLimits = { fileSize: 10 * 1024 * 1024 }; // 10MB limit

// Create multer instances
const uploadAvatar = multer({
  storage: avatarStorage,
  limits: commonLimits,
  fileFilter: imageFileFilter,
});

const uploadPetPhoto = multer({
  storage: petStorage,
  limits: commonLimits,
  fileFilter: imageFileFilter,
});

const uploadCertificate = multer({
  storage: certificateStorage,
  limits: commonLimits,
  fileFilter: certificateFileFilter,
});

// Delete file from storage
const deleteFile = (filename) => {
  const filePath = path.join(__dirname, `../uploads/certificates/${filename}`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};


module.exports = { uploadAvatar, uploadPetPhoto, uploadCertificate, deleteFile };
