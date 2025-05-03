// backend/models/serviceModel.js
const db = require("../config/db");
//get all services
exports.getAllServices = async () => {
    const [rows] = await db.query(`
      SELECT id, name, base_price AS price, duration FROM services
    `);
    return rows;
  };
  
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


// 更新照看者的服务列表
exports.updateSitterServices = async (sitterId, serviceList) => {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
  
      // 删除原有的服务设置
      await conn.query("DELETE FROM sitter_services WHERE sitter_id = ?", [sitterId]);
  
      // 插入新服务列表
      for (const item of serviceList) {
        await conn.query(
          "INSERT INTO sitter_services (sitter_id, service_id, custom_price) VALUES (?, ?, ?)",
          [sitterId, item.service_id, item.custom_price || null]
        );
      }
  
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  };

  exports.getServicesBySitterId = async (sitterId) => {
    const [rows] = await db.query(`
      SELECT ss.service_id, s.name, s.base_price as custom_price
      FROM sitter_services ss
      JOIN services s ON ss.service_id = s.id
      WHERE ss.sitter_id = ?
    `, [sitterId]);
    return rows;
  };
  // 删除照看者的服务列表
  exports.deleteAllServicesForSitter = async (sitterId) => {
    await db.query("DELETE FROM sitter_services WHERE sitter_id = ?", [sitterId]);
  };
  // 添加语言到服务
  exports.addLanguageToService = async (serviceId, language) => {
    await db.query(
      "INSERT INTO service_languages (service_id, language) VALUES (?, ?)",
      [serviceId, language]
    );
  };

  // 删除服务的语言
  exports.deleteLanguagesFromService = async (serviceId) => {
    await db.query("DELETE FROM service_languages WHERE service_id = ?", [serviceId]);
  };
  

  