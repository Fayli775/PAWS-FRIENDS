//middleware/multer.js

const multer = require("multer");
const fs = require("fs");
const path = require("path");


// 定义上传目录路径
const avatarDir = path.join(__dirname, "../public/images/uploads/avatars");
const petDir = path.join(__dirname, "../public/images/uploads/pets");

// 检查并创建上传目录（如果不存在的话）
const createDirIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true }); // { recursive: true } 会创建嵌套目录
    console.log(`Directory created: ${dir}`);
  }
};

// 创建必要的目录
createDirIfNotExists(avatarDir);
createDirIfNotExists(petDir);

// multer 配置
const createStorage = (subDir) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      // 根据传入的目录参数，决定存储的文件夹路径
      cb(null, path.join(__dirname, `../public/images/uploads/${subDir}`));
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const filename = `${Date.now()}${fileExtension}`; // 使用时间戳生成唯一文件名
      cb(null, filename);
    },
  });

// 使用通用的 createStorage 方法生成不同的 storage 配置
const avatarStorage = createStorage("avatars"); // 用户头像存储
const petStorage = createStorage("pets"); // 宠物头像存储

// 创建 multer 实例
const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 限制文件大小为10MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!")); // 错误处理
    }
    cb(null, true);
  },
});

const uploadPetPhoto = multer({ storage: petStorage });

// 导出中间件
module.exports = { uploadAvatar, uploadPetPhoto };
