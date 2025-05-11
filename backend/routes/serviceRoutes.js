const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// Get all services (used by frontend)
router.get("/", serviceController.getAllServices);

// Get service details (including related data)
router.get("/:id/details", serviceController.getServiceDetails);

// Add supported pet types to a service (authorization disabled during development)
router.post("/:id/pet-types", serviceController.addPetType);

// Add supported languages to a service
router.post("/:id/languages", serviceController.addLanguage);

// Delete languages from a service
router.delete("/:id/languages", serviceController.deleteLanguages);

// Get list of services provided by a specific sitter
router.get("/sitters/:sitterId/services", serviceController.getSitterServices);

// Update the list of services provided by a sitter
router.put("/sitters/:sitterId/services", serviceController.updateSitterServices);

// Delete the list of services provided by a sitter
router.delete("/sitters/:sitterId/services", serviceController.deleteSitterServices);

module.exports = router;
