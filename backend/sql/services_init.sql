
-- 🚨 Safe deletion respecting foreign keys
DELETE FROM service_languages;
DELETE FROM service_pet_types;
DELETE FROM sitter_services;
DELETE FROM services;

-- ✅ Insert 3 core services
INSERT INTO services (id, name, base_price, duration, description) VALUES
(1, 'Dog Walking', 25.00, '30 minutes', 'Daily outdoor walks for dogs'),
(2, 'In-Home Feeding', 30.00, '30 minutes', 'Feeding pets such as cats at the owner\'s home'),
(3, 'Dog Grooming & Care', 50.00, '1 hour', 'Grooming, bathing, and basic medical care for dogs');

-- ✅ Insert full language support for each service
INSERT INTO service_languages (service_id, language) VALUES
-- Dog Walking
(1, 'English'), (1, '中文'), (1, 'Te Reo Māori'), (1, 'Hindi'), (1, 'Korean'), (1, 'Japanese'), (1, 'Spanish'),
-- In-Home Feeding
(2, 'English'), (2, '中文'), (2, 'Te Reo Māori'), (2, 'Hindi'), (2, 'Korean'), (2, 'Japanese'), (2, 'Spanish'),
-- Dog Grooming & Care
(3, 'English'), (3, '中文'), (3, 'Te Reo Māori'), (3, 'Hindi'), (3, 'Korean'), (3, 'Japanese'), (3, 'Spanish');

-- ✅ Insert supported pet types
INSERT INTO service_pet_types (service_id, pet_type) VALUES
(1, 'Dog'),
(2, 'Cat'),
(3, 'Dog');
