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

// Get service details
exports.getServiceDetails = async (req, res) => {
  try {
    const service = await serviceModel.getServiceWithDetails(req.params.id);
    res.json({ status: "success", service });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Add pet type to the service
exports.addPetType = async (req, res) => {
  try {
    await serviceModel.addPetTypeToService(req.params.id, req.body.pet_type);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Update the services provided by the sitter
exports.updateSitterServices = async (req, res) => {
  try {
    const { sitterId } = req.params;
    const serviceList = req.body;
    if (!Array.isArray(serviceList)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid payload format" });
    }

    await serviceModel.updateSitterServices(sitterId, serviceList);
    res.json({ status: "success" });
  } catch (err) {
    console.error("Failed to update sitter services:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Get the list of services offered by a specific sitter
exports.getSitterServices = async (req, res) => {
  try {
    const services = await serviceModel.getServicesBySitterId(
      req.params.sitterId
    );
    res.json(services);
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.deleteSitterServices = async (req, res) => {
  try {
    await serviceModel.deleteAllServicesForSitter(req.params.sitterId);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Add language to the service
exports.addLanguage = async (req, res) => {
  try {
    await serviceModel.addLanguageToService(req.params.id, req.body.language);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
// Remove language from the service
exports.deleteLanguages = async (req, res) => {
  try {
    const serviceId = req.params.id;
    await serviceModel.deleteLanguagesFromService(serviceId);
    res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
