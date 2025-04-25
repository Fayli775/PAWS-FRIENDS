// models/petModel.js
const db = require("../config/db.js");

exports.getPetById = async (petId) => {

 console.log("petId in getPetById:", petId);
    if (!petId) {
      throw new Error("Invalid petId");
    } 
  const query = `SELECT * FROM pet_info WHERE id = ?`;
  const [rows] = await db.execute(query, [petId]);
  return rows[0];
};

exports.getPetsByOwnerId = async (ownerId) => {
  const query = `SELECT * FROM pet_info WHERE owner_id = ?`;
  const [rows] = await db.execute(query, [ownerId]);
  return rows;
}


// 创建新宠物

exports.addNewPet = async (petData) => {
  // 验证必填字段是否有值
  if (!petData.name || !petData.type) {
    throw new Error("'name' and 'type' are required fields.");
  }

  // 构建 SQL 查询
  const query = `
    INSERT INTO pet_info (
      owner_id, type, name, description, photo_url,
      vet_contact_name, vet_contact_phone, emergency_contact_name,
      emergency_contact_phone, allergies, medications, special_instructions
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    petData.owner_id,
    petData.type,
    petData.name,
    petData.description || null,
    petData.photo_url || null,
    petData.vet_contact_name || null,
    petData.vet_contact_phone || null,
    petData.emergency_contact_name || null,
    petData.emergency_contact_phone || null,
    petData.allergies || null,
    petData.medications || null,
    petData.special_instructions || null
  ];

  try {
    const [result] = await db.execute(query, values);
    return result.insertId; // 返回新插入的 pet 的 id
  } catch (err) {
    throw new Error("Error while adding new pet: " + err.message);
  }
};


// models/petModel.js

exports.updatePet = async (petId, pet) => {
      // 构建 SQL 更新语句
      const sql = `
        UPDATE pet_info SET
          name = ?, type = ?, description = ?, photo_url = ?,
          vet_contact_name = ?, vet_contact_phone = ?,
          emergency_contact_name = ?, emergency_contact_phone = ?,
          allergies = ?, medications = ?, special_instructions = ?
        WHERE id = ?
      `;
  
      // 确保字段值为 null 或有效值
      const sanitizeValue = (value) => (value === undefined ? null : value);
  
      const values = [
        sanitizeValue(pet.name),
        sanitizeValue(pet.type),
        sanitizeValue(pet.description),
        sanitizeValue(pet.photo_url),
        sanitizeValue(pet.vet_contact_name),
        sanitizeValue(pet.vet_contact_phone),
        sanitizeValue(pet.emergency_contact_name),
        sanitizeValue(pet.emergency_contact_phone),
        sanitizeValue(pet.allergies),
        sanitizeValue(pet.medications),
        sanitizeValue(pet.special_instructions),
        petId,
      ];
  
      // 添加日志
      console.log("Executing SQL (updatePet):", sql);
      console.log("With values:", values);
  
      // 执行 SQL 更新操作
      await db.execute(sql, values);
    } 


    // delete pet by id
    exports.deletePetById = async (petId) => {
        try {
          const query = `DELETE FROM pet_info WHERE id = ?`;
          const [result] = await db.query(query, [petId]);
          return result; // 返回删除结果
        } catch (err) {
          throw new Error("Failed to delete pet: " + err.message);
        }
      };