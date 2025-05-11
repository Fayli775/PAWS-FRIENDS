const userModel = require("../models/userModel.js");
const yup = require('yup');

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.avatar = user.avatar
      ? `${user.avatar}`
      : null;
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
  // Encrypt the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user's password
    await userModel.updatePassword(id, hashedPassword);
    res.json({ status: "success", message: "Password updated successfully" });
  } catch (err) {
    console.error("Error during bcrypt.compare:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// updateProfile including avatar
exports.updateProfile = async (req, res) => {
  const userId = req.user.id; 
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

    // 如果没有任何要更新的字段且没有上传头像
    if (Object.keys(validatedData).length === 0 && !req.file) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }
    // 如果上传了头像，处理头像路径
    if (req.file) {
      // 只存文件名
      validatedData.avatar = req.file.filename;
    }
    // 4. 调用 model 更新
    await userModel.updateUserProfile(userId, validatedData);

    // 获取更新后的用户数据
    const updatedUser = await userModel.getUserById(userId);

    res.status(200).json({ status: 'success', user: updatedUser });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(400).json({ message: err.message });
  }
};

// Function for searching sitters
exports.searchSitters = async (req, res) => {
  try {
    // Extract and potentially sanitize/validate search parameters
    const filters = req.query;

    // Call the model function to perform the search
    // The model function now returns an object { sitters: [...], pagination: {...} }
    const searchResult = await userModel.searchSitters(filters);

    res.status(200).json(searchResult); // Return the whole object with sitters and pagination info
  } catch (error) {
    console.error('Error searching sitters:', error);
    // Handle specific errors like invalid pagination params if needed
    if (error.message === "Invalid pagination parameters") {
        return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error searching sitters', error: error.message });
  }
};

// Function to get user languages

exports.getUserLanguages = async (req, res) => {
  try {
    const languages = await userModel.getUserLanguages(req.params.id);
    res.json({ status: "success", languages });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.addUserLanguages = async (req, res) => {
  try {
    const { languages } = req.body; // e.g., ['English', '中文']
    await userModel.addUserLanguages(req.params.id, languages);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.deleteUserLanguages = async (req, res) => {
  try {
    await userModel.deleteUserLanguages(req.params.id);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
// usercontroller.js




