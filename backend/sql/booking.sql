-- sql/booking.sql

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
