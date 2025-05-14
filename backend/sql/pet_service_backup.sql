-- MySQL dump 10.13  Distrib 5.7.24, for osx10.9 (x86_64)
--
-- Host: localhost    Database: pet_service_app
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `availability`
--

DROP DATABASE IF EXISTS pet_service_app; 
CREATE DATABASE pet_service_app; 
USE pet_service_app; 

DROP TABLE IF EXISTS `availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `availability` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `weekday` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `availability_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
INSERT INTO `availability` VALUES (21,5,'Monday','10:00:00','11:00:00','2025-05-06 11:12:44'),(22,5,'Thursday','11:00:00','12:00:00','2025-05-06 11:12:44'),(23,5,'Saturday','15:00:00','16:00:00','2025-05-06 11:12:44'),(24,5,'Wednesday','15:00:00','16:00:00','2025-05-06 11:12:44'),(25,1,'Monday','09:00:00','10:00:00','2025-05-06 15:26:34'),(26,1,'Monday','10:00:00','11:00:00','2025-05-06 15:26:34'),(27,1,'Tuesday','11:00:00','12:00:00','2025-05-06 15:26:34'),(28,1,'Tuesday','15:00:00','16:00:00','2025-05-06 15:26:34'),(29,1,'Monday','11:00:00','12:00:00','2025-05-06 15:26:34'),(30,1,'Monday','13:00:00','14:00:00','2025-05-06 15:26:34');
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Booking ID',
  `owner_id` bigint NOT NULL COMMENT 'ID of the pet owner',
  `sitter_id` bigint NOT NULL COMMENT 'ID of the sitter',
  `pet_type` enum('dog','cat') NOT NULL COMMENT 'Type of pet',
  `service_type` enum('Dog Walking','In-Home Feeding','Dog Grooming & Care') DEFAULT NULL,
  `start_time` datetime NOT NULL COMMENT 'Service start time',
  `end_time` datetime NOT NULL COMMENT 'Service end time',
  `status` enum('pending','accepted','rejected','cancelled','completed') DEFAULT 'pending' COMMENT 'Current booking status',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `language` varchar(32) DEFAULT NULL,
  `pet_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (4,5,1,'dog','Dog Walking','2025-05-04 09:00:00','2025-05-04 10:00:00','cancelled','2025-05-02 23:19:14','2025-05-03 11:46:20','English',7),(5,5,1,'dog','Dog Walking','2025-04-30 09:00:00','2025-05-04 10:00:00','completed','2025-05-03 11:51:26','2025-05-03 11:51:26','English',7),(6,5,1,'dog','Dog Walking','2025-05-11 11:00:00','2025-05-11 12:00:00','cancelled','2025-05-06 11:13:18','2025-05-06 11:14:50','English',7);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_complain`
--

