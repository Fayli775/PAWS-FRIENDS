const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");// userAPI
//router.post("/register", userController.registerUser);
//router.post("/login", userController.loginUser);
router.get("/:id", userController.getUserById);
//router.get("/", userController.getAllUsers);
//router.put("/:id", userController.updateUser);
module.exports = router;
