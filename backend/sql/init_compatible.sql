-- -- 创建数据库
-- CREATE DATABASE IF NOT EXISTS pet_auth_demo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE pet_auth_demo;

-- -- 删除旧表（如果存在）
-- DROP TABLE IF EXISTS user_info;

-- -- 创建与 auth 模块完全兼容的 user_info 表
-- CREATE TABLE user_info (
--   id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'User ID',
--   username VARCHAR(32) NOT NULL UNIQUE COMMENT 'Username, unique and used for login',
--   email VARCHAR(64) NOT NULL UNIQUE COMMENT 'User email',
--   password VARCHAR(255) NOT NULL COMMENT 'Hashed password',
--   bio TEXT DEFAULT NULL COMMENT 'User bio/introduction',
--   region VARCHAR(64) DEFAULT NULL COMMENT 'Region',
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (id)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='User Table for Auth Module';

-- -- 示例用户数据（已加密的密码应通过注册接口生成）
-- INSERT INTO user_info (username, email, password, bio, region)
-- VALUES 
--   ('demoUser', 'demo@example.com', '$2b$10$demoHashedPassword', 'Demo bio here', 'Auckland');
