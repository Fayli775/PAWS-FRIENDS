//routes/userRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js"); // authMiddleware
const userController = require("../controllers/userController.js"); // userAPI
const { uploadAvatar } = require("../middleware/multer.js"); // 引入 multer 配置
// update user profile including avatar
router.put(
  "/me/updateProfile",
  authMiddleware,
  uploadAvatar.single("profilePhoto"), // 处理头像上传
  userController.updateProfile
);

// ger user by id
router.get("/:id", userController.getUserById);

//updatePassword ensure user is logged in
router.put(
  "/updatePassword/:id",
  authMiddleware,
  userController.updatePassword
);

// New route for searching sitters
router.get('/sitters/search', userController.searchSitters); // No auth for general search? Or add authMiddleware if needed

module.exports = router;
