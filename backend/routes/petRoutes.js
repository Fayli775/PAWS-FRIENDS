//routes/petRoutes.js
const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController.js"); // petAPI
const authMiddleware = require("../middleware/authMiddleware.js"); // authMiddleware
const { uploadPetPhoto } = require("../middleware/multer"); // 引入 multer 配置

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
  authMiddleware, // 确保用户已登录
  petController.deletePetById // 调用控制器方法
);

module.exports = router;
