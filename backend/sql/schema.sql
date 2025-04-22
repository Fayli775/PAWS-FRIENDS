-- sql/init.sql

CREATE DATABASE IF NOT EXISTS pet_service_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pet_service_app;
DROP TABLE IF EXISTS user_info;
CREATE TABLE user_info (
  id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'User ID, primary key',
  email VARCHAR(64) NOT NULL COMMENT 'User email, used for login',
  password VARCHAR(512) NOT NULL COMMENT 'Encrypted password',
  bio TEXT DEFAULT NULL COMMENT 'User bio/introduction',
  region VARCHAR(64) DEFAULT NULL COMMENT 'Region',
  user_name VARCHAR(32) DEFAULT NULL COMMENT 'User nickname',
  status INT(11) DEFAULT 0 COMMENT 'User status: 0 = active, 1 = disabled',
  avatar VARCHAR(256) DEFAULT NULL COMMENT 'User avatar URL',
  phone_number VARCHAR(20) DEFAULT NULL COMMENT 'Phone number',
  emergency_contact VARCHAR(64) DEFAULT NULL COMMENT 'Emergency contact name or number',
  gmt_create DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  gmt_update DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  PRIMARY KEY (id),
  UNIQUE KEY uk_email (email) COMMENT 'Unique index on email',
  KEY idx_user_name (user_name) COMMENT 'Index on nickname'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='User info table';

-- 预约信息表
CREATE TABLE IF NOT EXISTS booking (
  id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'Booking ID',
  owner_id BIGINT NOT NULL COMMENT 'ID of the pet owner',
  sitter_id BIGINT NOT NULL COMMENT 'ID of the sitter',
  pet_type ENUM('dog', 'cat') NOT NULL COMMENT 'Type of pet',
  service_type ENUM('walking', 'feeding', 'boarding') NOT NULL COMMENT 'Type of service',
  start_time DATETIME NOT NULL COMMENT 'Service start time',
  end_time DATETIME NOT NULL COMMENT 'Service end time',
  status ENUM('pending', 'accepted', 'rejected', 'cancelled', 'completed') DEFAULT 'pending' COMMENT 'Current booking status',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 订单状态记录表
CREATE TABLE IF NOT EXISTS booking_status_log (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  booking_id BIGINT NOT NULL COMMENT 'Related booking ID',
  status ENUM('pending', 'accepted', 'rejected', 'cancelled', 'completed') NOT NULL COMMENT 'New status',
  changed_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp of status change',
  note TEXT DEFAULT NULL COMMENT 'Optional notes'
);


-- pet info
DROP TABLE IF EXISTS pet_info;
CREATE TABLE pet_info (
    id BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Primary key: pet ID',
    owner_id BIGINT NOT NULL COMMENT 'Foreign key: references user_info(id)',
    type VARCHAR(20) NOT NULL COMMENT 'Pet type (e.g., dog, cat)',
    name VARCHAR(50) NOT NULL COMMENT 'Pet name',
    description VARCHAR(1024) DEFAULT NULL COMMENT 'Additional description',
    photo VARCHAR(1024) DEFAULT NULL COMMENT 'Photo URL',
    allergies TEXT DEFAULT NULL COMMENT 'Pet allergies',
    medications TEXT DEFAULT NULL COMMENT 'Current medications',
    special_instructions TEXT DEFAULT NULL COMMENT 'Special care instructions',
    vet_contact_name VARCHAR(100) DEFAULT NULL COMMENT 'Veterinarian name',
    vet_contact_phone VARCHAR(20) DEFAULT NULL COMMENT 'Veterinarian phone number',
    emergency_contact_name VARCHAR(100) DEFAULT NULL COMMENT 'Emergency contact name',
    emergency_contact_phone VARCHAR(20) DEFAULT NULL COMMENT 'Emergency contact phone number',
    gmt_create DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation time',
    gmt_update DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update time',
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES user_info(id) ON DELETE CASCADE,
    KEY idx_owner_id (owner_id) COMMENT 'Index on owner_id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Pet profile information table';