DROP TABLE IF EXISTS `booking_complain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking_complain` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `booking_id` bigint NOT NULL,
  `reviewer_id` bigint NOT NULL,
  `sitter_id` bigint NOT NULL,
  `content` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_booking_review` (`booking_id`),
  KEY `reviewer_id` (`reviewer_id`),
  KEY `sitter_id` (`sitter_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_complain`
--

LOCK TABLES `booking_complain` WRITE;
/*!40000 ALTER TABLE `booking_complain` DISABLE KEYS */;
INSERT INTO `booking_complain` VALUES (5,5,5,1,'very idiot','2025-05-04 22:05:05');
/*!40000 ALTER TABLE `booking_complain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_review`
--

DROP TABLE IF EXISTS `booking_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking_review` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `booking_id` bigint NOT NULL,
  `reviewer_id` bigint NOT NULL,
  `sitter_id` bigint NOT NULL,
  `rating` tinyint NOT NULL,
  `comment` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_booking_review` (`booking_id`),
  KEY `reviewer_id` (`reviewer_id`),
  KEY `sitter_id` (`sitter_id`),
  CONSTRAINT `booking_review_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE,
  CONSTRAINT `booking_review_ibfk_2` FOREIGN KEY (`reviewer_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE,
  CONSTRAINT `booking_review_ibfk_3` FOREIGN KEY (`sitter_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE,
  CONSTRAINT `booking_review_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_review`
--

LOCK TABLES `booking_review` WRITE;
/*!40000 ALTER TABLE `booking_review` DISABLE KEYS */;
INSERT INTO `booking_review` VALUES (10,5,5,1,2,'2 is enough','2025-05-04 22:05:03');
/*!40000 ALTER TABLE `booking_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_status_log`
--

DROP TABLE IF EXISTS `booking_status_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking_status_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `booking_id` bigint NOT NULL COMMENT 'Related booking ID',
  `status` enum('pending','accepted','rejected','cancelled','completed') NOT NULL COMMENT 'New status',
  `changed_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp of status change',
  `note` text COMMENT 'Optional notes',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_status_log`
--

LOCK TABLES `booking_status_log` WRITE;
/*!40000 ALTER TABLE `booking_status_log` DISABLE KEYS */;
INSERT INTO `booking_status_log` VALUES (1,1,'pending','2025-05-02 06:12:13','Booking created'),(2,2,'pending','2025-05-02 10:56:17','Booking created'),(3,3,'pending','2025-05-02 11:01:02','Booking created'),(4,4,'pending','2025-05-02 11:19:14','Booking created'),(5,4,'cancelled','2025-05-02 23:46:20',''),(6,4,'cancelled','2025-05-02 23:46:31',''),(7,4,'cancelled','2025-05-02 23:46:54',''),(8,4,'cancelled','2025-05-02 23:47:06',''),(9,6,'pending','2025-05-05 23:13:18','Booking created'),(10,6,'cancelled','2025-05-05 23:14:50','');
/*!40000 ALTER TABLE `booking_status_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_reviews`
--

DROP TABLE IF EXISTS `location_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location_reviews` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `location_id` int unsigned NOT NULL,
  `user_id` bigint NOT NULL,
  `rating` tinyint unsigned NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_review` (`location_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `location_reviews_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `location_reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE,
  CONSTRAINT `location_reviews_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_reviews`
--

LOCK TABLES `location_reviews` WRITE;
/*!40000 ALTER TABLE `location_reviews` DISABLE KEYS */;
INSERT INTO `location_reviews` VALUES (1,1,3,5,'Absolutely fantastic park! Huge area for dogs to run off-leash. Very clean and well-maintained.','2023-02-15 01:30:00'),(2,1,2,4,'Great place for a picnic with your dog. Beautiful scenery.','2023-05-21 22:15:00'),(3,2,1,4,'Lovely park in the city center. Perfect for a quick walk with your pet.','2023-08-10 04:45:00'),(4,2,4,5,'Beautiful gardens and plenty of shade. My dog loves it here.','2023-11-04 20:30:00'),(5,3,2,5,'One of the best parks in Auckland. Lots of space and well-maintained.','2024-01-19 22:20:00'),(6,3,3,4,'Great for both dogs and owners. Beautiful views of the city.','2023-03-18 02:10:00'),(7,4,1,4,'Lovely beach for a walk, but can get busy. Make sure to check the dog access times.','2023-06-12 01:25:00'),(8,4,3,5,'Perfect spot for a morning walk with my dog. Beautiful views.','2023-09-27 19:45:00'),(9,5,2,4,'Great beach with clear water. Dog-friendly areas are well marked.','2023-12-15 01:50:00'),(10,5,4,5,'My dog\'s favorite beach! Always clean and well-maintained.','2024-02-07 21:30:00'),(11,6,1,5,'Best dog park on the Shore! Fully fenced and has everything a dog needs.','2023-04-05 04:20:00'),(12,6,3,4,'Great facilities and friendly dog owners.','2023-07-22 00:15:00'),(13,7,2,5,'Amazing dog park! My pup loves the agility equipment.','2023-10-17 20:40:00'),(14,7,4,4,'Great place to socialize your dog. Always clean and well-maintained.','2024-01-05 01:55:00'),(15,8,1,4,'Beautiful park with great walking trails.','2023-03-29 22:25:00'),(16,8,3,5,'Perfect for a weekend walk with the family and pets.','2023-06-25 03:30:00'),(17,9,2,4,'Quiet beach, perfect for dogs who don\'t like crowds.','2023-09-14 22:10:00'),(18,9,4,3,'Nice spot but can be muddy at high tide.','2023-12-28 00:45:00'),(19,10,1,5,'Beautiful beach with great dog-friendly areas.','2024-02-14 20:20:00'),(20,10,3,4,'Popular spot but worth the visit. Great for swimming.','2023-05-08 02:35:00'),(21,11,2,4,'Convenient shopping area that welcomes dogs.','2023-08-21 23:50:00'),(22,11,4,3,'Good for a quick stop but limited dog-friendly seating.','2023-11-30 03:15:00'),(23,12,1,5,'Huge park with something for everyone.','2024-01-11 21:40:00'),(24,12,3,4,'Great for sports and dog walking.','2023-04-20 01:20:00'),(25,13,2,4,'Large park with plenty of space for dogs to run.','2023-07-15 03:45:00'),(26,13,4,5,'One of the best parks in South Auckland.','2023-10-04 20:55:00'),(27,14,1,3,'Nice views but can be windy.','2024-02-21 23:30:00'),(28,14,3,4,'Great for a quiet walk with your dog.','2023-05-30 02:10:00'),(29,15,2,5,'Unique park with farm animals. My dog loves watching the sheep!','2023-08-17 23:15:00'),(30,15,4,4,'Educational and fun for both pets and owners.','2023-12-10 03:40:00');
/*!40000 ALTER TABLE `location_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `description` text,
  `address` varchar(255) DEFAULT NULL,
  `image_url` varchar(2048) DEFAULT NULL,
  `added_by_user_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `added_by_user_id` (`added_by_user_id`),
  CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`added_by_user_id`) REFERENCES `user_info` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'Cornwall Park','Park',-36.88480000,174.77620000,'Great open spaces for dogs to exercise, leash-free areas available.','Green Lane West, Epsom, Auckland 1051','/images/locations/Cornwall Park (Park).jpg',1,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(2,'Albert Park','Park',-36.85090000,174.76450000,'Historic park in the heart of Auckland CBD with beautiful gardens.','Princes Street, Auckland CBD','/images/locations/Albert Park (Park).jpg',2,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(3,'Auckland Domain','Park',-36.86040000,174.77620000,'Auckland\'s oldest park with walking trails and gardens.','Park Road, Grafton','/images/locations/Auckland Domain (Park).jpg',3,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(4,'Devonport Beach','Beach',-36.83100000,174.79800000,'Popular spot for dog walks, check local council rules for times.','King Edward Parade, Devonport, Auckland 0624','/images/locations/Devonport Beach (Beach).jpg',3,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(5,'Takapuna Beach','Beach',-36.78750000,174.76890000,'Beautiful beach with dog-friendly areas.','The Promenade, Takapuna','/images/locations/Takapuna Beach (Beach).avif',4,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(6,'North Shore Dog Park','Park',-36.80220000,174.75000000,'Fully fenced off-leash area with agility equipment.','Esmonde Road, Takapuna','/images/locations/North Shore Dog Park (Park).jpeg',1,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(7,'Meola Reef Dog Park','Park',-36.86450000,174.71940000,'Large fully-fenced off-leash dog park with agility equipment.','171R Meola Road, Point Chevalier, Auckland 1022','/images/locations/Meola Reef Dog Park (Park).jpg',NULL,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(8,'Henderson Valley Park','Park',-36.89000000,174.63000000,'Scenic park with walking trails and off-leash areas.','Henderson Valley Road, Henderson','/images/locations/Henderson Valley Park (Park).jpg',2,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(9,'Titirangi Beach','Beach',-36.95000000,174.65000000,'Quiet beach with dog-friendly sections.','Titirangi Road, Titirangi','/images/locations/Titirangi Beach (Beach).jpeg',3,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(10,'Eastern Beach','Beach',-36.90000000,174.90000000,'Popular beach with designated dog areas.','Eastern Beach Road, Howick','/images/locations/Eastern Beach (Beach).jpg',4,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(11,'Botany Town Centre','Shopping',-36.91670000,174.90000000,'Dog-friendly shopping area with outdoor seating.','Corner of Ti Rakau Drive and Botany Road','/images/locations/Botany Town Centre (Shopping).jpg',1,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(12,'Lloyd Elsmore Park','Park',-36.91670000,174.91670000,'Large park with sports fields and walking trails.','Pakuranga Road, Pakuranga','/images/locations/Lloyd Elsmore Park (Park).jpg',2,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(13,'Totara Park','Park',-37.00000000,174.90000000,'Extensive park with walking trails and picnic areas.','Wairere Road, Manurewa','/images/locations/Totara Park (Park).jpg',3,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(14,'Manukau Harbour','Beach',-37.05000000,174.85000000,'Scenic coastal area with dog-friendly beaches.','Mangere Bridge','/images/locations/Manukau Harbour (Beach).jpg',4,'2025-05-01 00:26:57','2025-05-01 00:26:57'),(15,'Ambury Regional Park','Park',-36.95000000,174.80000000,'Working farm park with walking trails and animal viewing.','43 Ambury Road, Mangere Bridge','/images/locations/Ambury Regional Park (Park).jpg',1,'2025-05-01 00:26:57','2025-05-01 00:26:57');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_info`
--

DROP TABLE IF EXISTS `notice_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notice_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `receiver_id` bigint NOT NULL,
  `title` varchar(128) NOT NULL,
  `message` varchar(1024) NOT NULL,
  `read_tag` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `receiver_id` (`receiver_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_info`
--

LOCK TABLES `notice_info` WRITE;
/*!40000 ALTER TABLE `notice_info` DISABLE KEYS */;
INSERT INTO `notice_info` VALUES (8,1,'New Review Received','You have received a new review for booking, which id is: 5.',0,'2025-05-04 22:05:03'),(9,1,'New Complain','You have a new complain for booking which number is: 5.',0,'2025-05-04 22:05:05'),(10,1,'new booking','You have received a new booking. Please check your bookings.',0,'2025-05-06 11:13:18'),(11,6,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-06 11:14:50');
/*!40000 ALTER TABLE `notice_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet_info`
--

DROP TABLE IF EXISTS `pet_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pet_info` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary key: pet ID',
  `owner_id` bigint NOT NULL COMMENT 'Foreign key: references user_info(id)',
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Pet type (e.g., dog, cat)',
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Pet name',
  `description` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Additional description',
  `photo_url` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Photo URL',
  `allergies` text COLLATE utf8mb4_unicode_ci COMMENT 'Pet allergies',
  `medications` text COLLATE utf8mb4_unicode_ci COMMENT 'Current medications',
  `special_instructions` text COLLATE utf8mb4_unicode_ci COMMENT 'Special care instructions',
  `vet_contact_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Veterinarian name',
  `vet_contact_phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Veterinarian phone number',
  `emergency_contact_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Emergency contact name',
  `emergency_contact_phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Emergency contact phone number',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation time',
  `gmt_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update time',
  PRIMARY KEY (`id`),
  KEY `idx_owner_id` (`owner_id`) COMMENT 'Index on owner_id',
  CONSTRAINT `pet_info_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Pet profile information table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet_info`
--

LOCK TABLES `pet_info` WRITE;
/*!40000 ALTER TABLE `pet_info` DISABLE KEYS */;
INSERT INTO `pet_info` VALUES (1,3,'dog','Max','Friendly golden retriever, loves swimming.','/images/uploads/pets/max.jpg','Peanut butter','Flea treatment monthly','Needs daily joint supplements','Dr. James Wilson','021-5556666','Mary Smith','022-3334444','2025-05-01 12:26:57','2025-05-01 12:26:57'),(2,3,'cat','Luna','Black cat, indoor only.','/images/uploads/pets/luna.jpg','Chicken','Thyroid medication twice daily','Sensitive stomach - special diet only','Dr. Emma Chen','021-7778888','Peter Wong','022-9990000','2025-05-01 12:26:57','2025-05-01 12:26:57'),(3,4,'dog','Charlie','Energetic beagle puppy.','/images/uploads/pets/charlie.jpg','None','Deworming medication','Needs three walks daily','Dr. Michael Brown','021-2223333','Sarah Johnson','022-4445555','2025-05-01 12:26:57','2025-05-01 12:26:57'),(4,1,'Cat','Oliver','Senior ginger cat.A','/images/uploads/pets/1746481741865.png','Dairy','Arthritis medication','Cannot jump high - food and litter must be easily accessible','Dr. Lisa Taylor','021-8889999','David Lee','022-1112222','2025-05-01 12:26:57','2025-05-06 09:49:01'),(5,2,'dog','Bella','Calm labrador, therapy dog.','/images/uploads/pets/bella.jpg','Beef','Heart medication daily','Needs quiet environment','Dr. Robert Park','021-4445555','Jennifer Kim','022-6667777','2025-05-01 12:26:57','2025-05-01 12:26:57'),(6,1,'Dog','duoduo','aaaadwadwxx','/images/uploads/pets/1746501956441.png','yes','yes','spex',NULL,'54321',NULL,'12345','2025-05-01 12:31:21','2025-05-06 15:25:56'),(7,5,'Dog','longlong','a big while but silly dog',NULL,'no','yes','nothing',NULL,'54321',NULL,'12345','2025-05-02 14:43:53','2025-05-02 14:43:53'),(10,1,'Cat','莎莎','girl','/images/uploads/pets/1746501948672.png','yes','no','no',NULL,'2343423',NULL,'464565475','2025-05-06 08:46:44','2025-05-06 15:25:48');
/*!40000 ALTER TABLE `pet_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_languages`
--

DROP TABLE IF EXISTS `service_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_languages` (
  `service_id` int NOT NULL,
  `language` varchar(50) NOT NULL COMMENT '英语、中文等',
  PRIMARY KEY (`service_id`,`language`),
  CONSTRAINT `service_languages_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_languages`
--

LOCK TABLES `service_languages` WRITE;
/*!40000 ALTER TABLE `service_languages` DISABLE KEYS */;
INSERT INTO `service_languages` VALUES (3,'English'),(3,'Hindi'),(3,'Japanese'),(3,'Korean'),(3,'Spanish'),(3,'Te Reo Māori'),(3,'中文');
/*!40000 ALTER TABLE `service_languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_pet_types`
--

DROP TABLE IF EXISTS `service_pet_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service_pet_types` (
  `service_id` int NOT NULL,
  `pet_type` varchar(50) NOT NULL COMMENT '猫、狗、鸟等',
  `price_adjustment` decimal(10,2) DEFAULT '0.00' COMMENT '针对该宠物的价格调整',
  PRIMARY KEY (`service_id`,`pet_type`),
  CONSTRAINT `service_pet_types_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_pet_types`
--

LOCK TABLES `service_pet_types` WRITE;
/*!40000 ALTER TABLE `service_pet_types` DISABLE KEYS */;
INSERT INTO `service_pet_types` VALUES (1,'Dog',0.00),(2,'Cat',0.00),(3,'Dog',0.00);
/*!40000 ALTER TABLE `service_pet_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '服务名称（如遛狗、寄养）',
  `base_price` decimal(10,2) NOT NULL COMMENT '基础价格',
  `duration` varchar(50) DEFAULT NULL COMMENT '默认时长（如1小时）',
  `description` text COMMENT '服务描述',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Dog Walking',25.00,'30 minutes','Daily outdoor walks for dogs','2025-05-01 01:35:05'),(2,'In-Home Feeding',30.00,'30 minutes','Feeding pets such as cats at the owner\'s home','2025-05-01 01:35:05'),(3,'Dog Grooming & Care',50.00,'1 hour','Grooming, bathing, and basic medical care for dogs','2025-05-01 01:35:05');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sitter_services`
--

DROP TABLE IF EXISTS `sitter_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sitter_services` (
  `sitter_id` bigint NOT NULL COMMENT '照看者用户ID',
  `service_id` int NOT NULL,
  `custom_price` decimal(10,2) DEFAULT NULL COMMENT '照看者自定义价格',
  PRIMARY KEY (`sitter_id`,`service_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `sitter_services_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sitter_services_ibfk_2` FOREIGN KEY (`sitter_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sitter_services`
--

LOCK TABLES `sitter_services` WRITE;
/*!40000 ALTER TABLE `sitter_services` DISABLE KEYS */;
INSERT INTO `sitter_services` VALUES (1,1,NULL),(1,2,NULL),(1,3,NULL),(5,1,NULL),(5,2,NULL);
/*!40000 ALTER TABLE `sitter_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_certificates`
--

DROP TABLE IF EXISTS `user_certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_certificates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `certificate_name` varchar(255) NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_certificates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_certificates`
--

LOCK TABLES `user_certificates` WRITE;
/*!40000 ALTER TABLE `user_certificates` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_info` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'User ID, primary key',
  `email` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'User email, used for login',
  `password` varchar(512) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Encrypted password',
  `bio` text COLLATE utf8mb4_unicode_ci COMMENT 'User bio/introduction',
  `region` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Region',
  `user_name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'User nickname',
  `status` int DEFAULT '0' COMMENT 'User status: 0 = active, 1 = disabled',
  `avatar` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'User avatar URL',
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Phone number',
  `emergency_contact` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Emergency contact name or number',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `gmt_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_email` (`email`) COMMENT 'Unique index on email',
  KEY `idx_user_name` (`user_name`) COMMENT 'Index on nickname'
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='User info table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'alice@example.com','$2b$10$85iiYFTMuy.F5rAQlmPebudDe3WUT9rC2.KxrE0PIh4kU/sCeEIee','Loves cats and long walks.','North Shore','AliceCat',0,'1746486639803.png','0211234567','0219876543','2025-05-01 12:26:57','2025-05-06 11:10:39'),(2,'bob@example.com','$2b$10$AQ.2y1ZFFb0pFiDc9ISd1.CKDFlU9rnQHajYGEW9uKAzXh0sVpHle','Experienced dog sitter.','West Auckland','BobWoof',0,'/images/uploads/avatars/user2-avatar','0227654321','0214567890','2025-05-01 12:26:57','2025-05-01 12:26:57'),(3,'carol@example.com','$2b$10$PK4c89SheNggUEy2duTnGOkWvnYqZ39iGpA8Lw2oViLFv.nnKB8QW','Pet lover with a big heart.','Central Auckland','CarolPaws',0,'/images/uploads/avatars/user3-avatar','0201112222','0273334444','2025-05-01 12:26:57','2025-05-01 12:26:57'),(4,'dave@example.com','$2b$10$pM1CyLLDTYGkH4IQGIv59Ognw26DRll4GrZRFILIulrp/Fgwj.cj2','Professional pet trainer.','East Auckland','DaveTrain',0,'/images/uploads/avatars/user4-avatar','0275556666','0208889999','2025-05-01 12:26:57','2025-05-01 12:26:57'),(5,'lucy@example.com','$2b$10$lCR123VIp7qIrFaHufvT3eBcMkzSp1y8LhsI7Bg45.w/wfxMdhSZe','love dog','central-auckland','lucydog',0,'1746486749217.png',NULL,NULL,'2025-05-02 14:41:45','2025-05-06 11:12:29'),(6,'xiao@example.com','$2b$10$6AloZ0c13nNqgBGH2u/oq.TBJFQuzwm1adQ8tHAmO.5PuLFmS2Jky','love dog','south-auckland','xiao',0,'1746504076919.png',NULL,NULL,'2025-05-06 16:01:17','2025-05-06 16:01:17');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_languages`
--

DROP TABLE IF EXISTS `user_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_languages` (
  `user_id` bigint NOT NULL,
  `language` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`language`),
  CONSTRAINT `user_languages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_languages`
--

LOCK TABLES `user_languages` WRITE;
/*!40000 ALTER TABLE `user_languages` DISABLE KEYS */;
INSERT INTO `user_languages` VALUES (1,'English'),(1,'Te Reo Māori'),(1,'中文'),(5,'English'),(5,'Te Reo Māori'),(5,'中文');
/*!40000 ALTER TABLE `user_languages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-06 18:36:40
