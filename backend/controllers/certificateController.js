// controllers/reviewController.js
const certificateRepository = require("../models/certificateModel");
const db = require("../config/db");
const path = require("path");
const fs = require("fs");
const { deleteFile } = require("../middleware/multer");
// Function to get uploaded certificates
exports.getUploadedCertificates = async (req, res) => {
  try {
    const userId = req.user.id;
    // Get uploaded certificates of the user from the database
    const certificates = await certificateRepository.getCertificatesByUserId(
      userId
    );
    res.status(200).json(certificates);
  } catch (err) {
    console.error("Error fetching uploaded certificates:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Function to delete a certificate
exports.deleteCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    //Get the certificate file name from the file path
    const certificateName = req.params.filename;
    
    await certificateRepository.deleteCertificate(userId, certificateName);
    deleteFile(certificateName);
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (err) {
    console.error("Error deleting certificate:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Function to upload user certificates
exports.uploadCertificate = async (req, res) => {
  try {
    const userId = req.user.id; 
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const certificateName = req.fileUrlToStore;
    await certificateRepository.addCertificate(userId, certificateName);
    res.status(201).json({
      status: "success",
      message: "Certificate uploaded successfully",
      certificate: `/images/uploads/certificates/${certificateName}`, 
    });
  } catch (err) {
    console.error("Error uploading certificate:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Public API: fetch certificates for a given userId (authentication not required)
exports.getUploadedCertificatesPublic = async (req, res) => {
  try {
    const userId = req.params.userId;

    const certificates = await certificateRepository.getCertificatesByUserId(
      userId
    );

    res.status(200).json(certificates);
  } catch (err) {
    console.error("Error fetching public certificates:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
