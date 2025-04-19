const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js"); // authMiddleware
const userController = require("../controllers/userController.js"); // userAPI

//updatePassword ensure user is logged in
router.put("/updatePassword/:id", authMiddleware, userController.updatePassword);
router.patch("/updateAvatar/:id", authMiddleware, userController.uploadAvatarMiddleware, userController.updateAvatar);
router.put('/profile', authMiddleware, userController.updateProfile);





module.exports = router;



