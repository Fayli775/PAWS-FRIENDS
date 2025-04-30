// backend/routes/serviceRoutes.js
const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const authMiddleware = require("../middleware/auth");

// 获取服务详情（含关联数据）
router.get("/:id/details", serviceController.getServiceDetails);

// 添加服务支持的宠物类型（需管理员权限）
router.post("/:id/pet-types", authMiddleware, serviceController.addPetType);

// 添加服务支持的语言（需管理员权限）
router.post("/:id/languages", authMiddleware, serviceController.addLanguage);

// 获取某照看者的服务列表
router.get("/sitters/:sitterId/services", serviceController.getSitterServices);

module.exports = router;