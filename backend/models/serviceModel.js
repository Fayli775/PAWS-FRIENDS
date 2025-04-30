// backend/models/serviceModel.js
const db = require("../config/db");

// 获取服务详情（含关联的宠物类型和语言）
exports.getServiceWithDetails = async (serviceId) => {
  const [rows] = await db.query(`
    SELECT 
      s.*,
      GROUP_CONCAT(DISTINCT spt.pet_type) AS pet_types,
      GROUP_CONCAT(DISTINCT sl.language) AS languages
    FROM services s
    LEFT JOIN service_pet_types spt ON s.id = spt.service_id
    LEFT JOIN service_languages sl ON s.id = sl.service_id
    WHERE s.id = ?
    GROUP BY s.id
  `, [serviceId]);
  return rows[0];
};

// 添加服务支持的宠物类型
exports.addPetTypeToService = async (serviceId, petType) => {
  await db.query(
    "INSERT INTO service_pet_types (service_id, pet_type) VALUES (?, ?)",
    [serviceId, petType]
  );
};

// 其他新增方法...