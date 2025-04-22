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

-- ============================================================
--   Seed Data: locations
-- ============================================================
INSERT INTO locations (name, type, latitude, longitude, description, address, image_url, added_by_user_id) VALUES
('Cornwall Park', 'Park', -36.8848, 174.7762, 'Great open spaces for dogs to exercise, leash-free areas available.', 'Green Lane West, Epsom, Auckland 1051', '/images/locations/cornwall-park.jpg', 1), -- Added by Alice (user_id 1)
('Devonport Beach', 'Beach', -36.8310, 174.7980, 'Popular spot for dog walks, check local council rules for times.', 'King Edward Parade, Devonport, Auckland 0624', '/images/locations/devonport-beach.jpg', 3), -- Added by Carol (user_id 3)
('Meola Reef Dog Park', 'Park', -36.8645, 174.7194, 'Large fully-fenced off-leash dog park with agility equipment.', '171R Meola Road, Point Chevalier, Auckland 1022', '/images/locations/meola-reef.jpg', NULL); -- Added by system/admin (NULL user_id)

-- ============================================================
--   Seed Data: reviews
-- ============================================================
-- Assuming the locations above got IDs 1, 2, 3 respectively
INSERT INTO reviews (location_id, user_id, rating, comment) VALUES
(1, 3, 5, 'Absolutely fantastic park! Huge area for dogs to run off-leash. Very clean and well-maintained.'), -- Review for Cornwall Park (location_id 1) by Carol (user_id 3)
(2, 1, 4, 'Lovely beach for a walk, but can get busy. Make sure to check the dog access times.'); -- Review for Devonport Beach (location_id 2) by Alice (user_id 1)

