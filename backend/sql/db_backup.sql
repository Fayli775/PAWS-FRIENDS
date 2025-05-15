-- MySQL dump 10.13  Distrib 8.0.41-32, for Linux (x86_64)
--
-- Host: localhost    Database: bb0ydchaqyskd0bpdrdb
-- ------------------------------------------------------
-- Server version	8.0.41-32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!50717 SELECT COUNT(*) INTO @rocksdb_has_p_s_session_variables FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'performance_schema' AND TABLE_NAME = 'session_variables' */;
/*!50717 SET @rocksdb_get_is_supported = IF (@rocksdb_has_p_s_session_variables, 'SELECT COUNT(*) INTO @rocksdb_is_supported FROM performance_schema.session_variables WHERE VARIABLE_NAME=\'rocksdb_bulk_load\'', 'SELECT 0') */;
/*!50717 PREPARE s FROM @rocksdb_get_is_supported */;
/*!50717 EXECUTE s */;
/*!50717 DEALLOCATE PREPARE s */;
/*!50717 SET @rocksdb_enable_bulk_load = IF (@rocksdb_is_supported, 'SET SESSION rocksdb_bulk_load = 1', 'SET @rocksdb_dummy_bulk_load = 0') */;
/*!50717 PREPARE s FROM @rocksdb_enable_bulk_load */;
/*!50717 EXECUTE s */;
/*!50717 DEALLOCATE PREPARE s */;

--
-- Table structure for table `availability`
--
DROP DATABASE IF EXISTS pet_service_app; 
CREATE DATABASE pet_service_app; 
USE pet_service_app; 


DROP TABLE IF EXISTS `availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=670 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availability`
--

