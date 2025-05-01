// backend/routes/serviceRoutes.js
const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// ⚠️ 暂时注释掉，避免 MODULE_NOT_FOUND 报错
// const authMiddleware = require("../middleware/auth");

// 获取所有服务（前端使用）
router.get("/", serviceController.getAllServices);

// 获取服务详情（含关联数据）
router.get("/:id/details", serviceController.getServiceDetails);

// 添加服务支持的宠物类型（开发阶段不启用权限）
router.post("/:id/pet-types", serviceController.addPetType);

// 添加服务支持的语言
router.post("/:id/languages", serviceController.addLanguage);
// 删除语言
router.delete("/:id/languages", serviceController.deleteLanguages);

// 获取某照看者的服务列表
router.get("/sitters/:sitterId/services", serviceController.getSitterServices);

// 更新照看者的服务列表
router.put("/sitters/:sitterId/services", serviceController.updateSitterServices);
// 删除照看者的服务列表
router.delete("/sitters/:sitterId/services", serviceController.deleteSitterServices);


module.exports = router;
