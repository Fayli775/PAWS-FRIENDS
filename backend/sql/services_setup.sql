-- backend/sql/services_setup.sql

-- Core table for services
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL COMMENT 'Service name (e.g., dog walking, boarding)',
  base_price DECIMAL(10, 2) NOT NULL COMMENT 'Base price',
  duration VARCHAR(50) COMMENT 'Default duration (e.g., 1 hour)',
  description TEXT COMMENT 'Service description',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Supported pet types for each service (many-to-many)
CREATE TABLE IF NOT EXISTS service_pet_types (
  service_id INT NOT NULL,
  pet_type VARCHAR(50) NOT NULL COMMENT 'Cat, dog, bird, etc.',
  price_adjustment DECIMAL(10, 2) DEFAULT 0 COMMENT 'Price adjustment for this pet type',
  PRIMARY KEY (service_id, pet_type),
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Supported languages for each service (many-to-many)
CREATE TABLE IF NOT EXISTS service_languages (
  service_id INT NOT NULL,
  language VARCHAR(50) NOT NULL COMMENT 'English, Chinese, etc.',
  PRIMARY KEY (service_id, language),
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Services offered by sitters (many-to-many)
CREATE TABLE IF NOT EXISTS sitter_services (
  sitter_id BIGINT NOT NULL COMMENT 'Sitter user ID',  -- changed to BIGINT
  service_id INT NOT NULL,
  custom_price DECIMAL(10, 2) COMMENT 'Custom price set by the sitter',
  PRIMARY KEY (sitter_id, service_id),
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  FOREIGN KEY (sitter_id) REFERENCES user_info(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
