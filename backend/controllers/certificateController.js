// controllers/reviewController.js
const certificateRepository = require("../models/certificateModel");
const db = require("../config/db");
const path = require("path");
const fs = require("fs");



// Function to get uploaded certificates
exports.getUploadedCertificates = async (req, res) => {
    console.log('💡 当前认证用户信息:', req.user); // <-- 加上这行
  
    try {
      const userId = req.user.id; // 从认证中获取用户 ID
  
      // 从数据库获取用户上传的证书信息
      const certificates = await certificateRepository.getCertificatesByUserId(userId);
  
      // 返回证书列表
      res.status(200).json(certificates);
    } catch (err) {
      console.error("Error fetching uploaded certificates:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  
  // Function to delete a certificate
  exports.deleteCertificate = async (req, res) => {
    try {
      const userId = req.user.id; // 从认证中获取用户 ID
      const certificateName = req.params.filename; // 从路径中获取证书文件名
  
      // 1. 从数据库中删除证书记录
      await certificateRepository.deleteCertificate(userId, certificateName);
  
      // 2. 删除文件
      const filePath = path.join(__dirname, `../uploads/certificates/${certificateName}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // 删除文件
      }
  
      // 返回成功响应
      res.status(200).json({ message: "Certificate deleted successfully" });
    } catch (err) {
      console.error("Error deleting certificate:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  
  
  // Function to upload user certificates
  exports.uploadCertificate = async (req, res) => {
    try {
      const userId = req.user.id; // 从认证中获取用户 ID
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      // 获取上传文件的路径
      const certificateName = req.file.filename;
      console.log('🧾 上传的文件名：', req.file.filename);
      console.log('📂 文件保存的路径：', req.file.path);
  
      // 将证书信息存储到数据库
      await certificateRepository.addCertificate(userId, certificateName);
  
      // 返回正确的文件路径
      res.status(201).json({
        status: "success",
        message: "Certificate uploaded successfully",
        certificate: `/images/uploads/certificates/${certificateName}`, // 修改路径
      });
    } catch (err) {
      console.error("Error uploading certificate:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  // 公开接口：获取某个 userId 的证书列表（不需要 req.user）
exports.getUploadedCertificatesPublic = async (req, res) => {
  try {
    const userId = req.params.userId;

    const certificates = await certificateRepository.getCertificatesByUserId(userId);

    res.status(200).json(certificates);
  } catch (err) {
    console.error("Error fetching public certificates:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

