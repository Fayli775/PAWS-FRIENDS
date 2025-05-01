// backend/controllers/serviceController.js
const serviceModel = require("../models/serviceModel");

//get all services
exports.getAllServices = async (req, res) => {
    try {
      const services = await serviceModel.getAllServices();
      res.json({ services });
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  };
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

// 更新照看者提供的服务
exports.updateSitterServices = async (req, res) => {
    try {
      const { sitterId } = req.params;
      const serviceList = req.body; // 应为数组 [{ service_id: 1, custom_price: 25 }, ...]
      if (!Array.isArray(serviceList)) {
        return res.status(400).json({ status: "error", message: "Invalid payload format" });
      }
  
      await serviceModel.updateSitterServices(sitterId, serviceList);
      res.json({ status: "success" });
    } catch (err) {
      console.error("Failed to update sitter services:", err);
      res.status(500).json({ status: "error", message: err.message });
    }
  };
  // 获取某个照看者的服务列表
exports.getSitterServices = async (req, res) => {
    try {
      const services = await serviceModel.getServicesBySitterId(req.params.sitterId);
      res.json(services);
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  };
// 删除照看者的服务列表
  exports.deleteSitterServices = async (req, res) => {
    try {
      await serviceModel.deleteAllServicesForSitter(req.params.sitterId);
      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  };
  
  // 添加语言到服务
  exports.addLanguage = async (req, res) => {
    try {
      await serviceModel.addLanguageToService(req.params.id, req.body.language);
      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ status: "error", message: err.message });
    }
  };
    // 删除服务的语言
    exports.deleteLanguages = async (req, res) => {
      try {
        const serviceId = req.params.id;
        await serviceModel.deleteLanguagesFromService(serviceId);
        res.json({ status: "success" });
      } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
      }
    };