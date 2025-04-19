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
