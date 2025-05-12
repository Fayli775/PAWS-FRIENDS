const path = require("path");
const PetModel = require("../models/petModel");
exports.getPetInfo = async (req, res) => {
  const petId = req.params.petId;
  try {
    const pet = await PetModel.getPetById(petId);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    console.error("Error getting pet info:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPetsByOwnerId = async (req, res) => {
  // Get ownerId from the authenticated user's request data
  const ownerId = req.params.ownerId;
  try {
    const pets = await PetModel.getPetsByOwnerId(ownerId);

    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: "No pets found for this owner" });
    }

    res.json(pets);
  } catch (error) {
    console.error("Error getting pets by owner ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyPets = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const pets = await PetModel.getPetsByOwnerId(ownerId);

    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: "No pets found for this owner" });
    }

    res.json(pets);
  } catch (error) {
    console.error("Error getting pets by owner ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//add a new pet
exports.addNewPet = async (req, res) => {
  try {
    const {
      name,
      type,
      description,
      vet_contact_name,
      vet_contact_phone,
      emergency_contact_name,
      emergency_contact_phone,
      allergies,
      medications,
      special_instructions,
    } = req.body;

    if (!name || !type) {
      return res
        .status(400)
        .json({ message: "'Name' and 'Type' are required fields." });
    }

    const owner_id = req.user?.id;
    if (!owner_id) {
      return res.status(400).json({ message: "Owner ID is required" });
    }

    let photo_url = null;
    if (req.file) {
      // 提取上传的文件相对路径
      photo_url = req.fileUrlToStore
    }
    const petData = {
      owner_id,
      type,
      name,
      description: description || null,
      photo_url: photo_url || null,
      vet_contact_name: vet_contact_name || null,
      vet_contact_phone: vet_contact_phone || null,
      emergency_contact_name: emergency_contact_name || null,
      emergency_contact_phone: emergency_contact_phone || null,
      allergies: allergies || null,
      medications: medications || null,
      special_instructions: special_instructions || null,
    };

    const petId = await PetModel.addNewPet(petData);

    res.status(201).json({ status: "success", petId });
  } catch (err) {
    console.error("Error in createPet controller:", err);
    res.status(500).json({ message: "Error creating pet", error: err.message });
  }
};

// Update pet information
exports.updatePet = async (req, res) => {
  try {
    const petId = req.params.petId;
    const owner_id = req.user?.id;
    const {
      name,
      type,
      description,
      vet_contact_name,
      vet_contact_phone,
      emergency_contact_name,
      emergency_contact_phone,
      allergies,
      medications,
      special_instructions,
    } = req.body;
    // Validate whether the pet exists
    const existingPet = await PetModel.getPetById(petId);
    if (!existingPet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    // Check if the current user owns the pet
    if (existingPet.owner_id !== owner_id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this pet" });
    }

    // Build the update data object
    const updatedPetData = {
      name: name ?? existingPet.name,
      type: type ?? existingPet.type,
      description: description ?? existingPet.description ?? null,
      photo_url: req.file
        ? `${req.fileUrlToStore}`
        : existingPet.photo_url ?? null,
      vet_contact_name:
        vet_contact_name ?? existingPet.vet_contact_name ?? null,
      vet_contact_phone:
        vet_contact_phone ?? existingPet.vet_contact_phone ?? null,
      emergency_contact_name:
        emergency_contact_name ?? existingPet.emergency_contact_name ?? null,
      emergency_contact_phone:
        emergency_contact_phone ?? existingPet.emergency_contact_phone ?? null,
      allergies: allergies ?? existingPet.allergies ?? null,
      medications: medications ?? existingPet.medications ?? null,
      special_instructions:
        special_instructions ?? existingPet.special_instructions ?? null,
    };

    await PetModel.updatePet(petId, updatedPetData);

    res.status(200).json({ status: "success", pet: updatedPetData });
  } catch (err) {
    console.error("Error updating pet:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete pet by ID
exports.deletePetById = async (req, res) => {
  const petId = req.params.petId;

  try {
    const result = await PetModel.deletePetById(petId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Pet deleted successfully" });
  } catch (err) {
    console.error("Error deleting pet:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
