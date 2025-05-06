// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadCertificate } = require("../middleware/multer");

router.post(
    "/uploadCertificate",
    (req, res, next) => {
      console.log("✅ 路由命中了");
      next();
    },
    authMiddleware,
    uploadCertificate.single("certification"),
    (req, res, next) => {
      console.log("✅ multer 成功执行，文件名：", req.file?.filename);
      next();
    },
    certificateController.uploadCertificate
  );
  
  
  // 获取用户上传的证书列表
router.get(
"/certificates",
    authMiddleware, // ✅必须有这个
certificateController.getUploadedCertificates
);

  
  // 删除证书
router.delete(
    "/deleteCertificate/:filename",
    authMiddleware, // 确保用户已登录
    certificateController.deleteCertificate
);
module.exports = router;
