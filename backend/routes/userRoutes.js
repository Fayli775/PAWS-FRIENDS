//routes/userRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js"); // authMiddleware
const { uploadImage } = require("../middleware/imageUploadMiddleware.js");
const userController = require("../controllers/userController.js"); // userAPI
const { uploadAvatar } = require("../middleware/multer.js"); // 引入 multer 配置

// ger user by id
router.get("/:id", userController.getUserById);

// update user profile including avatar
router.put(
  "/me/updateProfile",
  authMiddleware,
  uploadAvatar.single("avatar"),
  uploadImage("avatars"),
  userController.updateProfile
);

//updatePassword ensure user is logged in
router.put(
  "/updatePassword/:id",
  authMiddleware,
  userController.updatePassword
);

// New route for searching sitters
router.get("/sitters/search", userController.searchSitters);

// New route for language
router.get("/:id/languages", userController.getUserLanguages);
router.post("/:id/languages", userController.addUserLanguages);
router.delete("/:id/languages", userController.deleteUserLanguages);

module.exports = router;
