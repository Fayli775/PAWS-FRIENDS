
INSERT INTO user_info (
  email, password, bio, region, user_name, status, avatar,
  phone_number, emergency_contact
) VALUES
(
  'alice@example.com',
  '$2b$10$85iiYFTMuy.F5rAQlmPebudDe3WUT9rC2.KxrE0PIh4kU/sCeEIee',
  'Loves cats and long walks.',
  'North Shore',
  'AliceCat',
  0,
  'images/user1-avatar',
  '0211234567',
  '0219876543'
),
(
  'bob@example.com',
  '$2b$10$AQ.2y1ZFFb0pFiDc9ISd1.CKDFlU9rnQHajYGEW9uKAzXh0sVpHle',
  'Experienced dog sitter.',
  'West Auckland',
  'BobWoof',
  0,
  'images/user2-avatar',
  '0227654321',
  '0214567890'
),
(
  'carol@example.com',
  '$2b$10$PK4c89SheNggUEy2duTnGOkWvnYqZ39iGpA8Lw2oViLFv.nnKB8QW',
  'Pet lover with a big heart.',
  'Central Auckland',
  'CarolPaws',
  0,
  'images/user3-avatar',
  '0201112222',
  '0273334444'
),
(
  'dave@example.com',
  '$2b$10$pM1CyLLDTYGkH4IQGIv59Ognw26DRll4GrZRFILIulrp/Fgwj.cj2',
  'Professional pet trainer.',
  'East Auckland',
  'DaveTrain',
  0,
  'images/user4-avatar',
  '0275556666',
  '0208889999'
);

-- Add pet records
INSERT INTO pet_info (
    owner_id, type, name, description, photo,
    vet_contact_name, vet_contact_phone,
    emergency_contact_name, emergency_contact_phone,
    allergies, medications, special_instructions
) VALUES
(3, 'dog', 'Max', 'Friendly golden retriever, loves swimming.', 'https://example.com/max.jpg',
    'Dr. James Wilson', '021-5556666',
    'Mary Smith', '022-3334444',
    'Peanut butter', 'Flea treatment monthly', 'Needs daily joint supplements'),
    
(3, 'cat', 'Luna', 'Black cat, indoor only.', 'https://example.com/luna.jpg',
    'Dr. Emma Chen', '021-7778888',
    'Peter Wong', '022-9990000',
    'Chicken', 'Thyroid medication twice daily', 'Sensitive stomach - special diet only'),
    
(4, 'dog', 'Charlie', 'Energetic beagle puppy.', 'https://example.com/charlie.jpg',
    'Dr. Michael Brown', '021-2223333',
    'Sarah Johnson', '022-4445555',
    'None', 'Deworming medication', 'Needs three walks daily'),
    
(1, 'cat', 'Oliver', 'Senior ginger cat.', 'https://example.com/oliver.jpg',
    'Dr. Lisa Taylor', '021-8889999',
    'David Lee', '022-1112222',
    'Dairy', 'Arthritis medication', 'Cannot jump high - food and litter must be easily accessible'),
    
(2, 'dog', 'Bella', 'Calm labrador, therapy dog.', 'https://example.com/bella.jpg',
    'Dr. Robert Park', '021-4445555',
    'Jennifer Kim', '022-6667777',
    'Beef', 'Heart medication daily', 'Needs quiet environment');

