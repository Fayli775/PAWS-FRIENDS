SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS user_languages;
DROP TABLE IF EXISTS user_certificates;
DROP TABLE IF EXISTS sitter_services;
DROP TABLE IF EXISTS service_pet_types;
DROP TABLE IF EXISTS service_languages;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS notice_info;
DROP TABLE IF EXISTS location_reviews;
DROP TABLE IF EXISTS booking_complain;
DROP TABLE IF EXISTS booking_review;
DROP TABLE IF EXISTS booking_status_log;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS availability;
DROP TABLE IF EXISTS pet_info;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS user_info;

CREATE DATABASE IF NOT EXISTS paws_friends_test;
-- Create tables

CREATE TABLE user_info (
  id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'User ID, primary key',
  email VARCHAR(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'User email, used for login',
  password VARCHAR(512) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Encrypted password',
  bio TEXT COLLATE utf8mb4_unicode_ci COMMENT 'User bio/introduction',
  region VARCHAR(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Region',
  user_name VARCHAR(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'User nickname',
  status INT DEFAULT '0' COMMENT 'User status: 0 = active, 1 = disabled',
  avatar VARCHAR(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'User avatar URL',
  phone_number VARCHAR(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Phone number',
  emergency_contact VARCHAR(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Emergency contact name or number',
  gmt_create DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  gmt_update DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  PRIMARY KEY (id),
  UNIQUE KEY uk_email (email),
  KEY idx_user_name (user_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE locations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  description TEXT,
  address VARCHAR(255) DEFAULT NULL,
  image_url VARCHAR(2048) DEFAULT NULL,
  added_by_user_id BIGINT DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY added_by_user_id (added_by_user_id),
  CONSTRAINT locations_ibfk_1 FOREIGN KEY (added_by_user_id) REFERENCES user_info (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE services (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  duration VARCHAR(50) DEFAULT NULL,
  description TEXT,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE pet_info (
  id BIGINT NOT NULL AUTO_INCREMENT,
  owner_id BIGINT NOT NULL,
  type VARCHAR(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  name VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  description VARCHAR(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  photo_url VARCHAR(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  allergies TEXT COLLATE utf8mb4_unicode_ci,
  medications TEXT COLLATE utf8mb4_unicode_ci,
  special_instructions TEXT COLLATE utf8mb4_unicode_ci,
  vet_contact_name VARCHAR(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  vet_contact_phone VARCHAR(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  emergency_contact_name VARCHAR(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  emergency_contact_phone VARCHAR(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  gmt_create DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  gmt_update DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_owner_id (owner_id),
  CONSTRAINT pet_info_ibfk_1 FOREIGN KEY (owner_id) REFERENCES user_info (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE availability (
  id BIGINT NOT NULL AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  weekday ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY user_id (user_id),
  CONSTRAINT availability_ibfk_1 FOREIGN KEY (user_id) REFERENCES user_info (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE booking (
  id BIGINT NOT NULL AUTO_INCREMENT,
  owner_id BIGINT NOT NULL,
  sitter_id BIGINT NOT NULL,
  pet_type ENUM('dog','cat') NOT NULL,
  service_type ENUM('Dog Walking','In-Home Feeding','Dog Grooming & Care') DEFAULT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  status ENUM('pending','accepted','rejected','cancelled','completed') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  language VARCHAR(32) DEFAULT NULL,
  pet_id BIGINT NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE booking_status_log (
  id BIGINT NOT NULL AUTO_INCREMENT,
  booking_id BIGINT NOT NULL,
  status ENUM('pending','accepted','rejected','cancelled','completed') NOT NULL,
  changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  note TEXT,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE booking_review (
  id BIGINT NOT NULL AUTO_INCREMENT,
  booking_id BIGINT NOT NULL,
  reviewer_id BIGINT NOT NULL,
  sitter_id BIGINT NOT NULL,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_booking_review (booking_id),
  KEY reviewer_id (reviewer_id),
  KEY sitter_id (sitter_id),
  CONSTRAINT booking_review_ibfk_1 FOREIGN KEY (booking_id) REFERENCES booking (id) ON DELETE CASCADE,
  CONSTRAINT booking_review_ibfk_2 FOREIGN KEY (reviewer_id) REFERENCES user_info (id) ON DELETE CASCADE,
  CONSTRAINT booking_review_ibfk_3 FOREIGN KEY (sitter_id) REFERENCES user_info (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE booking_complain (
  id BIGINT NOT NULL AUTO_INCREMENT,
  booking_id BIGINT NOT NULL,
  reviewer_id BIGINT NOT NULL,
  sitter_id BIGINT NOT NULL,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_booking_review (booking_id),
  KEY reviewer_id (reviewer_id),
  KEY sitter_id (sitter_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE location_reviews (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  location_id INT UNSIGNED NOT NULL,
  user_id BIGINT NOT NULL,
  rating TINYINT UNSIGNED NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_review (location_id, user_id),
  KEY user_id (user_id),
  CONSTRAINT location_reviews_ibfk_1 FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE,
  CONSTRAINT location_reviews_ibfk_2 FOREIGN KEY (user_id) REFERENCES user_info (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE notice_info (
  id BIGINT NOT NULL AUTO_INCREMENT,
  receiver_id BIGINT NOT NULL,
  title VARCHAR(128) NOT NULL,
  message VARCHAR(1024) NOT NULL,
  read_tag INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY receiver_id (receiver_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE sitter_services (
  sitter_id BIGINT NOT NULL,
  service_id INT NOT NULL,
  custom_price DECIMAL(10,2) DEFAULT NULL,
  PRIMARY KEY (sitter_id, service_id),
  KEY service_id (service_id),
  CONSTRAINT sitter_services_ibfk_1 FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE CASCADE,
  CONSTRAINT sitter_services_ibfk_2 FOREIGN KEY (sitter_id) REFERENCES user_info (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE user_certificates (
  id INT NOT NULL AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  certificate_name VARCHAR(255) NOT NULL,
  uploaded_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY user_id (user_id),
  CONSTRAINT user_certificates_ibfk_1 FOREIGN KEY (user_id) REFERENCES user_info (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE user_languages (
  user_id BIGINT NOT NULL,
  language VARCHAR(50) NOT NULL,
  PRIMARY KEY (user_id, language),
  CONSTRAINT user_languages_ibfk_1 FOREIGN KEY (user_id) REFERENCES user_info (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE service_languages (
  service_id INT NOT NULL,
  language VARCHAR(50) NOT NULL,
  PRIMARY KEY (service_id, language),
  CONSTRAINT service_languages_ibfk_1 FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE service_pet_types (
  service_id INT NOT NULL,
  pet_type VARCHAR(50) NOT NULL,
  price_adjustment DECIMAL(10,2) DEFAULT '0.00',
  PRIMARY KEY (service_id, pet_type),
  CONSTRAINT service_pet_types_ibfk_1 FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;