//routes/petRoutes.js
const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController.js"); 
const authMiddleware = require("../middleware/authMiddleware.js"); 
const { uploadPetPhoto } = require("../middleware/multer"); 
//getpetbyid
router.get("/:petId", petController.getPetInfo);
//get pets by owner_id
router.get("/owner/:ownerId", petController.getPetsByOwnerId);
//get my pets
router.get("/get/my", authMiddleware, petController.getMyPets);
//add a new pet
router.post('/addNewPet', authMiddleware, uploadPetPhoto.single('petPhoto'), petController.addNewPet);

//update pet_info
router.put(
  '/updatePet/:petId',
  authMiddleware,
  uploadPetPhoto.single('petPhoto'),
  petController.updatePet
);

//deletepet by id
router.delete(
  '/deletePet/:petId',
  authMiddleware, 
  petController.deletePetById 
);

module.exports = router;
