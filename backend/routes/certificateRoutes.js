const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadCertificate } = require("../middleware/multer");
const { uploadImage } = require("../middleware/imageUploadMiddleware");

router.post(
  "/uploadCertificate",
  (req, res, next) => {
    next();
  },
  authMiddleware,
  uploadCertificate.single("certification"),
  uploadImage("certificates"),
  (req, res, next) => {
    next();
  },
  certificateController.uploadCertificate
);

router.get(
  "/certificates",
  authMiddleware,
  certificateController.getUploadedCertificates
);

router.delete(
  "/deleteCertificate/:filename",
  authMiddleware,
  certificateController.deleteCertificate
);

router.get(
  "/public/:userId",
  certificateController.getUploadedCertificatesPublic
);

module.exports = router;
