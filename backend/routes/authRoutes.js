//authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { uploadAvatar } = require("../middleware/multer"); // 引入 multer 配置
router.post(
  "/register",
  uploadAvatar.single("avatar"),
  authController.register);
router.post("/login", authController.login);
router.get("/checkEmail", authController.checkEmailExists);

module.exports = router;
