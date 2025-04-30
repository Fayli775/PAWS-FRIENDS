// backend/controllers/serviceController.js
const serviceModel = require("../models/serviceModel");

// 获取服务详情
exports.getServiceDetails = async (req, res) => {
  try {
    const service = await serviceModel.getServiceWithDetails(req.params.id);
    res.json({ status: "success", service });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// 添加宠物类型到服务
exports.addPetType = async (req, res) => {
  try {
    await serviceModel.addPetTypeToService(req.params.id, req.body.pet_type);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// 其他新增控制器...