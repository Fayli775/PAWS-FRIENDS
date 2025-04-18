const userModel = require("../models/userModel.js");
const yup = require('yup');



exports.getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching user with ID: ${id}`);
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ status: "success", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const bcrypt = require("bcrypt");
exports.updatePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    if (!currentPassword || !user.password) {
      return res.status(400).json({
        status: "error",
        message: "Missing data: currentPassword or user.password is missing.",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "error", message: "Current password is incorrect" });
    }

    // 加密新密码
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 更新密码
    await userModel.updatePassword(id, hashedPassword);
    res.json({ status: "success", message: "Password updated successfully" });
  } catch (err) {
    console.error("Error during bcrypt.compare:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

const upload = require("../utils/uploadConfig");
// Middleware(用于 router)
exports.uploadAvatarMiddleware = upload.single("avatar");

// udpdateAvatar 
exports.updateAvatar = async (req, res) => {
  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json({ status: "error", message: "No file uploaded" });
  }

  const avatarPath = req.file.path;

  try {
    const result = await userModel.uploadAvatar(id, avatarPath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};


// updateProfile

exports.updateProfile = async (req, res) => {
  const userId = req.user.id; // 从 protect middleware 拿的

  // 1. 定义验证 schema
  const schema = yup.object().shape({
    user_name: yup.string().max(50),
    bio: yup.string().max(255),
    region: yup.string().max(100),
    phone_number: yup.string().matches(/^\+?\d{10,15}$/, 'Invalid phone number'),
    emergency_contact: yup.string().matches(/^\+?\d{10,15}$/, 'Invalid emergency contact'),
  });

  try {
    // 2. 验证 req.body
    const validatedData = await schema.validate(req.body, { stripUnknown: true });

    // 3. 如果没有任何要更新的字段
    if (Object.keys(validatedData).length === 0) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    // 4. 调用 model 更新
    await userModel.updateUserProfile(userId, validatedData);

    res.status(200).json({ status: 'success', message: 'Profile updated successfully' });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};