LOCK TABLES `availability` WRITE;
/*!40000 ALTER TABLE `availability` DISABLE KEYS */;
INSERT INTO `availability` VALUES (21,5,'Monday','10:00:00','11:00:00','2025-05-06 11:12:44'),(22,5,'Thursday','11:00:00','12:00:00','2025-05-06 11:12:44'),(23,5,'Saturday','15:00:00','16:00:00','2025-05-06 11:12:44'),(24,5,'Wednesday','15:00:00','16:00:00','2025-05-06 11:12:44'),(86,18,'Monday','09:00:00','10:00:00','2025-05-12 09:52:26'),(87,18,'Tuesday','10:00:00','11:00:00','2025-05-12 09:52:26'),(88,18,'Wednesday','13:00:00','14:00:00','2025-05-12 09:52:26'),(89,18,'Friday','15:00:00','16:00:00','2025-05-12 09:52:26'),(90,18,'Sunday','20:00:00','21:00:00','2025-05-12 09:52:26'),(91,18,'Tuesday','20:00:00','21:00:00','2025-05-12 09:52:26'),(92,13,'Friday','09:00:00','10:00:00','2025-05-12 10:36:50'),(93,13,'Friday','10:00:00','11:00:00','2025-05-12 10:36:50'),(94,13,'Friday','11:00:00','12:00:00','2025-05-12 10:36:50'),(95,13,'Friday','13:00:00','14:00:00','2025-05-12 10:36:50'),(96,13,'Friday','14:00:00','15:00:00','2025-05-12 10:36:50'),(97,13,'Friday','15:00:00','16:00:00','2025-05-12 10:36:50'),(98,13,'Friday','20:00:00','21:00:00','2025-05-12 10:36:50'),(99,13,'Friday','21:00:00','22:00:00','2025-05-12 10:36:50'),(204,10,'Thursday','11:00:00','12:00:00','2025-05-12 22:49:11'),(205,10,'Thursday','14:00:00','15:00:00','2025-05-12 22:49:11'),(206,10,'Saturday','09:00:00','10:00:00','2025-05-12 22:49:11'),(207,10,'Saturday','14:00:00','15:00:00','2025-05-12 22:49:11'),(208,10,'Sunday','11:00:00','12:00:00','2025-05-12 22:49:11'),(257,14,'Monday','09:00:00','10:00:00','2025-05-12 23:10:30'),(258,14,'Monday','10:00:00','11:00:00','2025-05-12 23:10:30'),(259,14,'Saturday','09:00:00','10:00:00','2025-05-12 23:10:30'),(260,14,'Saturday','10:00:00','11:00:00','2025-05-12 23:10:30'),(261,14,'Friday','09:00:00','10:00:00','2025-05-12 23:10:30'),(262,14,'Thursday','09:00:00','10:00:00','2025-05-12 23:10:30'),(263,14,'Thursday','10:00:00','11:00:00','2025-05-12 23:10:30'),(264,14,'Thursday','11:00:00','12:00:00','2025-05-12 23:10:30'),(265,14,'Thursday','13:00:00','14:00:00','2025-05-12 23:10:30'),(266,14,'Thursday','14:00:00','15:00:00','2025-05-12 23:10:30'),(267,14,'Thursday','15:00:00','16:00:00','2025-05-12 23:10:30'),(268,14,'Thursday','20:00:00','21:00:00','2025-05-12 23:10:30'),(269,14,'Thursday','21:00:00','22:00:00','2025-05-12 23:10:30'),(270,14,'Friday','10:00:00','11:00:00','2025-05-12 23:10:30'),(271,14,'Friday','11:00:00','12:00:00','2025-05-12 23:10:30'),(272,14,'Friday','13:00:00','14:00:00','2025-05-12 23:10:30'),(273,14,'Friday','14:00:00','15:00:00','2025-05-12 23:10:30'),(274,14,'Friday','15:00:00','16:00:00','2025-05-12 23:10:30'),(275,14,'Friday','20:00:00','21:00:00','2025-05-12 23:10:30'),(276,14,'Friday','21:00:00','22:00:00','2025-05-12 23:10:30'),(277,14,'Saturday','11:00:00','12:00:00','2025-05-12 23:10:30'),(278,14,'Saturday','13:00:00','14:00:00','2025-05-12 23:10:30'),(279,14,'Saturday','14:00:00','15:00:00','2025-05-12 23:10:30'),(280,14,'Saturday','15:00:00','16:00:00','2025-05-12 23:10:30'),(281,14,'Saturday','20:00:00','21:00:00','2025-05-12 23:10:30'),(282,14,'Saturday','21:00:00','22:00:00','2025-05-12 23:10:30'),(283,14,'Sunday','09:00:00','10:00:00','2025-05-12 23:10:30'),(284,14,'Sunday','10:00:00','11:00:00','2025-05-12 23:10:30'),(285,14,'Sunday','11:00:00','12:00:00','2025-05-12 23:10:30'),(286,14,'Sunday','13:00:00','14:00:00','2025-05-12 23:10:30'),(287,14,'Sunday','14:00:00','15:00:00','2025-05-12 23:10:30'),(288,14,'Sunday','15:00:00','16:00:00','2025-05-12 23:10:30'),(289,14,'Sunday','20:00:00','21:00:00','2025-05-12 23:10:30'),(290,14,'Sunday','21:00:00','22:00:00','2025-05-12 23:10:30'),(433,8,'Monday','09:00:00','10:00:00','2025-05-13 03:19:28'),(434,8,'Wednesday','09:00:00','10:00:00','2025-05-13 03:19:28'),(435,8,'Tuesday','09:00:00','10:00:00','2025-05-13 03:19:28'),(436,8,'Thursday','09:00:00','10:00:00','2025-05-13 03:19:28'),(437,8,'Friday','09:00:00','10:00:00','2025-05-13 03:19:28'),(438,8,'Saturday','09:00:00','10:00:00','2025-05-13 03:19:28'),(439,8,'Sunday','09:00:00','10:00:00','2025-05-13 03:19:28'),(440,8,'Sunday','21:00:00','22:00:00','2025-05-13 03:19:28'),(441,8,'Friday','21:00:00','22:00:00','2025-05-13 03:19:28'),(442,8,'Thursday','21:00:00','22:00:00','2025-05-13 03:19:28'),(443,8,'Saturday','21:00:00','22:00:00','2025-05-13 03:19:28'),(444,8,'Wednesday','21:00:00','22:00:00','2025-05-13 03:19:28'),(445,8,'Tuesday','21:00:00','22:00:00','2025-05-13 03:19:28'),(446,8,'Monday','21:00:00','22:00:00','2025-05-13 03:19:28'),(447,8,'Monday','13:00:00','14:00:00','2025-05-13 03:19:28'),(448,8,'Tuesday','13:00:00','14:00:00','2025-05-13 03:19:28'),(449,8,'Wednesday','13:00:00','14:00:00','2025-05-13 03:19:28'),(450,8,'Thursday','13:00:00','14:00:00','2025-05-13 03:19:28'),(451,8,'Friday','13:00:00','14:00:00','2025-05-13 03:19:28'),(452,8,'Saturday','13:00:00','14:00:00','2025-05-13 03:19:28'),(453,8,'Sunday','13:00:00','14:00:00','2025-05-13 03:19:28'),(520,12,'Monday','13:00:00','14:00:00','2025-05-14 01:48:51'),(521,12,'Friday','13:00:00','14:00:00','2025-05-14 01:48:51'),(522,12,'Wednesday','09:00:00','10:00:00','2025-05-14 01:48:51'),(523,12,'Tuesday','20:00:00','21:00:00','2025-05-14 01:48:51'),(524,15,'Monday','09:00:00','10:00:00','2025-05-14 01:52:21'),(525,15,'Monday','10:00:00','11:00:00','2025-05-14 01:52:21'),(526,15,'Monday','11:00:00','12:00:00','2025-05-14 01:52:21'),(527,15,'Monday','13:00:00','14:00:00','2025-05-14 01:52:21'),(528,15,'Monday','14:00:00','15:00:00','2025-05-14 01:52:21'),(529,15,'Monday','15:00:00','16:00:00','2025-05-14 01:52:21'),(530,15,'Tuesday','15:00:00','16:00:00','2025-05-14 01:52:21'),(531,15,'Tuesday','14:00:00','15:00:00','2025-05-14 01:52:21'),(532,15,'Tuesday','13:00:00','14:00:00','2025-05-14 01:52:21'),(533,15,'Tuesday','11:00:00','12:00:00','2025-05-14 01:52:21'),(534,15,'Tuesday','10:00:00','11:00:00','2025-05-14 01:52:21'),(535,15,'Tuesday','09:00:00','10:00:00','2025-05-14 01:52:21'),(536,15,'Saturday','09:00:00','10:00:00','2025-05-14 01:52:21'),(537,15,'Saturday','10:00:00','11:00:00','2025-05-14 01:52:21'),(538,15,'Saturday','11:00:00','12:00:00','2025-05-14 01:52:21'),(539,15,'Saturday','13:00:00','14:00:00','2025-05-14 01:52:21'),(540,15,'Saturday','14:00:00','15:00:00','2025-05-14 01:52:21'),(541,15,'Saturday','15:00:00','16:00:00','2025-05-14 01:52:21'),(542,25,'Monday','09:00:00','10:00:00','2025-05-14 01:56:10'),(543,25,'Monday','10:00:00','11:00:00','2025-05-14 01:56:10'),(544,25,'Sunday','09:00:00','10:00:00','2025-05-14 01:56:10'),(545,25,'Sunday','10:00:00','11:00:00','2025-05-14 01:56:10'),(600,26,'Monday','06:00:00','07:00:00','2025-05-14 02:42:56'),(601,26,'Tuesday','06:00:00','07:00:00','2025-05-14 02:42:56'),(602,26,'Wednesday','06:00:00','07:00:00','2025-05-14 02:42:56'),(603,26,'Thursday','06:00:00','07:00:00','2025-05-14 02:42:56'),(604,26,'Friday','06:00:00','07:00:00','2025-05-14 02:42:56'),(605,26,'Saturday','06:00:00','07:00:00','2025-05-14 02:42:56'),(606,26,'Sunday','06:00:00','07:00:00','2025-05-14 02:42:56'),(607,26,'Sunday','07:00:00','08:00:00','2025-05-14 02:42:56'),(608,26,'Sunday','09:00:00','10:00:00','2025-05-14 02:42:56'),(609,26,'Sunday','08:00:00','09:00:00','2025-05-14 02:42:56'),(610,26,'Monday','07:00:00','08:00:00','2025-05-14 02:42:56'),(611,26,'Monday','08:00:00','09:00:00','2025-05-14 02:42:56'),(612,26,'Monday','09:00:00','10:00:00','2025-05-14 02:42:56'),(613,26,'Monday','10:00:00','11:00:00','2025-05-14 02:42:56'),(614,26,'Monday','13:00:00','14:00:00','2025-05-14 02:42:56'),(615,26,'Monday','11:00:00','12:00:00','2025-05-14 02:42:56'),(616,26,'Monday','14:00:00','15:00:00','2025-05-14 02:42:56'),(617,26,'Monday','15:00:00','16:00:00','2025-05-14 02:42:56'),(618,26,'Monday','16:00:00','17:00:00','2025-05-14 02:42:56'),(619,26,'Monday','17:00:00','18:00:00','2025-05-14 02:42:56'),(620,26,'Monday','18:00:00','19:00:00','2025-05-14 02:42:56'),(621,26,'Monday','19:00:00','20:00:00','2025-05-14 02:42:56'),(622,26,'Monday','20:00:00','21:00:00','2025-05-14 02:42:56'),(623,26,'Monday','21:00:00','22:00:00','2025-05-14 02:42:56'),(641,1,'Tuesday','11:00:00','12:00:00','2025-05-14 02:47:05'),(642,1,'Thursday','13:00:00','14:00:00','2025-05-14 02:47:05'),(643,1,'Friday','14:00:00','15:00:00','2025-05-14 02:47:05'),(644,1,'Saturday','11:00:00','12:00:00','2025-05-14 02:47:05'),(665,2,'Tuesday','09:00:00','10:00:00','2025-05-14 03:22:29'),(666,2,'Wednesday','09:00:00','10:00:00','2025-05-14 03:22:29'),(667,2,'Thursday','11:00:00','12:00:00','2025-05-14 03:22:29'),(668,2,'Thursday','13:00:00','14:00:00','2025-05-14 03:22:29'),(669,2,'Thursday','17:00:00','18:00:00','2025-05-14 03:22:29');
/*!40000 ALTER TABLE `availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (28,15,25,'cat','In-Home Feeding','2025-05-12 09:00:00','2025-05-12 10:00:00','pending','2025-05-12 23:11:58','2025-05-12 23:11:58','English',20),(30,25,15,'dog','Dog Walking','2025-05-12 13:00:00','2025-05-12 14:00:00','pending','2025-05-12 23:20:13','2025-05-12 23:20:13','English',26),(33,15,25,'cat','In-Home Feeding','2025-05-12 21:00:00','2025-05-12 22:00:00','pending','2025-05-12 23:29:57','2025-05-12 23:29:57','English',24),(34,25,15,'dog','Dog Walking','2025-05-12 11:00:00','2025-05-12 12:00:00','pending','2025-05-12 23:39:17','2025-05-12 23:39:17','English',26),(36,2,14,'dog','In-Home Feeding','2025-05-12 09:00:00','2025-05-12 10:00:00','pending','2025-05-12 23:44:47','2025-05-12 23:44:47','',5),(41,25,15,'dog','Dog Walking','2025-05-19 09:00:00','2025-05-19 10:00:00','pending','2025-05-13 01:14:30','2025-05-13 01:14:30','English',25),(42,13,15,'cat','Dog Walking','2025-05-19 09:00:00','2025-05-19 10:00:00','cancelled','2025-05-13 01:15:55','2025-05-13 01:18:16','中文',23),(43,13,15,'cat','Dog Walking','2025-05-19 09:00:00','2025-05-19 10:00:00','cancelled','2025-05-13 01:19:46','2025-05-13 01:21:32','English',23),(45,13,15,'cat','Dog Walking','2025-05-19 09:00:00','2025-05-19 10:00:00','cancelled','2025-05-13 01:20:29','2025-05-13 01:21:36','English',23),(53,26,15,'dog','Dog Walking','2025-05-19 11:00:00','2025-05-19 12:00:00','cancelled','2025-05-13 01:21:41','2025-05-13 09:33:05','English',28),(54,26,15,'dog','Dog Walking','2025-05-19 11:00:00','2025-05-19 12:00:00','cancelled','2025-05-13 01:21:50','2025-05-13 09:33:02','English',28),(62,26,15,'dog','In-Home Feeding','2025-05-19 09:00:00','2025-05-19 10:00:00','cancelled','2025-05-13 01:24:53','2025-05-13 09:32:58','English',28),(63,8,8,'dog','In-Home Feeding','2025-05-19 21:00:00','2025-05-19 22:00:00','pending','2025-05-13 03:20:18','2025-05-13 03:20:18','Spanish',14),(114,12,2,'dog','In-Home Feeding','2025-05-13 20:59:22','2025-05-13 20:59:22','pending','2025-05-13 08:59:22','2025-05-13 08:59:22','Hindi',22),(127,26,5,'dog','Dog Walking','2025-05-19 10:00:00','2025-05-19 11:00:00','cancelled','2025-05-13 10:03:54','2025-05-13 10:08:42','Te Reo Māori',28),(128,26,5,'cat','In-Home Feeding','2025-05-19 10:00:00','2025-05-19 11:00:00','pending','2025-05-13 10:05:23','2025-05-13 10:05:23','English',34),(130,12,26,'dog','Dog Grooming & Care','2025-05-15 20:00:00','2025-05-15 21:00:00','cancelled','2025-05-13 10:25:06','2025-05-13 10:25:24','中文',22),(131,12,26,'dog','In-Home Feeding','2025-05-17 15:00:00','2025-05-17 16:00:00','cancelled','2025-05-13 10:28:37','2025-05-13 10:46:35','Te Reo Māori',22),(138,10,12,'cat','In-Home Feeding','2025-05-17 09:00:00','2025-05-17 10:00:00','completed','2025-05-14 00:00:34','2025-05-13 12:19:09','English',15),(139,10,12,'cat','Dog Grooming & Care','2025-05-18 13:00:00','2025-05-18 14:00:00','pending','2025-05-14 00:00:39','2025-05-14 00:00:39','English',15),(140,10,12,'cat','In-Home Feeding','2025-05-18 14:00:00','2025-05-18 15:00:00','cancelled','2025-05-14 00:00:45','2025-05-14 00:08:28','English',15),(141,10,12,'cat','In-Home Feeding','2025-05-16 09:00:00','2025-05-16 10:00:00','pending','2025-05-14 00:00:51','2025-05-14 00:00:51','中文',15),(142,10,12,'cat','Dog Walking','2025-05-18 14:00:00','2025-05-18 15:00:00','cancelled','2025-05-14 00:00:57','2025-05-14 00:13:46','中文',15),(143,10,12,'cat','Dog Walking','2025-05-10 10:00:00','2025-05-10 11:00:00','completed','2025-05-13 12:19:16','2025-05-13 12:19:16','English',15),(144,10,12,'cat','Dog Walking','2025-05-03 10:00:00','2025-05-03 11:00:00','completed','2025-05-13 12:59:16','2025-05-13 12:59:16','English',15),(147,12,26,'dog','Dog Walking','2025-05-15 20:00:00','2025-05-15 21:00:00','accepted','2025-05-14 13:53:10','2025-05-14 13:54:22','中文',22),(148,25,15,'dog','Dog Walking','2025-05-19 09:00:00','2025-05-19 10:00:00','pending','2025-05-14 13:54:13','2025-05-14 13:54:13','English',25),(149,12,26,'dog','In-Home Feeding','2025-05-14 14:00:00','2025-05-14 15:00:00','cancelled','2025-05-14 13:55:40','2025-05-14 13:56:04','Te Reo Māori',22),(150,12,26,'dog','Dog Grooming & Care','2025-05-15 13:00:00','2025-05-15 14:00:00','cancelled','2025-05-14 14:17:23','2025-05-14 14:17:50','Te Reo Māori',22),(151,12,26,'dog','Dog Walking','2025-05-18 14:00:00','2025-05-18 15:00:00','accepted','2025-05-14 14:19:29','2025-05-14 14:20:19','English',22),(153,1,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 02:27:30','2025-05-14 02:27:30','English',5),(154,1,2,'dog','Dog Walking','2025-05-19 09:00:00','2025-05-19 10:00:00','accepted','2025-05-14 14:30:28','2025-05-14 14:32:06','English',32),(155,2,2,'dog','Dog Walking','2025-05-20 13:00:00','2025-05-20 14:00:00','pending','2025-05-14 14:50:13','2025-05-14 14:50:13','',31),(156,1,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',32),(157,2,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',31),(158,3,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',1),(159,4,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',3),(160,5,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',7),(161,8,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',12),(162,10,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',15),(163,11,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',17),(164,12,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',22),(165,13,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',23),(166,14,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',27),(167,15,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',20),(168,18,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',21),(169,25,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',25),(170,26,2,'dog','Dog Walking','2025-05-02 10:00:00','2025-05-02 11:00:00','completed','2025-05-14 03:18:03','2025-05-14 03:18:03','English',34),(171,1,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',32),(172,2,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',31),(173,3,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',1),(174,4,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',3),(175,5,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',7),(176,8,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',12),(177,10,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',15),(178,11,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',17),(179,12,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',22),(180,13,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',23),(181,14,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',27),(182,15,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',20),(183,18,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',21),(184,25,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',25),(185,26,2,'dog','Dog Walking','2025-05-20 09:00:00','2025-05-20 10:00:00','pending','2025-05-14 03:20:52','2025-05-14 03:21:52','English',34);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_complain`
--

DROP TABLE IF EXISTS `booking_complain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_complain`
--

LOCK TABLES `booking_complain` WRITE;
/*!40000 ALTER TABLE `booking_complain` DISABLE KEYS */;
INSERT INTO `booking_complain` VALUES (5,5,5,1,'very idiot','2025-05-04 22:05:05'),(6,143,10,12,'but quite popular not easy to book','2025-05-13 12:45:18'),(7,153,1,2,'not easy to book','2025-05-14 02:28:12');
/*!40000 ALTER TABLE `booking_complain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_review`
--

DROP TABLE IF EXISTS `booking_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_review`
--

LOCK TABLES `booking_review` WRITE;
/*!40000 ALTER TABLE `booking_review` DISABLE KEYS */;
INSERT INTO `booking_review` VALUES (11,143,10,12,5,'good','2025-05-13 12:44:57'),(12,144,10,12,4,'better','2025-05-13 12:59:47'),(13,153,1,2,5,'very good','2025-05-14 02:28:00');
/*!40000 ALTER TABLE `booking_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking_status_log`
--

DROP TABLE IF EXISTS `booking_status_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_status_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `booking_id` bigint NOT NULL COMMENT 'Related booking ID',
  `status` enum('pending','accepted','rejected','cancelled','completed') NOT NULL COMMENT 'New status',
  `changed_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp of status change',
  `note` text COMMENT 'Optional notes',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_status_log`
--

LOCK TABLES `booking_status_log` WRITE;
/*!40000 ALTER TABLE `booking_status_log` DISABLE KEYS */;
INSERT INTO `booking_status_log` VALUES (1,1,'pending','2025-05-02 06:12:13','Booking created'),(2,2,'pending','2025-05-02 10:56:17','Booking created'),(3,3,'pending','2025-05-02 11:01:02','Booking created'),(4,4,'pending','2025-05-02 11:19:14','Booking created'),(5,4,'cancelled','2025-05-02 23:46:20',''),(6,4,'cancelled','2025-05-02 23:46:31',''),(7,4,'cancelled','2025-05-02 23:46:54',''),(8,4,'cancelled','2025-05-02 23:47:06',''),(9,6,'pending','2025-05-05 23:13:18','Booking created'),(10,6,'cancelled','2025-05-05 23:14:50',''),(12,8,'pending','2025-05-12 09:46:37','Booking created'),(13,9,'pending','2025-05-12 09:48:05','Booking created'),(40,13,'pending','2025-05-12 21:27:05','Booking created'),(41,14,'pending','2025-05-12 22:01:23','Booking created'),(45,18,'pending','2025-05-12 22:31:54','Booking created'),(46,19,'pending','2025-05-12 22:33:46','Booking created'),(47,20,'pending','2025-05-12 22:38:21','Booking created'),(48,21,'pending','2025-05-12 22:40:10','Booking created'),(49,22,'pending','2025-05-12 22:49:43','Booking created'),(50,23,'pending','2025-05-12 22:50:43','Booking created'),(51,24,'pending','2025-05-12 22:51:11','Booking created'),(52,25,'pending','2025-05-12 22:53:25','Booking created'),(53,26,'pending','2025-05-12 23:03:26','Booking created'),(54,27,'pending','2025-05-12 23:06:17','Booking created'),(55,28,'pending','2025-05-12 23:11:58','Booking created'),(56,29,'pending','2025-05-12 23:12:30','Booking created'),(57,30,'pending','2025-05-12 23:20:13','Booking created'),(58,31,'pending','2025-05-12 23:21:08','Booking created'),(59,32,'pending','2025-05-12 23:22:17','Booking created'),(60,33,'pending','2025-05-12 23:29:57','Booking created'),(61,34,'pending','2025-05-12 23:39:17','Booking created'),(62,35,'pending','2025-05-12 23:39:39','Booking created'),(63,36,'pending','2025-05-12 23:44:47','Booking created'),(64,37,'pending','2025-05-13 11:54:31','Booking created'),(68,41,'pending','2025-05-13 01:14:30','Booking created'),(69,42,'pending','2025-05-13 01:15:55','Booking created'),(70,42,'cancelled','2025-05-13 01:18:16',''),(71,42,'cancelled','2025-05-13 01:18:22',''),(72,43,'pending','2025-05-13 01:19:46','Booking created'),(73,45,'pending','2025-05-13 01:20:29','Booking created'),(74,43,'cancelled','2025-05-13 01:21:32',''),(75,45,'cancelled','2025-05-13 01:21:36',''),(76,53,'pending','2025-05-13 01:21:41','Booking created'),(77,54,'pending','2025-05-13 01:21:50','Booking created'),(78,62,'pending','2025-05-13 01:24:53','Booking created'),(79,63,'pending','2025-05-13 03:20:18','Booking created'),(87,82,'pending','2025-05-13 05:23:46','Booking created'),(88,83,'pending','2025-05-13 05:38:06','Booking created'),(89,84,'pending','2025-05-13 05:39:02','Booking created'),(90,85,'pending','2025-05-13 05:49:14','Booking created'),(91,86,'pending','2025-05-13 05:52:25','Booking created'),(108,94,'pending','2025-05-13 07:45:54','Booking created'),(109,95,'pending','2025-05-13 07:58:34','Booking created'),(110,96,'pending','2025-05-13 07:59:51','Booking created'),(111,97,'pending','2025-05-13 08:00:00','Booking created'),(112,98,'pending','2025-05-13 08:07:18','Booking created'),(113,99,'pending','2025-05-13 08:27:31','Booking created'),(114,100,'pending','2025-05-13 08:34:24','Booking created'),(115,101,'pending','2025-05-13 08:37:01','Booking created'),(116,102,'pending','2025-05-13 08:42:57','Booking created'),(117,104,'pending','2025-05-13 08:46:21','Booking created'),(118,111,'pending','2025-05-13 20:53:13','Booking created'),(119,112,'pending','2025-05-13 20:56:09','Booking created'),(120,114,'pending','2025-05-13 08:59:22','Booking created'),(121,118,'pending','2025-05-13 21:32:07','Booking created'),(122,62,'cancelled','2025-05-13 21:32:59',''),(123,54,'cancelled','2025-05-13 21:33:02',''),(124,53,'cancelled','2025-05-13 21:33:05',''),(125,119,'pending','2025-05-13 21:33:54','Booking created'),(126,119,'cancelled','2025-05-13 21:34:14',''),(127,123,'pending','2025-05-13 21:34:37','Booking created'),(128,120,'accepted','2025-05-13 21:34:45','accepted by sitter'),(129,121,'rejected','2025-05-13 21:34:49','rejected by sitter'),(130,122,'accepted','2025-05-13 21:34:53','accepted by sitter'),(131,123,'rejected','2025-05-13 21:34:56','rejected by sitter'),(132,127,'pending','2025-05-13 22:03:54','Booking created'),(133,126,'cancelled','2025-05-13 22:04:00','cancelled by owner'),(134,126,'cancelled','2025-05-13 22:04:09','cancelled by owner'),(135,120,'cancelled','2025-05-13 22:04:48','cancelled by owner'),(136,128,'pending','2025-05-13 22:05:23','Booking created'),(137,120,'cancelled','2025-05-13 22:06:08','cancelled by owner'),(138,127,'cancelled','2025-05-13 22:08:41',''),(139,129,'pending','2025-05-13 22:09:20','Booking created'),(140,129,'cancelled','2025-05-13 22:09:52',''),(141,130,'pending','2025-05-13 22:25:06','Booking created'),(142,130,'cancelled','2025-05-13 22:25:24',''),(143,131,'pending','2025-05-13 22:28:37','Booking created'),(144,131,'cancelled','2025-05-13 22:46:35',''),(145,132,'pending','2025-05-13 22:49:57','Booking created'),(146,132,'rejected','2025-05-13 22:50:38',''),(147,133,'pending','2025-05-13 22:52:17','Booking created'),(148,133,'rejected','2025-05-13 22:52:49',''),(149,134,'pending','2025-05-13 22:56:36','Booking created'),(150,133,'cancelled','2025-05-13 23:00:16',''),(151,120,'cancelled','2025-05-13 23:20:57','cancelled by owner'),(152,121,'cancelled','2025-05-13 23:21:11','cancelled by owner'),(153,134,'accepted','2025-05-13 23:24:42',''),(154,121,'cancelled','2025-05-13 23:25:20','cancelled by owner'),(155,121,'cancelled','2025-05-13 23:25:47','cancelled by owner'),(156,122,'cancelled','2025-05-13 23:26:26','cancelled by owner'),(157,121,'cancelled','2025-05-13 23:26:37','cancelled by owner'),(158,122,'cancelled','2025-05-13 23:33:09','cancelled by owner'),(159,122,'cancelled','2025-05-13 23:34:16','cancelled by owner'),(160,136,'cancelled','2025-05-13 23:36:35','cancelled by owner'),(161,135,'cancelled','2025-05-13 23:41:39','cancelled by owner'),(162,135,'cancelled','2025-05-13 23:51:31','cancelled from curl'),(163,137,'cancelled','2025-05-13 23:55:16','cancelled by owner'),(164,140,'cancelled','2025-05-14 00:01:35','cancelled by owner'),(165,140,'cancelled','2025-05-14 00:02:38','cancelled by owner'),(166,140,'cancelled','2025-05-14 00:08:28','cancelled by owner'),(167,142,'cancelled','2025-05-14 00:13:46','cancelled by owner'),(168,86,'cancelled','2025-05-14 10:41:57','cancelled by owner'),(169,37,'accepted','2025-05-14 10:42:21','accepted by sitter'),(170,82,'rejected','2025-05-14 10:42:25','rejected by sitter'),(171,145,'accepted','2025-05-14 11:36:01','accepted by sitter'),(172,145,'accepted','2025-05-14 11:36:06','accepted by sitter'),(173,146,'rejected','2025-05-14 11:40:42','rejected by sitter'),(174,147,'accepted','2025-05-14 13:54:22','accepted by sitter'),(175,149,'cancelled','2025-05-14 13:56:04','cancelled by owner'),(176,150,'cancelled','2025-05-14 14:17:50','cancelled by owner'),(177,82,'cancelled','2025-05-14 14:19:22','cancelled by owner'),(178,86,'cancelled','2025-05-14 14:19:27','cancelled by owner'),(179,151,'accepted','2025-05-14 14:20:19','accepted by sitter'),(180,82,'cancelled','2025-05-14 14:22:08','cancelled by owner'),(181,146,'cancelled','2025-05-14 14:22:12','cancelled by owner'),(182,146,'cancelled','2025-05-14 14:22:15','cancelled by owner'),(183,86,'cancelled','2025-05-14 14:22:19','cancelled by owner'),(184,146,'cancelled','2025-05-14 14:22:21','cancelled by owner'),(185,154,'accepted','2025-05-14 14:32:06','accepted by sitter');
/*!40000 ALTER TABLE `booking_status_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_reviews`
--

DROP TABLE IF EXISTS `location_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `locations` VALUES (1,'Cornwall Park','Park',-36.88480000,174.77620000,'Great open spaces for dogs to exercise, leash-free areas available.','Green Lane West, Epsom, Auckland 1051','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Cornwall_Park.jpg',1,'2025-05-01 00:26:57','2025-05-12 21:02:09'),(2,'Albert Park','Park',-36.85090000,174.76450000,'Historic park in the heart of Auckland CBD with beautiful gardens.','Princes Street, Auckland CBD','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Albert_Park.jpg',2,'2025-05-01 00:26:57','2025-05-12 21:03:14'),(3,'Auckland Domain','Park',-36.86040000,174.77620000,'Auckland\'s oldest park with walking trails and gardens.','Park Road, Grafton','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Auckland_Domain.jpg',3,'2025-05-01 00:26:57','2025-05-12 21:08:52'),(4,'Devonport Beach','Beach',-36.83100000,174.79800000,'Popular spot for dog walks, check local council rules for times.','King Edward Parade, Devonport, Auckland 0624','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Devonport_Beach.jpg',3,'2025-05-01 00:26:57','2025-05-12 21:03:44'),(5,'Takapuna Beach','Beach',-36.78750000,174.76890000,'Beautiful beach with dog-friendly areas.','The Promenade, Takapuna','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Takapuna_Beach.avifhttps://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Takapuna_Beach.avif',4,'2025-05-01 00:26:57','2025-05-12 21:06:01'),(6,'North Shore Dog Park','Park',-36.80220000,174.75000000,'Fully fenced off-leash area with agility equipment.','Esmonde Road, Takapuna','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/North_Shore_Dog_Park.jpeg',1,'2025-05-01 00:26:57','2025-05-12 21:06:10'),(7,'Meola Reef Dog Park','Park',-36.86450000,174.71940000,'Large fully-fenced off-leash dog park with agility equipment.','171R Meola Road, Point Chevalier, Auckland 1022','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Meola_Reef_Dog_Park.jpg',NULL,'2025-05-01 00:26:57','2025-05-12 21:06:18'),(8,'Henderson Valley Park','Park',-36.89000000,174.63000000,'Scenic park with walking trails and off-leash areas.','Henderson Valley Road, Henderson','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Henderson_Valley_Park.jpghttps://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Henderson_Valley_Park.jpg',2,'2025-05-01 00:26:57','2025-05-12 21:05:18'),(9,'Titirangi Beach','Beach',-36.95000000,174.65000000,'Quiet beach with dog-friendly sections.','Titirangi Road, Titirangi','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Titirangi_Beach.jpeg',3,'2025-05-01 00:26:57','2025-05-12 21:05:56'),(10,'Eastern Beach','Beach',-36.90000000,174.90000000,'Popular beach with designated dog areas.','Eastern Beach Road, Howick','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Eastern_Beach.jpg',4,'2025-05-01 00:26:57','2025-05-12 21:05:13'),(11,'Botany Town Centre','Shopping',-36.91670000,174.90000000,'Dog-friendly shopping area with outdoor seating.','Corner of Ti Rakau Drive and Botany Road','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Botany_Town_Centre.jpg',1,'2025-05-01 00:26:57','2025-05-12 21:04:36'),(12,'Lloyd Elsmore Park','Park',-36.91670000,174.91670000,'Large park with sports fields and walking trails.','Pakuranga Road, Pakuranga','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Lloyd_Elsmore_Park.jpg',2,'2025-05-01 00:26:57','2025-05-12 21:05:23'),(13,'Totara Park','Park',-37.00000000,174.90000000,'Extensive park with walking trails and picnic areas.','Wairere Road, Manurewa','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Totara_Park.jpg',3,'2025-05-01 00:26:57','2025-05-12 21:05:50'),(14,'Manukau Harbour','Beach',-37.05000000,174.85000000,'Scenic coastal area with dog-friendly beaches.','Mangere Bridge','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Manukau_Harbour.jpg',4,'2025-05-01 00:26:57','2025-05-12 21:06:24'),(15,'Ambury Regional Park','Park',-36.95000000,174.80000000,'Working farm park with walking trails and animal viewing.','43 Ambury Road, Mangere Bridge','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/locations/Auckland_Domain.jpg',1,'2025-05-01 00:26:57','2025-05-12 21:08:13');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_info`
--

DROP TABLE IF EXISTS `notice_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `receiver_id` bigint NOT NULL,
  `title` varchar(128) NOT NULL,
  `message` varchar(1024) NOT NULL,
  `read_tag` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `receiver_id` (`receiver_id`)
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_info`
--

LOCK TABLES `notice_info` WRITE;
/*!40000 ALTER TABLE `notice_info` DISABLE KEYS */;
INSERT INTO `notice_info` VALUES (8,1,'New Review Received','You have received a new review for booking, which id is: 5.',1,'2025-05-04 22:05:03'),(9,1,'New Complain','You have a new complain for booking which number is: 5.',1,'2025-05-04 22:05:05'),(10,1,'new booking','You have received a new booking. Please check your bookings.',1,'2025-05-06 11:13:18'),(11,6,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-06 11:14:50'),(12,8,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',1,'2025-05-12 05:53:59'),(13,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: mengsaili666@gmail.com.',1,'2025-05-12 09:46:38'),(14,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zyan296@aucklanduni.ac.nz.',1,'2025-05-12 09:48:06'),(15,15,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-12 10:39:52'),(16,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zyan296@aucklanduni.ac.nz.',1,'2025-05-12 10:40:56'),(17,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:41:37'),(18,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:41:39'),(19,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:41:40'),(20,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:41:41'),(21,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:41:54'),(22,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:42:00'),(23,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:42:00'),(24,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:42:01'),(25,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:42:01'),(26,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:42:01'),(27,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:42:50'),(28,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:42:51'),(29,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:42:51'),(30,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:42:51'),(31,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:42:51'),(32,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:42:51'),(33,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:42:52'),(34,11,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:42:52'),(35,7,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:49:07'),(36,7,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:49:33'),(37,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: s@s.com.',1,'2025-05-12 10:50:23'),(38,10,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:51:23'),(39,12,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:54:25'),(40,12,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-12 10:54:38'),(41,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: bob@example.com.',1,'2025-05-12 21:27:14'),(42,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: bob@example.com.',1,'2025-05-12 22:01:28'),(43,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-12 22:21:15'),(44,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-12 22:21:15'),(45,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-12 22:21:23'),(46,10,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-12 22:31:54'),(47,10,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-12 22:33:46'),(48,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: bob@example.com.',0,'2025-05-12 22:38:27'),(49,10,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-12 22:50:00'),(50,10,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-12 22:51:01'),(51,10,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-12 22:51:11'),(52,10,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-12 22:53:25'),(53,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: bob@example.com.',0,'2025-05-12 23:03:43'),(54,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: bob@example.com.',0,'2025-05-12 23:06:17'),(55,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: mom@example.com.',0,'2025-05-12 23:12:30'),(56,25,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zyan296@aucklanduni.ac.nz.',0,'2025-05-12 23:15:47'),(57,15,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: 3170746920@qq.com.',0,'2025-05-12 23:20:16'),(58,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: mom@example.com.',0,'2025-05-12 23:21:08'),(59,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: mom@example.com.',0,'2025-05-12 23:22:17'),(60,25,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zyan296@aucklanduni.ac.nz.',0,'2025-05-12 23:30:03'),(61,15,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: 3170746920@qq.com.',0,'2025-05-12 23:39:17'),(62,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: mom@example.com.',0,'2025-05-12 23:39:39'),(63,14,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: bob@example.com.',0,'2025-05-12 23:45:12'),(64,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-12 23:54:32'),(65,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-13 00:44:55'),(66,15,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-13 00:55:11'),(67,15,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-13 00:58:59'),(68,15,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: 3170746920@qq.com.',0,'2025-05-13 01:14:33'),(69,15,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: test@test.com.',0,'2025-05-13 01:16:04'),(70,42,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 01:18:16'),(71,42,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 01:18:22'),(72,15,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: test@test.com.',0,'2025-05-13 01:20:00'),(73,15,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: test@test.com.',0,'2025-05-13 01:20:34'),(74,43,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 01:21:35'),(75,45,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 01:21:36'),(76,15,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: fay@email.com.',0,'2025-05-13 01:21:41'),(77,15,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: fay@email.com.',0,'2025-05-13 01:21:50'),(78,15,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: fay@email.com.',0,'2025-05-13 01:24:53'),(79,8,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: s@s.com.',0,'2025-05-13 03:20:28'),(80,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 04:20:30'),(81,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 04:21:35'),(82,5,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 04:22:42'),(83,5,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 04:24:32'),(84,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: fay@email.com.',0,'2025-05-13 04:30:48'),(85,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-13 05:10:22'),(86,10,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-13 05:12:03'),(87,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-13 05:23:45'),(88,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: bob@example.com.',0,'2025-05-13 05:38:06'),(89,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: bob@example.com.',0,'2025-05-13 05:39:01'),(90,2,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-13 05:49:14'),(91,2,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-13 05:52:25'),(92,2,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-13 06:11:08'),(93,5,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-13 06:13:29'),(94,10,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-13 07:10:47'),(95,74,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 07:11:36'),(96,75,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 07:11:40'),(97,76,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 07:11:43'),(98,77,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 07:11:45'),(99,10,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-13 07:12:04'),(100,39,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 07:16:46'),(101,40,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 07:16:49'),(102,59,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 07:16:52'),(103,60,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 07:16:54'),(104,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 07:18:54'),(105,91,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 07:19:40'),(106,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 07:20:13'),(107,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 07:22:15'),(108,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 07:45:55'),(109,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 07:58:34'),(110,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 07:59:51'),(111,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 08:00:01'),(112,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 08:07:19'),(113,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 08:27:31'),(114,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 08:34:25'),(115,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 08:37:02'),(116,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 08:42:58'),(117,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 08:46:22'),(118,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 08:53:14'),(119,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 08:56:10'),(120,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',1,'2025-05-13 08:58:50'),(121,2,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-13 08:59:23'),(122,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',1,'2025-05-13 08:59:36'),(123,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',1,'2025-05-13 09:23:06'),(124,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',1,'2025-05-13 09:29:28'),(125,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: fay@email.com.',1,'2025-05-13 09:32:08'),(126,62,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 09:32:59'),(127,54,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 09:33:03'),(128,53,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 09:33:06'),(129,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: fay@email.com.',1,'2025-05-13 09:33:54'),(130,119,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 09:34:15'),(131,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',1,'2025-05-13 09:34:25'),(132,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',1,'2025-05-13 09:34:31'),(133,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',1,'2025-05-13 09:34:33'),(134,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: fay@email.com.',1,'2025-05-13 09:34:37'),(135,120,'booking status change','Your booking status has been updated to accepted.',0,'2025-05-13 09:34:46'),(136,121,'booking status change','Your booking status has been updated to rejected.',0,'2025-05-13 09:34:50'),(137,122,'booking status change','Your booking status has been updated to accepted.',0,'2025-05-13 09:34:53'),(138,123,'booking status change','Your booking status has been updated to rejected.',0,'2025-05-13 09:34:56'),(139,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-13 09:53:49'),(140,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-13 09:54:33'),(141,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',1,'2025-05-13 10:03:09'),(142,5,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: fay@email.com.',0,'2025-05-13 10:03:55'),(143,126,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 10:04:01'),(144,126,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 10:04:10'),(145,120,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 10:04:50'),(146,5,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: fay@email.com.',0,'2025-05-13 10:05:24'),(147,120,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 10:06:09'),(148,127,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 10:08:42'),(149,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: fay@email.com.',0,'2025-05-13 10:09:21'),(150,129,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 10:09:53'),(151,26,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-13 10:25:06'),(152,130,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 10:25:25'),(153,26,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-13 10:28:38'),(154,131,'booking status change','Your booking status has been updated to Cancelled.',0,'2025-05-13 10:46:36'),(155,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: fay@email.com.',1,'2025-05-13 10:49:58'),(156,132,'booking status change','Your booking status has been updated to rejected.',0,'2025-05-13 10:50:39'),(157,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-13 10:52:18'),(158,133,'booking status change','Your booking status has been updated to rejected.',0,'2025-05-13 10:52:50'),(159,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',1,'2025-05-13 10:56:37'),(160,1,'booking status change','Your booking status has been updated to cancelled.',1,'2025-05-13 11:00:17'),(161,12,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 11:00:17'),(162,120,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 11:20:59'),(163,121,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 11:21:12'),(164,1,'booking status change','Your booking status has been updated to accepted.',1,'2025-05-13 11:24:43'),(165,12,'booking status change','Your booking status has been updated to accepted.',0,'2025-05-13 11:24:43'),(166,121,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 11:25:20'),(167,121,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 11:25:48'),(168,122,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 11:26:27'),(169,121,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 11:26:38'),(170,122,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 11:33:10'),(171,122,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 11:34:17'),(172,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 11:35:39'),(173,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 11:35:47'),(174,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 11:35:52'),(175,136,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 11:36:37'),(176,135,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 11:41:40'),(177,135,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 11:51:32'),(178,137,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 11:55:17'),(179,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 12:00:35'),(180,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 12:00:40'),(181,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 12:00:46'),(182,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 12:00:52'),(183,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: zengzhen.ucf@gmail.com.',0,'2025-05-13 12:00:57'),(184,140,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 12:01:37'),(185,140,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 12:02:40'),(186,140,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 12:08:29'),(187,142,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 12:13:47'),(188,12,'New Review Received','You have received a new review for booking, which id is: 143.',0,'2025-05-13 12:44:57'),(189,12,'New Complain','You have a new complain for booking which number is: 143.',0,'2025-05-13 12:45:19'),(190,12,'New Review Received','You have received a new review for booking, which id is: 144.',0,'2025-05-13 12:59:48'),(191,86,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-13 22:41:59'),(192,37,'booking status change','Your booking status has been updated to accepted.',0,'2025-05-13 22:42:22'),(193,82,'booking status change','Your booking status has been updated to rejected.',0,'2025-05-13 22:42:26'),(194,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-13 23:30:57'),(195,1,'Order Status Updated','Yasmine has updated your booking status to: accepted<br/>\n      <strong>Order Information:</strong><br/>\n      Pet Type: dog<br/>\n      Service Type: In-Home Feeding<br/>\n      Service Time: 5/18/2025, 2:00:00 PM<br/>\n      Service Language: 中文<br/>',0,'2025-05-13 23:36:03'),(196,12,'Order Status Updated','\n      AliceCat \'s booking status has been updated to: accepted\n      <strong>Order Information:</strong>\n      Pet Type: dog\n      Service Type: In-Home Feeding\n      Service Time: 5/18/2025, 2:00:00 PM\n      Service Language: 中文\n    ',0,'2025-05-13 23:36:06'),(197,12,'Order Status Updated','\n      AliceCat \'s booking status has been updated to: accepted\n      <strong>Order Information:</strong>\n      Pet Type: dog\n      Service Type: In-Home Feeding\n      Service Time: 5/18/2025, 2:00:00 PM\n      Service Language: 中文\n    ',1,'2025-05-13 23:36:08'),(198,1,'Order Status Updated','Yasmine has updated your booking status to: accepted<br/>\n      <strong>Order Information:</strong><br/>\n      Pet Type: dog<br/>\n      Service Type: In-Home Feeding<br/>\n      Service Time: 5/18/2025, 2:00:00 PM<br/>\n      Service Language: 中文<br/>',0,'2025-05-13 23:36:08'),(199,12,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-13 23:39:35'),(200,12,'Order Status Updated','\n      AliceCat \'s booking status has been updated to: rejected\n      <strong>Order Information:</strong> <br/>\n      Pet Type: dog <br/>\n      Service Type: In-Home Feeding <br/>\n      Service Time: 5/18/2025, 1:00:00 PM <br/>\n      Service Language: English <br/>\n    ',0,'2025-05-13 23:40:44'),(201,1,'Order Status Updated','Yasmine has updated your booking status to: rejected <br/>\n      <strong>Order Information:</strong> <br/>\n      Pet Type: dog <br/>\n      Service Type: In-Home Feeding <br/>\n      Service Time: 5/18/2025, 1:00:00 PM <br/>\n      Service Language: English<br/>',0,'2025-05-13 23:40:44'),(202,26,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-14 01:53:11'),(203,15,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: 3170746920@qq.com.',0,'2025-05-14 01:54:14'),(204,12,'Order Status Updated','fay has updated your booking status to: accepted <br/>\n      <strong>Order Information:</strong> <br/>\n      Pet Type: dog <br/>\n      Service Type: Dog Walking <br/>\n      Service Time: 5/15/2025, 8:00:00 PM <br/>\n      Service Language: 中文<br/>',0,'2025-05-14 01:54:24'),(205,26,'Order Status Updated','\n      Yasmine \'s booking status has been updated to: accepted <br/>\n      <strong>Order Information:</strong> <br/>\n      Pet Type: dog <br/>\n      Service Type: Dog Walking <br/>\n      Service Time: 5/15/2025, 8:00:00 PM <br/>\n      Service Language: 中文 <br/>\n    ',0,'2025-05-14 01:54:24'),(206,26,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-14 01:55:40'),(207,12,'Booking Reminder','Reminder: your booking will start at 2025-05-14 14:00:00.',0,'2025-05-14 01:56:01'),(208,26,'Booking Reminder','Reminder: your booking will start at 2025-05-14 14:00:00.',0,'2025-05-14 01:56:01'),(209,12,'Booking Reminder','Reminder: your booking will start at 2025-05-14 18:00:00.',0,'2025-05-14 01:56:01'),(210,12,'Booking Reminder','Reminder: your booking will start at 2025-05-14 14:00:00.',0,'2025-05-14 01:56:01'),(211,26,'Booking Reminder','Reminder: your booking will start at 2025-05-14 18:00:00.',0,'2025-05-14 01:56:01'),(212,26,'Booking Reminder','Reminder: your booking will start at 2025-05-14 14:00:00.',0,'2025-05-14 01:56:01'),(213,12,'Order Status Updated','fay has updated your booking status to: cancelled <br/>\n      <strong>Order Information:</strong> <br/>\n      Pet Type: dog <br/>\n      Service Type: In-Home Feeding <br/>\n      Service Time: 5/14/2025, 2:00:00 PM <br/>\n      Service Language: Te Reo Māori<br/>',1,'2025-05-14 01:56:05'),(214,26,'Order Status Updated','\n      Yasmine \'s booking status has been updated to: cancelled <br/>\n      <strong>Order Information:</strong> <br/>\n      Pet Type: dog <br/>\n      Service Type: In-Home Feeding <br/>\n      Service Time: 5/14/2025, 2:00:00 PM <br/>\n      Service Language: Te Reo Māori <br/>\n    ',0,'2025-05-14 01:56:06'),(215,26,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-14 02:17:24'),(216,12,'Order Status Updated','Your booking status has been updated to: cancelled <br/>\n      <strong>Order Information:</strong> <br/>\n      User: fay\n      Sitter: Yasmine\n      Pet Type: dog <br/>\n      Service Type: Dog Grooming & Care <br/>\n      Service Time: 5/15/2025, 1:00:00 PM <br/>\n      Service Language: Te Reo Māori <br/>',0,'2025-05-14 02:17:52'),(217,26,'Order Status Updated','\n      Your booking status has been updated to: cancelled <br/>\n      <strong>Order Information:</strong> <br/>\n      User: fay\n      Sitter: Yasmine\n      Pet Type: dog <br/>\n      Service Type: Dog Grooming & Care <br/>\n      Service Time: 5/15/2025, 1:00:00 PM <br/>\n      Service Language: Te Reo Māori <br/>\n    ',0,'2025-05-14 02:17:52'),(218,82,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-14 02:19:24'),(219,86,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-14 02:19:28'),(220,26,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: ymm-yasmine@outlook.com.',0,'2025-05-14 02:19:30'),(221,26,'Order Status Updated','\n      Your booking status has been updated to: accepted <br/>\n      <strong>Order Information:</strong> <br/>\n      User: fay <br>\n      Sitter: Yasmineeeee <br>\n      Pet Type: dog <br/>\n      Service Type: Dog Walking <br/>\n      Service Time: 5/18/2025, 2:00:00 PM <br/>\n      Service Language: English <br/>\n    ',0,'2025-05-14 02:20:20'),(222,12,'Order Status Updated','Your booking status has been updated to: accepted <br/>\n      <strong>Order Information:</strong> <br/>\n      User: fay <br>\n      Sitter: Yasmineeeee <br>\n      Pet Type: dog <br/>\n      Service Type: Dog Walking <br/>\n      Service Time: 5/18/2025, 2:00:00 PM <br/>\n      Service Language: English <br/>',0,'2025-05-14 02:20:20'),(223,82,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-14 02:22:10'),(224,146,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-14 02:22:13'),(225,146,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-14 02:22:16'),(226,86,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-14 02:22:19'),(227,146,'booking status change','Your booking status has been updated to cancelled.',0,'2025-05-14 02:22:22'),(228,1,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-14 02:24:18'),(229,2,'New Review Received','You have received a new review for booking, which id is: 153.',0,'2025-05-14 02:28:01'),(230,2,'New Complain','You have a new complain for booking which number is: 153.',1,'2025-05-14 02:28:12'),(231,2,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: alice@example.com.',0,'2025-05-14 02:30:26'),(232,1,'Order Status Updated','BobWoof has updated your booking status to: accepted <br/>\n      <strong>Order Information:</strong> <br/>\n      Pet Type: dog <br/>\n      Service Type: Dog Walking <br/>\n      Service Time: 2025/5/19 09:00:00 <br/>\n      Service Language: English<br/>',0,'2025-05-14 02:32:04'),(233,2,'Order Status Updated','\n      AliceCat \'s booking status has been updated to: accepted <br/>\n      <strong>Order Information:</strong> <br/>\n      Pet Type: dog <br/>\n      Service Type: Dog Walking <br/>\n      Service Time: 2025/5/19 09:00:00 <br/>\n      Service Language: English <br/>\n    ',0,'2025-05-14 02:32:05'),(234,2,'new booking','You have received a new booking. Please check your bookings. You can contact the owner at: bob@example.com.',0,'2025-05-14 02:50:11');
/*!40000 ALTER TABLE `notice_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet_info`
--

DROP TABLE IF EXISTS `pet_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet_info` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary key: pet ID',
  `owner_id` bigint NOT NULL COMMENT 'Foreign key: references user_info(id)',
  `type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Pet type (e.g., dog, cat)',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Pet name',
  `description` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Additional description',
  `photo_url` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Photo URL',
  `allergies` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Pet allergies',
  `medications` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Current medications',
  `special_instructions` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Special care instructions',
  `vet_contact_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Veterinarian name',
  `vet_contact_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Veterinarian phone number',
  `emergency_contact_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Emergency contact name',
  `emergency_contact_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Emergency contact phone number',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation time',
  `gmt_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update time',
  PRIMARY KEY (`id`),
  KEY `idx_owner_id` (`owner_id`) COMMENT 'Index on owner_id',
  CONSTRAINT `pet_info_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Pet profile information table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet_info`
--

LOCK TABLES `pet_info` WRITE;
/*!40000 ALTER TABLE `pet_info` DISABLE KEYS */;
INSERT INTO `pet_info` VALUES (1,3,'dog','Max','Friendly golden retriever, loves swimming.',NULL,'Peanut butter','Flea treatment monthly','Needs daily joint supplements','Dr. James Wilson','021-5556666','Mary Smith','022-3334444','2025-05-01 12:26:57','2025-05-12 07:35:44'),(2,3,'cat','Luna','Black cat, indoor only.',NULL,'Chicken','Thyroid medication twice daily','Sensitive stomach - special diet only','Dr. Emma Chen','021-7778888','Peter Wong','022-9990000','2025-05-01 12:26:57','2025-05-12 07:35:42'),(3,4,'dog','Charlie','Energetic beagle puppy.',NULL,'None','Deworming medication','Needs three walks daily','Dr. Michael Brown','021-2223333','Sarah Johnson','022-4445555','2025-05-01 12:26:57','2025-05-12 07:35:39'),(7,5,'Dog','longlong','a big while but silly dog',NULL,'no','yes','nothing',NULL,'54321',NULL,'12345','2025-05-02 14:43:53','2025-05-02 14:43:53'),(12,8,'Dog','qwerq',NULL,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/pets/1746936729317.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-11 04:12:09','2025-05-11 04:12:09'),(14,8,'Dog','555',NULL,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/pets/1747037384290.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-12 01:50:13','2025-05-12 08:09:46'),(15,10,'Cat','Emily','My lovely little cat','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/pets/1747028498561.jpg','no','yes','no',NULL,'1232432423',NULL,'23423423','2025-05-12 05:41:38','2025-05-12 05:41:38'),(16,8,'Dog','qwer',NULL,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/pets/1747029455991.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-12 05:57:36','2025-05-12 05:57:36'),(17,11,'Dog','ttt',NULL,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/pets/1747029788859.gif',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-12 06:00:13','2025-05-12 06:03:09'),(18,8,'Cat','tterwer',NULL,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/pets/1747037429111.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-12 08:10:30','2025-05-12 08:10:30'),(19,8,'Cat','ccc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-12 08:10:39','2025-05-12 08:10:39'),(20,15,'Cat','Luna','a cute cat','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/pets/1747042474340.jfif',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-12 09:34:34','2025-05-12 10:45:12'),(21,18,'Dog','lu\'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-12 09:41:52','2025-05-12 09:41:52'),(22,12,'Dog','cookie',NULL,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/pets/1747043671279.jpeg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-12 09:54:31','2025-05-12 09:54:31'),(23,13,'Cat','Black','A cutie.','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/pets/1747046139072.jpeg','nothing','nothing','Just be good.',NULL,'911',NULL,'911','2025-05-12 10:35:39','2025-05-12 10:35:39'),(24,15,'Cat','Bubbles','A cute cat','https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/pets/1747046749128.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-12 10:45:49','2025-05-12 10:45:49'),(25,25,'Dog','Nova',NULL,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/pets/1747047551421.avif',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-12 10:59:11','2025-05-12 10:59:11'),(26,25,'Dog','Sherlock',NULL,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/pets/1747047589035.avif',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-12 10:59:49','2025-05-12 10:59:49'),(27,14,'Dog','Lily',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-12 23:11:44','2025-05-12 23:11:44'),(31,2,'Dog','lili',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-13 05:37:44','2025-05-13 05:37:44'),(32,1,'Dog','lily',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-13 05:48:43','2025-05-13 05:48:43'),(33,1,'Dog','l',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-13 05:48:52','2025-05-13 05:48:52'),(34,26,'Cat','cat',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-05-13 09:31:03','2025-05-13 09:31:03');
/*!40000 ALTER TABLE `pet_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_languages`
--

DROP TABLE IF EXISTS `service_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_pet_types` (
  `service_id` int NOT NULL,
  `pet_type` varchar(50) NOT NULL,
  `price_adjustment` decimal(10,2) DEFAULT '0.00',
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `description` text,
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sitter_services` (
  `sitter_id` bigint NOT NULL,
  `service_id` int NOT NULL,
  `custom_price` decimal(10,2) DEFAULT NULL,
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
INSERT INTO `sitter_services` VALUES (1,1,NULL),(1,3,NULL),(2,1,NULL),(2,2,NULL),(2,3,NULL),(5,1,NULL),(5,2,NULL),(8,1,NULL),(8,2,NULL),(10,1,NULL),(10,2,NULL),(10,3,NULL),(12,1,NULL),(12,2,NULL),(13,1,NULL),(14,1,NULL),(14,2,NULL),(14,3,NULL),(15,1,NULL),(15,2,NULL),(18,1,NULL),(18,2,NULL),(18,3,NULL),(25,2,NULL),(25,3,NULL),(26,1,NULL),(26,2,NULL),(26,3,NULL);
/*!40000 ALTER TABLE `sitter_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_certificates`
--

DROP TABLE IF EXISTS `user_certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_certificates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `certificate_name` varchar(255) NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_certificates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_certificates`
--

LOCK TABLES `user_certificates` WRITE;
/*!40000 ALTER TABLE `user_certificates` DISABLE KEYS */;
INSERT INTO `user_certificates` VALUES (6,8,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/certificates/1747024293580.png','2025-05-12 04:31:33'),(8,11,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/certificates/1747029819320.png','2025-05-12 06:03:39'),(17,18,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/certificates/1747043578348.png','2025-05-12 09:52:58'),(18,18,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/certificates/1747043581727.png','2025-05-12 09:53:01'),(19,13,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/certificates/1747046231043.jpeg','2025-05-12 10:37:11'),(20,15,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/certificates/1747046889780.jpg','2025-05-12 10:48:10'),(21,25,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/certificates/1747047632425.jpg','2025-05-12 11:00:32'),(22,26,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/certificates/1747099167337.jpg','2025-05-13 01:19:27'),(26,1,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/certificates/1747113942278.png','2025-05-13 05:25:42'),(27,10,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/certificates/1747136174939.jpg','2025-05-13 11:36:16'),(28,12,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/certificates/1747187367706.png','2025-05-14 01:49:30');
/*!40000 ALTER TABLE `user_certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'User ID, primary key',
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'User email, used for login',
  `password` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Encrypted password',
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'User bio/introduction',
  `region` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Region',
  `user_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'User nickname',
  `status` int DEFAULT '0' COMMENT 'User status: 0 = active, 1 = disabled',
  `avatar` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'User avatar URL',
  `phone_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Phone number',
  `emergency_contact` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Emergency contact name or number',
  `gmt_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
  `gmt_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_email` (`email`) COMMENT 'Unique index on email',
  KEY `idx_user_name` (`user_name`) COMMENT 'Index on nickname'
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='User info table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'alice@example.com','$2b$10$hcAjiZ1hQNX.xsFhEyDbKudP3JaML2xbY1QLmnyzhWHZMYEnxGHQy','Loves cats and long walks.','CBD','AliceCat',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1747038220094.png','0211234567','0219876543','2025-05-01 12:26:57','2025-05-14 03:22:35'),(2,'bob@example.com','$2b$10$uutooOTH426JtJwprymbr.oDSSfNMjIEBzfZ4Mka/D9TUSaD3FM6i','Experienced dog sitter.','West Auckland','BobWoof',0,'','0227654321','0214567890','2025-05-01 12:26:57','2025-05-13 04:31:42'),(3,'carol@example.com','$2b$10$PK4c89SheNggUEy2duTnGOkWvnYqZ39iGpA8Lw2oViLFv.nnKB8QW','Pet lover with a big heart.','Central Auckland','CarolPaws',0,NULL,'0201112222','0273334444','2025-05-01 12:26:57','2025-05-12 02:13:03'),(4,'dave@example.com','$2b$10$pM1CyLLDTYGkH4IQGIv59Ognw26DRll4GrZRFILIulrp/Fgwj.cj2','Professional pet trainer.','East Auckland','DaveTrain',0,NULL,'0275556666','0208889999','2025-05-01 12:26:57','2025-05-12 02:13:02'),(5,'lucy@example.com','$2b$10$lCR123VIp7qIrFaHufvT3eBcMkzSp1y8LhsI7Bg45.w/wfxMdhSZe','love dog','Central Auckland','lucydog',0,'','Unknown',NULL,'2025-05-02 14:41:45','2025-05-14 03:26:46'),(6,'xiao@example.com','$2b$10$6AloZ0c13nNqgBGH2u/oq.TBJFQuzwm1adQ8tHAmO.5PuLFmS2Jky','Pet lover and dog walker.','South Auckland','Leo',0,'','Unknown',NULL,'2025-05-06 16:01:17','2025-05-14 03:37:39'),(7,'deploy@test.com','$2b$10$aumAVINbEIyEb3F6QmTglu3R3ZedDPvbsU0XnvBJHzUFi2v5hQcyS','Enjoys caring for all kinds of pets.','East Auckland','deploye',0,NULL,'Unknown',NULL,'2025-05-09 23:39:58','2025-05-14 03:37:20'),(8,'s@s.com','$2b$10$WNf.CAeZ/nog7LsO3lraF.0TxCJVRDRkhId92GaKdrNR.Ack7oy0y','Gentle with animals, especially dogs.','East Auckland','Sam',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1747044380355.png','Unknown',NULL,'2025-05-11 03:09:32','2025-05-14 03:37:20'),(9,'test@t.com','$2b$10$/Bs98zJ2K1b31ojz/PtKF.E2bLqHJpIbHgUeyvCpmZj30gGw8hYk2','Reliable and friendly pet sitter.','Central Auckland','tt',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1746963505555.png','Unknown',NULL,'2025-05-11 11:38:26','2025-05-14 03:37:21'),(10,'zengzhen.ucf@gmail.com','$2b$10$cHxfJ5wQ5smQeYYd5AAgfue4PvA3d5DrM52hDjzba6MN4ydkuBHXS','love cat,bunny and dog','North Shore','Jenny',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1747028370458.jpg','Unknown',NULL,'2025-05-12 05:39:30','2025-05-14 03:26:46'),(11,'uu@u.com','$2b$10$egZRLXn3w437RlAFpskJu.hZzsiLZqDR6Id79WtIRPo1xAIuxpDvy','Cat whisperer and animal enthusiast.','Central Auckland','Max',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1747029577395.png','Unknown',NULL,'2025-05-12 05:59:38','2025-05-14 03:37:21'),(12,'ymm-yasmine@outlook.com','$2b$10$hRHp6WoHGMdL6pdo3LeAi.6DzO9ShQfns5JeFNX/J76Rzs4/iPQga','Hi, this is Yasmine! I love all animals that are not toxic.','North Shore','Yasmine',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1747193001997.PNG','Unknown',NULL,'2025-05-12 08:36:25','2025-05-14 03:32:02'),(13,'test@test.com','$2b$10$TyWmIpVDSfFHvzUZQat5PuPnBI2LY1zhEXWGRqyHLe1UHRoitrYyO','Loves walking and bonding with pets.','CBD','Elaine',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1747040767809.jpg','Unknown',NULL,'2025-05-12 09:06:08','2025-05-14 03:37:21'),(14,'mom@example.com','$2b$10$JiZ9zwkgEJdZcFiFEDdjnOilRREsIiI/DXcFWO48j84uYDx0iiyr6','hhhh','CBD','Jess',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1747047120903.png','Unknown',NULL,'2025-05-12 09:19:56','2025-05-14 03:26:46'),(15,'zyan296@aucklanduni.ac.nz','$2b$10$1i8vDJPAmOq9QS9iDRagAumK0FifykndbNUViFK7eXhAPV1tuQSBq','Love cats!','Central Auckland','Luna',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1747047352506.png','Unknown',NULL,'2025-05-12 09:24:43','2025-05-14 03:26:46'),(16,'moshushaobing@gmail.com','$2b$10$lohpsfnVdReQiDo0lN94j.9fOR6QYzzP2VZTVoay/d/u1zhAZ5lWy','','CBD','Fay',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1747042203631.jpeg','Unknown',NULL,'2025-05-12 09:30:04','2025-05-14 03:26:46'),(17,'abc@t.com','$2b$10$TBw6LUqeZMYmewfmZNCMEO4KALrr.Gh0hmNOa57x7//5e6vGspAXm','Calm, patient, and experienced sitter.','Central Auckland','Ben',0,NULL,'Unknown',NULL,'2025-05-12 09:34:21','2025-05-14 03:37:21'),(18,'mengsaili666@gmail.com','$2b$10$T5DDnqMCRqiO0c5UIUNPh.J1HVzGu6xtGuW6k6bS/qa23wJHmJ9RW','','North Shore','john',0,NULL,'Unknown',NULL,'2025-05-12 09:34:35','2025-05-14 03:26:46'),(19,'ate@ttt.com','$2b$10$JIORAwbRUNYn994dANaPG.2VdPidLePCccW2mGkgCsCxo63.QQ.6S','Pet safety and happiness come first.','CBD','Owen',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1747042981465.png','Unknown',NULL,'2025-05-12 09:43:02','2025-05-14 03:37:22'),(20,'tt@tttt.com','$2b$10$PnrVJ86Yd0AJXXE1ALkwSuihvfQuVK8tElZbtOhJgIxTZT2i917ya','Weekend pet helper with great energy.','CBD','Liam',0,NULL,'Unknown',NULL,'2025-05-12 09:43:34','2025-05-14 03:37:22'),(21,'mom1@example.com','$2b$10$JZZKeV8wjYcM6VSN8nZVdez/hKs5uzXuY1MBs8AmIdp7MvPm9P/Zu','hhhh','CBD','Kyle',0,NULL,'Unknown',NULL,'2025-05-12 09:44:09','2025-05-14 03:33:49'),(22,'abc333@t.com','$2b$10$rdx44h5lnPR1wFpG8sJFMOZvvOZVOUm8fMQ3Hh.lB01ivvRavaHMO','Enjoys playing fetch and training dogs.','CBD','Jake',0,NULL,'Unknown',NULL,'2025-05-12 10:00:08','2025-05-14 03:37:22'),(23,'zzz@z.com','$2b$10$p1P8X5q3S2fOjTGD7Gt31e3GUDeO0BrU9KUehvrSynVBnxO.1Ulzi','Passionate about caring for rescue pets.','CBD','Zack',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1747045877575.png','Unknown',NULL,'2025-05-12 10:27:38','2025-05-14 03:37:23'),(24,'myan358@aucklanduni.ac.nz','$2b$10$I3BLBNbpfwDgLUBoyKpKi.CdBLQfnj62Jx./vVCj5DNTY1SMkkIeu','','East Auckland','yasmineeee',0,NULL,'Unknown',NULL,'2025-05-12 10:36:38','2025-05-14 03:26:46'),(25,'3170746920@qq.com','$2b$10$8HeibTEIipvHUDDnGS7GduFr3FQiOUFTTdWPas4YHu/dubOm9QEEu','Hi, this is Vishal!','Central Auckland','Vishal',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1747047415220.png','Unknown',NULL,'2025-05-12 10:56:55','2025-05-14 03:26:46'),(26,'fay@email.com','$2b$10$lw7kZkJyI59WWuuF65QApeGs.BpiAybvMOHi3AlSsgH/sCllhZSwi','Responsible sitter with flexible schedule.','North Shore','Mason',0,'https://jg7inj6tlcd6hlrd.public.blob.vercel-storage.com/public/images/uploads/avatars/1747098964382.jpg','Unknown',NULL,'2025-05-13 01:16:05','2025-05-14 03:37:23'),(27,'oliver@example.com','$2b$10$IQ1ZFK9zWno0Rr3WuiJYdurkGgbbJqGCB/T2UGyiA.DtBCNYg3UzS','','CBD','Nina',0,NULL,'Unknown',NULL,'2025-05-13 04:09:14','2025-05-14 03:33:55'),(28,'Oliver11@gmail.com','$2b$10$401Mgv97FmXxD5WpbM69XOjFFlFjuU/6/89g4a5HcOshAhM9k7ucS','hhhh','CBD','Chloe',0,NULL,'Unknown',NULL,'2025-05-13 04:17:49','2025-05-14 03:34:04'),(29,'ava@123.com','$2b$10$Y54EkLVl1n.u3t1WIv5wUeHyOZARmGK88V3EmmtudBUCIWgCrBkuW','','CBD','Emma',0,NULL,'Unknown',NULL,'2025-05-13 05:22:56','2025-05-14 03:34:11'),(30,'oliver2@example.com','$2b$10$Sk8YF0db4BNgY4UUYVLUw.g8101AqNDetET9M1CyAUAmvHj71SH46','Friendly and attentive to pet needs.','CBD','Noah',0,NULL,'Unknown',NULL,'2025-05-13 05:32:45','2025-05-14 03:37:23');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_languages`
--

DROP TABLE IF EXISTS `user_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
INSERT INTO `user_languages` VALUES (1,'English'),(1,'Hindi'),(1,'Te Reo Māori'),(1,'中文'),(2,'English'),(2,'Hindi'),(2,'Japanese'),(2,'Korean'),(2,'Te Reo Māori'),(5,'English'),(5,'Te Reo Māori'),(5,'中文'),(8,'English'),(8,'Spanish'),(10,'English'),(10,'中文'),(12,'English'),(12,'中文'),(13,'English'),(13,'中文'),(15,'English'),(15,'中文'),(18,'Te Reo Māori'),(18,'中文'),(25,'English'),(26,'English'),(26,'Te Reo Māori'),(26,'中文');
/*!40000 ALTER TABLE `user_languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bb0ydchaqyskd0bpdrdb'
--
/*!50112 SET @disable_bulk_load = IF (@is_rocksdb_supported, 'SET SESSION rocksdb_bulk_load = @old_rocksdb_bulk_load', 'SET @dummy_rocksdb_bulk_load = 0') */;
/*!50112 PREPARE s FROM @disable_bulk_load */;
/*!50112 EXECUTE s */;
/*!50112 DEALLOCATE PREPARE s */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-14  3:46:15
