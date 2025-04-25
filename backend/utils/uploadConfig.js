//utils/uploadConfig.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// 确保根目录和用户、宠物目录存在
const rootDir = "public/images/";
const usersDir = "public/images/users/";
const petsDir = "public/images/pets/";

const ensureDirectoriesExist = () => {
  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir, { recursive: true });
  }
  if (!fs.existsSync(usersDir)) {
    fs.mkdirSync(usersDir, { recursive: true });
  }
  if (!fs.existsSync(petsDir)) {
    fs.mkdirSync(petsDir, { recursive: true });
  }
};

ensureDirectoriesExist(); // 初始化时确保目录存在

// 可选：限制只允许图片类型
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) {
    return cb(null, true);
  }
  cb(new Error("Only image files are allowed"));
};

// 存储设定，动态指定存储路径
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 动态选择文件夹：根据是否是用户头像或宠物照片来决定目录
    const isUserPhoto = req.body.type === "user"; // 假设请求体中传入type字段来区分
    const destination = isUserPhoto ? usersDir : petsDir; // 用户头像存放在 users 文件夹，宠物照片存放在 pets 文件夹
    cb(null, destination); // 设置存储的目录
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 文件名使用当前时间戳
  },
});

// 设置上传配置
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 限制文件大小最大2MB
});

module.exports = upload;
