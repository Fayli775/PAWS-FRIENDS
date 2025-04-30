-- backend/sql/services_seed.sql
INSERT INTO services (name, base_price, duration, description)
VALUES 
  ('遛狗', 25.00, '30分钟', '每日户外散步服务'),
  ('上门喂猫', 30.00, '30分钟', '包括喂食和清理猫砂');

INSERT INTO service_pet_types (service_id, pet_type, price_adjustment)
VALUES
  (1, '狗', 0),
  (2, '猫', 0);

INSERT INTO service_languages (service_id, language)
VALUES
  (1, '中文'),
  (1, 'English');