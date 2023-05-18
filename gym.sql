-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: high-street-gym
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `activity_id` int NOT NULL AUTO_INCREMENT,
  `activity_name` varchar(45) NOT NULL,
  `activity_description` varchar(20000) NOT NULL,
  `activity_duration` varchar(45) NOT NULL,
  `activity_exist` tinyint NOT NULL,
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (6,'Skipping','Skipping rope is a classic and effective exercise that can help improve your cardiovascular health, endurance, and coordination. This high-intensity, low-impact workout engages the entire body, working the arms, legs, and core muscles simultaneously. Whether you\'re a beginner or an advanced fitness enthusiast, our skipping rope class offers a challenging and fun way to get fit and burn calories.','30 mins',1),(7,'HIIT','HIIT (High-Intensity Interval Training) Circuit Training is a fast-paced workout that targets your entire body. This workout combines strength training exercises with high-intensity cardio to get your heart rate up and help you burn calories. In this 45-minute session, you\'ll work through a series of stations, completing each exercise for a set amount of time before moving on to the next station.','45 mins',1),(8,'Yoga','Unwind, relax, and reconnect with your body and mind in our yoga class. Our experienced instructors will guide you through a series of poses that promote flexibility, strength, and balance while calming your mind and reducing stress. Whether you\'re a beginner or an experienced yogi, our class caters to all levels and abilities. Join us for a rejuvenating experience that will leave you feeling refreshed and centered.','45 mins',1),(26,'Spin','Spin Class is a high-energy cardio workout that takes place on stationary bikes. Led by a certified instructor, this 60-minute class is designed to challenge your endurance, burn calories, and improve your cardiovascular fitness. The class is set to music, and the instructor will guide you through a series of intervals, sprints, and climbs, all while adjusting the resistance on your bike to simulate different terrains.','60 mins',1),(27,'Boxing','Boxing Fitness is a full-body workout that combines boxing techniques with cardio and strength training exercises. In this 45-minute class, you\'ll work with a partner and focus on punching and kicking pads, as well as completing a series of bodyweight exercises. This high-energy workout is designed to improve your cardiovascular fitness, agility, and coordination while building strength and endurance.','45 mins',1),(28,'Zumba','Zumba is a popular dance fitness program that was created in the 1990s. The workout is inspired by Latin and international dance styles, such as salsa, merengue, flamenco, and samba, and combines them with aerobic exercise. In a Zumba class, you\'ll move to the beat of the music, following the instructor\'s choreography and working up a sweat.','50 mins',1),(29,'Yoga','Yoga class for all levels','60 mins',1),(30,'Pilates','Pilates class for beginners','45 mins',1);
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogposts`
--

DROP TABLE IF EXISTS `blogposts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogposts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_datetime` datetime NOT NULL,
  `post_user_id` int NOT NULL,
  `post_title` varchar(1000) NOT NULL,
  `post_content` varchar(20000) NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `fk_blogposts_users1_idx` (`post_user_id`),
  CONSTRAINT `fk_blogposts_users1` FOREIGN KEY (`post_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogposts`
--

LOCK TABLES `blogposts` WRITE;
/*!40000 ALTER TABLE `blogposts` DISABLE KEYS */;
INSERT INTO `blogposts` VALUES (15,'2023-04-28 09:44:54',6,'5 Reasons Why Strength Training Should Be Part of Your Fitness Routin','Strength training offers numerous benefits for your body and mind. It can help you build muscle, increase your metabolism, improve your bone density, reduce your risk of injury, and boost your confidence. In this post, we explore the top 5 reasons why strength training should be an integral part of your fitness routine.'),(16,'2023-04-28 09:45:41',6,'The Importance of Warm-Up and Cool-Down Exercises in Your Workout','Warming up and cooling down are essential components of any workout routine. They can help you prevent injuries, prepare your body for exercise, and reduce your risk of post-workout soreness. In this post, we explain the importance of incorporating warm-up and cool-down exercises into your fitness routine.'),(17,'2023-04-28 09:45:57',6,'How to Stay Motivated to Workout: Tips and Tricks','Staying motivated to workout can be challenging, especially when you\'re facing a busy schedule or feeling tired. In this post, we share some tips and tricks to help you stay motivated and committed to your fitness goals. From setting achievable goals to finding a workout buddy, there are many ways to keep yourself on track and focused on your fitness journey.'),(18,'2023-04-28 09:46:11',6,'The Benefits of Group Fitness Classes: Why You Should Give Them a Try','Group fitness classes are a great way to stay motivated, have fun, and meet new people. They offer a range of benefits, from expert guidance and support to a sense of community and accountability. In this post, we explore the many benefits of group fitness classes and why you should give them a try, regardless of your fitness level or goals.'),(28,'2023-05-08 02:21:25',11,'Why High Street Gyms are the Best Choice for Your Fitness Journey','High street gyms have become increasingly popular over the years, and for good reason. These gyms are accessible, affordable, and offer a wide range of equipment and classes that cater to different fitness goals and levels. In this post, we\'ll explore why high street gyms are the best choice for your fitness journey. High street gyms are conveniently located in city centers, making them accessible to a larger population. They offer flexible hours, making it easier for you to fit your workout into your busy schedule. Whether you want to work out before or after work, during your lunch break, or on the weekends, high street gyms are open to accommodate your needs.'),(29,'2023-05-08 02:32:26',23,'My Journey to Fitness: How Joining a High Street Gym Changed My Life','One of the things I love about my high street gym is the range of equipment and classes they offer. I can choose from weightlifting, cardio machines, and group fitness classes like spin and yoga. This variety keeps my workouts interesting and challenging.\nBut what really makes my high street gym stand out is the sense of community. I\'ve made friends with other members, and we motivate each other to keep going. The trainers are also amazing. They provide personalized advice and support, and they\'re always there to push me when I need it.');
/*!40000 ALTER TABLE `blogposts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `booking_user_id` int NOT NULL,
  `booking_class_id` int NOT NULL,
  `booking_created_datetime` datetime NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `fk_bookings_users_idx` (`booking_user_id`),
  KEY `fk_bookings_classes1_idx` (`booking_class_id`),
  CONSTRAINT `fk_bookings_classes1` FOREIGN KEY (`booking_class_id`) REFERENCES `classes` (`class_id`),
  CONSTRAINT `fk_bookings_users` FOREIGN KEY (`booking_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (71,23,33,'2023-05-08 02:18:20'),(72,23,34,'2023-05-08 02:18:26'),(73,21,28,'2023-05-08 02:24:53'),(74,21,32,'2023-05-08 02:24:58'),(75,22,26,'2023-05-08 02:25:51'),(76,22,33,'2023-05-08 02:25:56'),(77,23,27,'2023-05-10 00:17:27');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_datetime` datetime NOT NULL,
  `class_room_id` int NOT NULL,
  `class_activity_id` int NOT NULL,
  `class_trainer_user_id` int NOT NULL,
  `class_exist` tinyint NOT NULL,
  PRIMARY KEY (`class_id`),
  KEY `fk_classes_activities1_idx` (`class_activity_id`),
  KEY `fk_classes_users1_idx` (`class_trainer_user_id`),
  KEY `fk_classes_room_id1_idx` (`class_room_id`),
  CONSTRAINT `fk_classes_activities1` FOREIGN KEY (`class_activity_id`) REFERENCES `activities` (`activity_id`),
  CONSTRAINT `fk_classes_rooms1` FOREIGN KEY (`class_room_id`) REFERENCES `rooms` (`room_id`),
  CONSTRAINT `fk_classes_users1` FOREIGN KEY (`class_trainer_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (26,'2023-05-12 10:00:00',29,26,20,1),(27,'2023-05-11 14:00:00',27,7,19,1),(28,'2023-05-12 10:00:00',28,8,20,1),(29,'2023-05-12 16:00:00',29,27,11,1),(30,'2023-05-13 09:00:00',30,26,19,1),(31,'2023-05-13 14:00:00',28,28,20,1),(32,'2023-05-14 09:00:00',29,6,11,1),(33,'2023-05-14 19:00:00',30,26,19,1),(34,'2023-05-15 21:00:00',30,28,20,1),(37,'2023-05-12 10:00:00',1,6,11,1),(38,'2023-05-10 13:00:00',1,7,11,0);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_location` varchar(45) NOT NULL,
  `room_number` int NOT NULL,
  `room_exist` tinyint NOT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'Building C',201,1),(27,'Building A',321,1),(28,'Building B',210,1),(29,'Building A',301,1),(30,'Building D ',110,1),(31,'Building A',901,0),(32,'Building A',302,0);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_firstname` varchar(45) NOT NULL,
  `user_lastname` varchar(45) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_role` varchar(45) NOT NULL,
  `user_phone` varchar(45) NOT NULL,
  `user_address` varchar(255) NOT NULL,
  `user_exist` tinyint NOT NULL,
  `user_authenticationKey` varchar(255) DEFAULT NULL,
  `trainer_description` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'Admin','Test','admin@test.com','$2a$10$y2/8nraZeDMF4NBntZr1HeylmVE/uBFh5Lxq8SfE.TRztPsWnhu2.','admin','1234657890','2 green street',1,'9df4212d-cfe1-4e04-a03d-b2ad0ce59cca',NULL),(11,'Trainer','Test','trainer@test.com','$2a$10$jE.OYx4kqScwZljo1z7Ym.EpGXz8t3nXApLsyzwKw4gQ0FGg8BCKy','trainer','0123456078','2 test st',1,NULL,NULL),(19,'Jin','Jin','jinjin@test.com','$2a$10$xaJrvhXSHS3Vhn6R0QHVt.MNYl8m14ioH/vcQcU9dxirWw23zdel.','trainer','0123444569','3 brisbane St ',1,NULL,NULL),(20,'Fiona','Smith','fionasmith@test.com','$2a$10$UtOT48aIItjWBZ86pBbBMu6cxpOqMN6k3mq6eegCIKtZcU2cNyXEu','trainer','0673291823','2 Mary St ',1,NULL,NULL),(21,'Seb','Gates','sebgates@test.com','$2a$10$.LAGNphiJV2No1lNuxubeudvvl5IN7LbPr6zWnJBa0v8AGTKddha.','member','0478266328','4 Queen St ',1,NULL,NULL),(22,'Abe','Mores','abemores@test.com','$2a$10$yKrLdJEkyUKaL642c.RTeeiD8HRB3kKWAU/9ctvj9KLwv3azNhM/6','member','0932465284','12 Whitewood St ',1,NULL,NULL),(23,'Member','Test','member@test.com','$2a$10$vvw16jIKqSTcKoT38HETR.cYII1TVt5.bxVdZiSqmMFVc/DYxlfVC','member','0234384439','4 Test St',1,'e7e63f8d-5c5e-4987-8a51-b5f019cd447b',NULL),(24,'jijn','test','test@abc.com','$2a$10$8J4OS0wpM9r8aScD1vUUZO/sifefF/6LBcnyF.n.HNxnpPdaGe3x.','member','01231231232','3 test st',0,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-18 15:24:33
