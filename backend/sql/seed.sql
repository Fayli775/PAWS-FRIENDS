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
-- Central Auckland
('Cornwall Park', 'Park', -36.8848, 174.7762, 'Great open spaces for dogs to exercise, leash-free areas available.', 'Green Lane West, Epsom, Auckland 1051', '/images/locations/Cornwall Park (Park).jpg', 1),
('Albert Park', 'Park', -36.8509, 174.7645, 'Historic park in the heart of Auckland CBD with beautiful gardens.', 'Princes Street, Auckland CBD', '/images/locations/Albert Park (Park).jpg', 2),
('Auckland Domain', 'Park', -36.8604, 174.7762, 'Auckland''s oldest park with walking trails and gardens.', 'Park Road, Grafton', '/images/locations/Auckland Domain (Park).jpg', 3),

-- North Shore
('Devonport Beach', 'Beach', -36.8310, 174.7980, 'Popular spot for dog walks, check local council rules for times.', 'King Edward Parade, Devonport, Auckland 0624', '/images/locations/Devonport Beach (Beach).jpg', 3),
('Takapuna Beach', 'Beach', -36.7875, 174.7689, 'Beautiful beach with dog-friendly areas.', 'The Promenade, Takapuna', '/images/locations/Takapuna Beach (Beach).avif', 4),
('North Shore Dog Park', 'Park', -36.8022, 174.7500, 'Fully fenced off-leash area with agility equipment.', 'Esmonde Road, Takapuna', '/images/locations/North Shore Dog Park (Park).jpeg', 1),

-- West Auckland
('Meola Reef Dog Park', 'Park', -36.8645, 174.7194, 'Large fully-fenced off-leash dog park with agility equipment.', '171R Meola Road, Point Chevalier, Auckland 1022', '/images/locations/Meola Reef Dog Park (Park).jpg', NULL),
('Henderson Valley Park', 'Park', -36.8900, 174.6300, 'Scenic park with walking trails and off-leash areas.', 'Henderson Valley Road, Henderson', '/images/locations/Henderson Valley Park (Park).jpg', 2),
('Titirangi Beach', 'Beach', -36.9500, 174.6500, 'Quiet beach with dog-friendly sections.', 'Titirangi Road, Titirangi', '/images/locations/Titirangi Beach (Beach).jpeg', 3),

-- East Auckland
('Eastern Beach', 'Beach', -36.9000, 174.9000, 'Popular beach with designated dog areas.', 'Eastern Beach Road, Howick', '/images/locations/Eastern Beach (Beach).jpg', 4),
('Botany Town Centre', 'Shopping', -36.9167, 174.9000, 'Dog-friendly shopping area with outdoor seating.', 'Corner of Ti Rakau Drive and Botany Road', '/images/locations/Botany Town Centre (Shopping).jpg', 1),
('Lloyd Elsmore Park', 'Park', -36.9167, 174.9167, 'Large park with sports fields and walking trails.', 'Pakuranga Road, Pakuranga', '/images/locations/Lloyd Elsmore Park (Park).jpg', 2),

-- South Auckland
('Totara Park', 'Park', -37.0000, 174.9000, 'Extensive park with walking trails and picnic areas.', 'Wairere Road, Manurewa', '/images/locations/Totara Park (Park).jpg', 3),
('Manukau Harbour', 'Beach', -37.0500, 174.8500, 'Scenic coastal area with dog-friendly beaches.', 'Mangere Bridge', '/images/locations/Manukau Harbour (Beach).jpg', 4),
('Ambury Regional Park', 'Park', -36.9500, 174.8000, 'Working farm park with walking trails and animal viewing.', '43 Ambury Road, Mangere Bridge', '/images/locations/Ambury Regional Park (Park).jpg', 1);

-- ============================================================
--   Seed Data: location_reviews
-- ============================================================
INSERT INTO location_reviews (location_id, user_id, rating, comment, created_at) VALUES
-- Reviews for Central Auckland locations
(1, 3, 5, 'Absolutely fantastic park! Huge area for dogs to run off-leash. Very clean and well-maintained.', '2023-02-15 14:30:00'),
(1, 2, 4, 'Great place for a picnic with your dog. Beautiful scenery.', '2023-05-22 10:15:00'),
(2, 1, 4, 'Lovely park in the city center. Perfect for a quick walk with your pet.', '2023-08-10 16:45:00'),
(2, 4, 5, 'Beautiful gardens and plenty of shade. My dog loves it here.', '2023-11-05 09:30:00'),
(3, 2, 5, 'One of the best parks in Auckland. Lots of space and well-maintained.', '2024-01-20 11:20:00'),
(3, 3, 4, 'Great for both dogs and owners. Beautiful views of the city.', '2023-03-18 15:10:00'),

-- Reviews for North Shore locations
(4, 1, 4, 'Lovely beach for a walk, but can get busy. Make sure to check the dog access times.', '2023-06-12 13:25:00'),
(4, 3, 5, 'Perfect spot for a morning walk with my dog. Beautiful views.', '2023-09-28 08:45:00'),
(5, 2, 4, 'Great beach with clear water. Dog-friendly areas are well marked.', '2023-12-15 14:50:00'),
(5, 4, 5, 'My dog''s favorite beach! Always clean and well-maintained.', '2024-02-08 10:30:00'),
(6, 1, 5, 'Best dog park on the Shore! Fully fenced and has everything a dog needs.', '2023-04-05 16:20:00'),
(6, 3, 4, 'Great facilities and friendly dog owners.', '2023-07-22 12:15:00'),

-- Reviews for West Auckland locations
(7, 2, 5, 'Amazing dog park! My pup loves the agility equipment.', '2023-10-18 09:40:00'),
(7, 4, 4, 'Great place to socialize your dog. Always clean and well-maintained.', '2024-01-05 14:55:00'),
(8, 1, 4, 'Beautiful park with great walking trails.', '2023-03-30 11:25:00'),
(8, 3, 5, 'Perfect for a weekend walk with the family and pets.', '2023-06-25 15:30:00'),
(9, 2, 4, 'Quiet beach, perfect for dogs who don''t like crowds.', '2023-09-15 10:10:00'),
(9, 4, 3, 'Nice spot but can be muddy at high tide.', '2023-12-28 13:45:00'),

-- Reviews for East Auckland locations
(10, 1, 5, 'Beautiful beach with great dog-friendly areas.', '2024-02-15 09:20:00'),
(10, 3, 4, 'Popular spot but worth the visit. Great for swimming.', '2023-05-08 14:35:00'),
(11, 2, 4, 'Convenient shopping area that welcomes dogs.', '2023-08-22 11:50:00'),
(11, 4, 3, 'Good for a quick stop but limited dog-friendly seating.', '2023-11-30 16:15:00'),
(12, 1, 5, 'Huge park with something for everyone.', '2024-01-12 10:40:00'),
(12, 3, 4, 'Great for sports and dog walking.', '2023-04-20 13:20:00'),

-- Reviews for South Auckland locations
(13, 2, 4, 'Large park with plenty of space for dogs to run.', '2023-07-15 15:45:00'),
(13, 4, 5, 'One of the best parks in South Auckland.', '2023-10-05 09:55:00'),
(14, 1, 3, 'Nice views but can be windy.', '2024-02-22 12:30:00'),
(14, 3, 4, 'Great for a quiet walk with your dog.', '2023-05-30 14:10:00'),
(15, 2, 5, 'Unique park with farm animals. My dog loves watching the sheep!', '2023-08-18 11:15:00'),
(15, 4, 4, 'Educational and fun for both pets and owners.', '2023-12-10 16:40:00');

