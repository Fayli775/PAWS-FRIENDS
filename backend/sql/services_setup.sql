-- backend/sql/services_setup.sql
-- 服务核心表
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL COMMENT '服务名称（如遛狗、寄养）',
  base_price DECIMAL(10, 2) NOT NULL COMMENT '基础价格',
  duration VARCHAR(50) COMMENT '默认时长（如1小时）',
  description TEXT COMMENT '服务描述',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 服务支持的宠物类型（多对多）
CREATE TABLE IF NOT EXISTS service_pet_types (
  service_id INT NOT NULL,
  pet_type VARCHAR(50) NOT NULL COMMENT '猫、狗、鸟等',
  price_adjustment DECIMAL(10, 2) DEFAULT 0 COMMENT '针对该宠物的价格调整',
  PRIMARY KEY (service_id, pet_type),
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 服务支持的语言（多对多）
CREATE TABLE IF NOT EXISTS service_languages (
  service_id INT NOT NULL,
  language VARCHAR(50) NOT NULL COMMENT '英语、中文等',
  PRIMARY KEY (service_id, language),
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 照看者提供的服务（多对多）

CREATE TABLE IF NOT EXISTS sitter_services (
  sitter_id BIGINT NOT NULL COMMENT '照看者用户ID',  -- ✅ 改为 BIGINT
  service_id INT NOT NULL,
  custom_price DECIMAL(10, 2) COMMENT '照看者自定义价格',
  PRIMARY KEY (sitter_id, service_id),
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  FOREIGN KEY (sitter_id) REFERENCES user_info(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;