const db = require("../config/db");
//get all services
exports.getAllServices = async () => {
  const [rows] = await db.query(`
      SELECT id, name, base_price AS price, duration FROM services
    `);
  return rows;
};

// Get service details (including associated pet types and languages)
exports.getServiceWithDetails = async (serviceId) => {
  const [rows] = await db.query(
    `
    SELECT 
      s.*,
      GROUP_CONCAT(DISTINCT spt.pet_type) AS pet_types,
      GROUP_CONCAT(DISTINCT sl.language) AS languages
    FROM services s
    LEFT JOIN service_pet_types spt ON s.id = spt.service_id
    LEFT JOIN service_languages sl ON s.id = sl.service_id
    WHERE s.id = ?
    GROUP BY s.id
  `,
    [serviceId]
  );
  return rows[0];
};

// Add supported pet types to the service
exports.addPetTypeToService = async (serviceId, petType) => {
  await db.query(
    "INSERT INTO service_pet_types (service_id, pet_type) VALUES (?, ?)",
    [serviceId, petType]
  );
};

// Update the sitter's list of services
exports.updateSitterServices = async (sitterId, serviceList) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    // Delete existing service settings
    await conn.query("DELETE FROM sitter_services WHERE sitter_id = ?", [
      sitterId,
    ]);
    // Insert new list of services
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
  const [rows] = await db.query(
    `
      SELECT ss.service_id, s.name, s.base_price as custom_price
      FROM sitter_services ss
      JOIN services s ON ss.service_id = s.id
      WHERE ss.sitter_id = ?
    `,
    [sitterId]
  );
  return rows;
};

// Delete the sitter's list of services
exports.deleteAllServicesForSitter = async (sitterId) => {
  await db.query("DELETE FROM sitter_services WHERE sitter_id = ?", [sitterId]);
};

// Add language to the service
exports.addLanguageToService = async (serviceId, language) => {
  await db.query(
    "INSERT INTO service_languages (service_id, language) VALUES (?, ?)",
    [serviceId, language]
  );
};

// Remove language from the service
exports.deleteLanguagesFromService = async (serviceId) => {
  await db.query("DELETE FROM service_languages WHERE service_id = ?", [
    serviceId,
  ]);
};
