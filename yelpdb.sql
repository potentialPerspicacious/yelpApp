CREATE DATABASE  IF NOT EXISTS `yelpDB` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `yelpDB`;
-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: yelpDB
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `idcustomer` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `zipcode` varchar(100) DEFAULT NULL,
  `month` varchar(100) DEFAULT NULL,
  `day` varchar(100) DEFAULT NULL,
  `year` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idcustomer`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customerProfile`
--

DROP TABLE IF EXISTS `customerProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerProfile` (
  `pro_id` int NOT NULL AUTO_INCREMENT,
  `cus_id` int DEFAULT NULL,
  `headline` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `yelptime` varchar(100) DEFAULT NULL,
  `about` varchar(100) DEFAULT NULL,
  `hobbies` varchar(100) DEFAULT NULL,
  `social` varchar(100) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `image` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`pro_id`),
  KEY `cus_id_idx` (`cus_id`),
  CONSTRAINT `cus_id` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`idcustomer`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `idevents` int NOT NULL AUTO_INCREMENT,
  `resID` int DEFAULT NULL,
  `eventname` varchar(100) DEFAULT NULL,
  `description` varchar(4000) DEFAULT NULL,
  `month` int DEFAULT NULL,
  `date` int DEFAULT NULL,
  `year` int DEFAULT NULL,
  `time` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `hashtags` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idevents`),
  KEY `res_id_idx` (`resID`),
  CONSTRAINT `res_id` FOREIGN KEY (`resID`) REFERENCES `restaurant` (`idrestaurant`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `eventsregistered`
--

DROP TABLE IF EXISTS `eventsregistered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventsregistered` (
  `ideventsregistered` int NOT NULL AUTO_INCREMENT,
  `eventid` int DEFAULT NULL,
  `cusID` int DEFAULT NULL,
  PRIMARY KEY (`ideventsregistered`),
  KEY `eventid_idx` (`eventid`),
  CONSTRAINT `eventid` FOREIGN KEY (`eventid`) REFERENCES `events` (`idevents`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orderhistory`
--

DROP TABLE IF EXISTS `orderhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderhistory` (
  `idorderhistory` int NOT NULL AUTO_INCREMENT,
  `resID` int DEFAULT NULL,
  `cusID` int DEFAULT NULL,
  `orderstatus` varchar(45) DEFAULT NULL,
  `ordertype` varchar(45) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`idorderhistory`),
  KEY `cusID_idx` (`cusID`),
  KEY `resID_idx` (`resID`),
  CONSTRAINT `cusid` FOREIGN KEY (`cusID`) REFERENCES `customer` (`idcustomer`),
  CONSTRAINT `redid` FOREIGN KEY (`resID`) REFERENCES `restaurant` (`idrestaurant`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderid` int NOT NULL AUTO_INCREMENT,
  `resID` int DEFAULT NULL,
  `cusID` varchar(45) DEFAULT NULL,
  `dishID` int DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  `ordernumber` int DEFAULT NULL,
  PRIMARY KEY (`orderid`),
  KEY `resID_idx` (`dishID`),
  KEY `resID_idx1` (`resID`),
  CONSTRAINT `dishID` FOREIGN KEY (`dishID`) REFERENCES `resDishes` (`dishID`),
  CONSTRAINT `resID` FOREIGN KEY (`resID`) REFERENCES `restaurant` (`idrestaurant`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `resDishes`
--

DROP TABLE IF EXISTS `resDishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resDishes` (
  `dishID` int NOT NULL AUTO_INCREMENT,
  `resID` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `ingredients` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`dishID`),
  KEY `resID_idx` (`resID`),
  CONSTRAINT `resIDdish` FOREIGN KEY (`resID`) REFERENCES `restaurant` (`idrestaurant`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `idrestaurant` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `zipcode` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idrestaurant`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `restaurantProfile`
--

DROP TABLE IF EXISTS `restaurantProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurantProfile` (
  `idrestaurant` int DEFAULT NULL,
  `resproID` int NOT NULL AUTO_INCREMENT,
  `location` varchar(100) DEFAULT NULL,
  `description` varchar(20000) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `timings` varchar(100) DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `cusine` varchar(100) DEFAULT NULL,
  `takeout` varchar(45) DEFAULT NULL,
  `dinein` varchar(45) DEFAULT NULL,
  `ydelivery` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`resproID`),
  KEY `idrestaurant_idx` (`idrestaurant`),
  CONSTRAINT `idrestaurant` FOREIGN KEY (`idrestaurant`) REFERENCES `restaurant` (`idrestaurant`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `idreviews` int NOT NULL AUTO_INCREMENT,
  `resid` int DEFAULT NULL,
  `cusid` int DEFAULT NULL,
  `reviews` varchar(4000) DEFAULT NULL,
  `ratings` int DEFAULT NULL,
  PRIMARY KEY (`idreviews`),
  KEY `resid_idx` (`resid`),
  KEY `cusidReview_idx` (`cusid`),
  CONSTRAINT `cusidReview` FOREIGN KEY (`cusid`) REFERENCES `customer` (`idcustomer`),
  CONSTRAINT `residReview` FOREIGN KEY (`resid`) REFERENCES `restaurant` (`idrestaurant`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'yelpDB'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_event` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `add_event`(
in _user_id INT,
in _event_name varchar(100),
in _description varchar (4000),
in _month INT,
in _date INT,
in _year INT,
in _time varchar (100),
in _location varchar (100),
in _hastags varchar (2000)

)
BEGIN
IF NOT EXISTS(SELECT * FROM events WHERE (resID=_user_id AND eventname = _event_name AND description = _description AND month = _month AND
date = _date AND year=_year AND time = _time)) THEN
INSERT INTO events(resID, eventname, description, month, date, year, time, location, hashtags)
VALUES (_user_id, _event_name, _description, _month, _date, _year, _time, _location, _hastags);

SELECT 'EVENT_ADDED' as status;
ELSE
SELECT 'EVENT_EXISTS' as status;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_item` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `add_item`(
  in user_id INT,
  in dishname varchar(100),
  in category varchar(100),
  in ingredients varchar(100),
  in description varchar(2000),
  in price varchar(100),
  in _image varchar (100)
)
BEGIN
    
    IF NOT EXISTS(SELECT * FROM resDishes WHERE name = dishname AND resID = user_id) THEN
    BEGIN
		INSERT INTO resDishes (resID, name, category, ingredients, description, price, image)
		VALUES(user_id, dishname, category, ingredients, description, price, _image);
        
        SELECT 'ITEM_ADDED' AS status;
	END;
    ELSE
		SELECT 'ITEM_EXISTS' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_orders` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `add_orders`(
  in _cus_id INT,
  in _res_id varchar(100),
  in _dish_id varchar(100)
)
BEGIN
    
    IF NOT EXISTS(SELECT * FROM orders WHERE dishID = _dish_id AND cusID = _cus_id AND ordernumber IS NULL) THEN
    BEGIN
		INSERT INTO orders (cusID, resID, dishID, quantity)
		VALUES(_cus_id, _res_id, _dish_id, 1);
        
        SELECT 'ITEM_ADDED' AS status;
	END;
    ELSE
		 UPDATE `yelpDB`.`orders` SET `quantity` = quantity + 1 WHERE(`dishID` = _dish_id);
        
		SELECT 'ITEM_ADDED' AS status;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_review` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `add_review`(
in _user_id INT,
in _res_id INT,
in _review varchar (4000),
in _rating INT
)
BEGIN
INSERT INTO reviews(resid, cusid, reviews, ratings)
VALUES (_res_id, _user_id, _review, _rating);

SELECT 'REVIEW_ADDED' as status;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cancel_orders` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `cancel_orders`(
    _cus_user_id INT,
    _res_id INT
)
BEGIN 
	DELETE FROM `orders` WHERE (resID = _res_id AND cusID = _cus_user_id AND ordernumber IS NULL);
    SELECT 'ORDER_CANCELLED' AS STATUS;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cpassword_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `cpassword_get`(
 in email_id varchar(100)
)
BEGIN
	IF EXISTS(SELECT idcustomer FROM customer WHERE email = email_id) THEN
		SELECT idcustomer, fname, lname, email, password, zipcode, month, day, year, "off" AS isOwner, 1 AS status FROM customer WHERE email = email_id;
	ELSE
		SELECT 0 AS status;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Customer_Profile_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `Customer_Profile_get`(
    _cus_user_id INT

)
BEGIN
SELECT 
	c.idcustomer, c.fname, c.lname,  c.email, c.zipcode, c.month, c.day, c.year, cp.headline, cp.city, cp.address, cp.nickname, cp.yelptime, cp.about, cp.hobbies, cp.social, cp.contact, cp.gender, cp.image
	FROM customer c
    INNER JOIN customerProfile cp
    ON c.idcustomer = cp.cus_id
    WHERE (c.idcustomer = _cus_user_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `customer_put` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `customer_put`(
  in _fname varchar(100),
  in _lname varchar(100),  
  in _email varchar(100),
  in _password varchar(100),
  in _zipcode varchar(100),
  in _month varchar(100),
  in _date varchar(100),
  in _year varchar(100)

)
BEGIN
  DECLARE _user_id INT;
	SELECT idcustomer INTO _user_id FROM customer WHERE email = _email;

	IF _user_id IS NULL THEN
    BEGIN
		INSERT INTO customer (fname, lname, email, password, zipcode, month, day, year)
		VALUES (_fname, _lname, _email, _password, _zipcode, _month, _date, _year);
        
        SELECT 'USER_ADDED' AS status;
	END;
    ELSE
		SELECT 'USER_EXISTS' AS status;
    END IF;
    SELECT idcustomer INTO _user_id FROM customer WHERE email = _email;
    INSERT INTO customerProfile (cus_id)
    VALUES (_user_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Customer_Update_BasicProfile` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `Customer_Update_BasicProfile`(
  in user_id INT,
  in fname varchar(100),
  in lname varchar(100),
  in gender varchar(100),
  in headline varchar(100),
  in city varchar(100),
  in email varchar(100),
  in zipcode varchar(100),
  in address varchar(100),
  in contact varchar(100),
  in nickname varchar(100),
  in yelptime varchar(100),
  in hobbies varchar(100),
  in about varchar(20000),
  in social varchar(100)
  
)
BEGIN
    UPDATE `yelpDB`.`customer` SET `fname` = fname WHERE (`idcustomer` = user_id);
	UPDATE `yelpDB`.`customer` SET `lname` = lname WHERE (`idcustomer` = user_id);
    UPDATE `yelpDB`.`customer` SET `email` = email WHERE (`idcustomer` = user_id);
    UPDATE `yelpDB`.`customer` SET `zipcode` = zipcode WHERE (`idcustomer` = user_id);
    UPDATE `yelpDB`.`customerProfile` SET `headline` = headline WHERE (`cus_id` = user_id);
    UPDATE `yelpDB`.`customerProfile` SET `city` = city WHERE (`cus_id` = user_id);
    UPDATE `yelpDB`.`customerProfile` SET `gender` = gender WHERE (`cus_id` = user_id);
	UPDATE `yelpDB`.`customerProfile` SET `address` = address WHERE (`cus_id` = user_id);
	UPDATE `yelpDB`.`customerProfile` SET `contact` = contact WHERE (`cus_id` = user_id);
	UPDATE `yelpDB`.`customerProfile` SET `nickname` = nickname WHERE (`cus_id` = user_id);
	UPDATE `yelpDB`.`customerProfile` SET `yelptime` = yelptime WHERE (`cus_id` = user_id);
    UPDATE `yelpDB`.`customerProfile` SET `hobbies` = hobbies WHERE (`cus_id` = user_id);
	UPDATE `yelpDB`.`customerProfile` SET `about` = about WHERE (`cus_id` = user_id);
    UPDATE `yelpDB`.`customerProfile` SET `social` = social WHERE (`cus_id` = user_id);
    
            SELECT 'USER_UPDATED' AS status;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getRegisteredPeople` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `getRegisteredPeople`(
in _event_id INT
)
BEGIN
IF EXISTS(SELECT * FROM eventsregistered WHERE (eventid = _event_id )) THEN
		SELECT e.cusID, c.fname, c.lname, c.idcustomer, cp.image, 'PEOPLE_PRESENT' AS STATUS
		FROM (eventsregistered e 
        INNER JOIN customer c
        ON e.cusID = c.idcustomer)
        INNER JOIN customerProfile cp 
        ON e.cusID = cp.cus_id
 WHERE (e.eventid = _event_id); 
 ELSE
 
 SELECT 'PEOPLE_ABSENT' as STATUS;
  END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_CorderHistoryFilter` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_CorderHistoryFilter`(
  in _cus_user_id INT,
  in _filter VARCHAR(45)

)
BEGIN
    
    IF EXISTS(SELECT * FROM orderhistory WHERE (cusID = _cus_user_id AND ( orderstatus = _filter OR ordertype = _filter))) THEN
		SELECT r.name, rp.image, oh.resID, oh.idorderhistory, oh.orderstatus , oh.ordertype, oh.datetime, 'ITEM_PRESENT' AS STATUS, _filter AS filter
		FROM ((orderhistory oh 
		INNER JOIN restaurant r
		ON oh.resID = r.idrestaurant)
        INNER JOIN restaurantProfile rp
        ON oh.resID = rp.idrestaurant)
		WHERE (oh.cusID = _cus_user_id AND ( orderstatus = _filter OR ordertype = _filter));
    ELSE
		SELECT 'ITEM_NOT_PRESENT' AS STATUS, _filter AS filter;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_dish` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_dish`(
  in dish_ID INT
)
BEGIN
    
    SELECT resDishes.dishID, resDishes.name, resDishes.ingredients, resDishes.price, resDishes.category, resDishes.description, resDishes.image
    FROM resDishes WHERE dishID = dish_ID;
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_events` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_events`(
  in _res_id INT

)
BEGIN
    
    IF EXISTS(SELECT * FROM events WHERE resID = _res_id) THEN
		SELECT e.idevents, e.eventname, e.description, e.month, e.year, e.time, e.date, e.location, 
        e.hashtags, r.name, 'EVENTS_PRESENT' AS STATUS
		FROM events e 
        INNER JOIN restaurant r 
        ON e.resID = r.idrestaurant
		WHERE (e.resID = _res_id);
    ELSE
		SELECT 'EVENTS_NOT_PRESENT' AS STATUS;
    END IF;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_items`(
  in user_id INT
)
BEGIN
    
    SELECT resDishes.dishID, resDishes.name, resDishes.ingredients, resDishes.price, resDishes.image, resDishes.category
    FROM resDishes WHERE resID = user_id;
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_locationFilter` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_locationFilter`(
   in location VARCHAR(100),
 in find VARCHAR(100),
  in _filter VARCHAR(45)

)
BEGIN
    
    IF EXISTS(SELECT * FROM restaurant WHERE ( (city = location OR name = find))) THEN
 SELECT concat(rp.location, ' ', r.city, ' ', r.zipcode ) as location, 'ITEM_PRESENT' as STATUS, _filter as filter
 FROM restaurant r
 INNER JOIN restaurantProfile rp
 ON r.idrestaurant = rp.idrestaurant
 WHERE ((r.name = find) 
 OR (r.city = location)) AND ((rp.takeout = _filter OR rp.dinein = _filter OR rp.ydelivery = _filter)) ; 
    ELSE
		SELECT 'ITEM_NOT_PRESENT' AS STATUS, _filter AS filter;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_locations` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_locations`(
 in location VARCHAR(100),
 in find VARCHAR(100)
)
BEGIN
IF EXISTS(SELECT * FROM restaurant WHERE (city = location OR name = find)) THEN
 SELECT concat(rp.location, ' ', r.city, ' ', r.zipcode ) as location, 'ITEM_PRESENT' as STATUS
 FROM restaurant r
 INNER JOIN restaurantProfile rp
 ON r.idrestaurant = rp.idrestaurant
 WHERE (r.name = find) 
 OR (r.city = location); 
 ELSE
 
 SELECT 'ITEM_NOT_PRESENT' as STATUS;
  END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_orderHistory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_orderHistory`(
  in _cus_user_id INT

)
BEGIN
    
    IF EXISTS(SELECT * FROM orderhistory WHERE cusID = _cus_user_id) THEN
		SELECT r.name, rp.image, oh.idorderhistory, oh.orderstatus , oh.ordertype, oh.datetime, 'ITEM_PRESENT' AS STATUS
		FROM ((orderhistory oh 
		INNER JOIN restaurant r
		ON oh.resID = r.idrestaurant)
        INNER JOIN restaurantProfile rp
        ON oh.resID = rp.idrestaurant)
		WHERE (oh.cusID = _cus_user_id);
    ELSE
		SELECT 'ITEM_NOT_PRESENT' AS STATUS;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_orderItems` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_orderItems`(
  in _cus_user_id INT,
  in _res_id INT

)
BEGIN
    
    IF EXISTS(SELECT * FROM orders WHERE cusID = _cus_user_id AND resID = _res_id AND ordernumber IS NULL) THEN
		SELECT rd.name, rd.category, rd.ingredients, rd.price, o.ordernumber, o.quantity, rd.image, 'ITEM_PRESENT' AS STATUS
		FROM orders o 
		INNER JOIN resDishes rd 
		ON o.dishID = rd.dishID
		WHERE (o.cusID = _cus_user_id AND o.resID = _res_id AND ordernumber IS NULL);
    ELSE
		SELECT 'ITEM_NOT_PRESENT' AS STATUS;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_orderList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_orderList`(
    _res_id INT
)
BEGIN
SELECT 
	r.name FROM (orders o 
   INNER JOIN restaurant r ON o.resID = r.idrestaurant)
   WHERE r.idrestaurant = _res_id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_orders` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_orders`(
    _cus_user_id INT,
    _res_id INT
)
BEGIN
SELECT 
	o.ordertype, o.orderstatus, rd.name, o.quantity
	FROM ((orders o
    INNER JOIN resDishes rd ON o.dishID = rd.dishID));
    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_reqevents` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_reqevents`(
 in _location VARCHAR(100),
 in find VARCHAR(100)
)
BEGIN
IF EXISTS(SELECT * FROM events WHERE (location = _location OR eventname = find)) THEN
		SELECT e.idevents, e.eventname, e.description, e.month, e.year, e.time, e.date, e.location, r.name,
        e.hashtags, 'EVENTS_PRESENT' AS STATUS
		FROM events e 
        INNER JOIN restaurant r
        ON e.resID = r.idrestaurant
 WHERE (e.eventname = find) 
 OR (e.location = _location); 
 ELSE
 
 SELECT 'EVENTS_NOT_PRESENT' as STATUS;
  END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_restaurants` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_restaurants`(
 in find VARCHAR(100)
)
BEGIN
IF EXISTS(SELECT * FROM restaurant r 
INNER JOIN resDishes rd ON r.idrestaurant = rd.resID WHERE (rd.name = find)) THEN
 SELECT r.name, r.city, r.idrestaurant, rp.location, rp.description, rp.contact, rp.timings, rp.cusine, rp.image, rp.dinein, rp.takeout, rp.ydelivery, 'ITEM_PRESENT' as STATUS
 FROM ((restaurant r
 INNER JOIN restaurantProfile rp 
 ON r.idrestaurant = rp.idrestaurant)
 INNER JOIN resDishes rd ON r.idrestaurant = rd.resID)
 WHERE (rd.name = find) ;

 ELSE
 
 SELECT 'ITEM_NOT_PRESENT' as STATUS;
  END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_restaurantsFilter` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_restaurantsFilter`(
   in location VARCHAR(100),
 in find VARCHAR(100),
  in _filter VARCHAR(45)

)
BEGIN
    
    IF EXISTS(SELECT * FROM restaurant WHERE ( (city = location OR name = find))) THEN
 SELECT r.name, r.city, r.idrestaurant, rp.location, rp.description, rp.contact, rp.timings, rp.cusine, rp.image, rp.dinein, rp.takeout, rp.ydelivery, 'ITEM_PRESENT' as STATUS, _filter as filter
 FROM restaurant r
 INNER JOIN restaurantProfile rp
 ON r.idrestaurant = rp.idrestaurant
 WHERE ((r.name = find) 
 OR (r.city = location)) AND ((rp.takeout = _filter OR rp.dinein = _filter OR rp.ydelivery = _filter)) ; 
    ELSE
		SELECT 'ITEM_NOT_PRESENT' AS STATUS, _filter AS filter;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_restaurantsFromName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_restaurantsFromName`(
 in find VARCHAR(100)
)
BEGIN
IF EXISTS(SELECT * FROM restaurant r  WHERE r.name = find) THEN
 SELECT r.name, r.city, r.idrestaurant, rp.location, rp.description, rp.contact, rp.timings, rp.cusine, rp.image, rp.dinein, rp.takeout, rp.ydelivery, 'ITEM_PRESENT' as STATUS
 FROM restaurant r
 INNER JOIN restaurantProfile rp 
 ON r.idrestaurant = rp.idrestaurant
 WHERE r.name = find ;
 ELSE
 
 SELECT 'ITEM_NOT_PRESENT' as STATUS;
  END IF;
  END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_reviews` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_reviews`(
  in _res_id INT

)
BEGIN
    
    IF EXISTS(SELECT * FROM reviews WHERE resid = _res_id) THEN
		SELECT c.fname, r.reviews, r.ratings, 'REVIEW_PRESENT' AS STATUS
		FROM reviews r 
		INNER JOIN customer c 
		ON r.cusid = c.idcustomer
		WHERE (r.resid = _res_id);
    ELSE
		SELECT 'REVIEW_NOT_PRESENT' AS STATUS;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_RorderHistory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_RorderHistory`(
  in _res_user_id INT

)
BEGIN
    
    IF EXISTS(SELECT * FROM orderhistory WHERE resID = _res_user_id) THEN
		SELECT c.fname, c.lname, oh.cusID, oh.idorderhistory, oh.orderstatus , oh.ordertype, oh.datetime, 'ITEM_PRESENT' AS STATUS
		FROM orderhistory oh 
		INNER JOIN customer c 
		ON oh.cusID = c.idcustomer
		WHERE (oh.resID = _res_user_id);
    ELSE
		SELECT 'ITEM_NOT_PRESENT' AS STATUS;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_RorderHistoryFilter` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_RorderHistoryFilter`(
  in _res_user_id INT,
  in _filter VARCHAR(45)

)
BEGIN
    
    IF EXISTS(SELECT * FROM orderhistory WHERE (resID = _res_user_id AND ( orderstatus = _filter OR ordertype = _filter))) THEN
		SELECT c.fname, c.lname, oh.cusID, oh.idorderhistory, oh.orderstatus , oh.ordertype, oh.datetime, 'ITEM_PRESENT' AS STATUS, _filter AS filter
		FROM orderhistory oh 
		INNER JOIN customer c 
		ON oh.cusID = c.idcustomer
		WHERE (oh.resID = _res_user_id AND ( orderstatus = _filter OR ordertype = _filter));
    ELSE
		SELECT 'ITEM_NOT_PRESENT' AS STATUS, _filter AS filter;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_yourevents` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `get_yourevents`(
  in _user_id INT

)
BEGIN
    
    IF EXISTS(SELECT * FROM eventsregistered WHERE cusID = _user_id) THEN
		SELECT e.idevents, e.eventname, e.description, e.month, e.year, e.time, e.date, e.location, 
        e.hashtags, r.name , 'EVENTS_PRESENT' AS STATUS
		FROM (eventsregistered ed 
		INNER JOIN events e 
        ON ed.eventid = e.idevents)
        INNER JOIN restaurant r
        ON e.resID = r.idrestaurant
        WHERE ed.cusID = _user_id;
        
        
    ELSE
		SELECT 'EVENTS_NOT_PRESENT' AS STATUS;
    END IF;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `password_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `password_get`(
 in email_id varchar(100)
)
BEGIN
	IF EXISTS(SELECT idrestaurant FROM restaurant WHERE email = email_id) THEN
		SELECT idrestaurant, name, email, password, zipcode, "on" AS isOwner, 1 AS status FROM restaurant WHERE email = email_id;
	ELSE
		SELECT 0 AS status;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `place_order` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `place_order`(
  in _cus_user_id INT,
  in _res_id INT,
  in _order_status varchar(45),
  in _order_type varchar(45)
)
BEGIN
    DECLARE _order_datetime DATETIME;
    DECLARE _order_number INT;
    SELECT CURRENT_TIMESTAMP() INTO _order_datetime;
    
    IF _res_id IS NOT NULL THEN
    BEGIN
		INSERT INTO orderhistory(cusID, resID, orderstatus, ordertype, datetime)
        VALUES(_cus_user_id, _res_id, _order_status, _order_type , CURRENT_TIMESTAMP());
        


        SELECT 'ORDER_PLACED' AS status;
	END;
    
    ELSE
		SELECT 'ORDER_FAILED' AS status;
    END IF;
    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `register_event` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `register_event`(
in _event_id INT,
in _cusID INT
)
BEGIN
IF NOT EXISTS(SELECT * FROM eventsregistered WHERE (eventid = _event_id AND cusID = _cusID)) THEN
BEGIN
	INSERT INTO eventsregistered(eventid, cusID)
	VALUES (_event_id, _cusID);
	SELECT 'REGISTERED_EVENT' as status;
    END;
ELSE 
	SELECT "ALREADY_REGISTERED" as status;
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Restaurant_Profile_get` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `Restaurant_Profile_get`(
    _owner_user_id INT,
	_email_id VARCHAR(100),
    _res_id INT
)
BEGIN
SELECT 
	r.idrestaurant, r.name, r.email, r.zipcode, rp.resproID, rp.location, rp.description, rp.contact, rp.timings, rp.image, rp.cusine, rp.dinein, rp.takeout, rp.ydelivery
	FROM restaurant r
    INNER JOIN restaurantProfile rp
    ON r.idrestaurant = rp.idrestaurant
    WHERE (_owner_user_id IS NULL OR r.idrestaurant = _owner_user_id)
    AND (_res_id IS NULL OR rp.idrestaurant = _res_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `restaurant_put` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `restaurant_put`(
  in rname varchar(100),
  in email_id varchar(100),
  in password varchar(100),
  in zipcode varchar(100)
)
BEGIN
  DECLARE _user_id INT;
	SELECT idrestaurant INTO _user_id FROM restaurant WHERE email = email_id;

	IF _user_id IS NULL THEN
    BEGIN
		INSERT INTO restaurant (name, email, password, zipcode)
		VALUES (rname, email_id, password, zipcode);
        
        SELECT 'USER_ADDED' AS status;
	END;
    ELSE
		SELECT 'USER_EXISTS' AS status;
    END IF;
        SELECT idrestaurant INTO _user_id FROM restaurant WHERE email = email_id;
    INSERT INTO restaurantProfile (idrestaurant)
    VALUES (_user_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Restaurant_Update_BasicProfile` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `Restaurant_Update_BasicProfile`(
  user_id INT,
  in name varchar(100),
  in email_id varchar(100),
  in zipcode varchar(100),
  in location varchar(100),
  in contact varchar(100),
  in cusine varchar(100),
  in description varchar(20000),
  in timings varchar(100),
  in dinein varchar(45),
  in takeout varchar(45),
  in ydelivery varchar(45)
)
BEGIN
    UPDATE `yelpDB`.`restaurant` SET `name` = name WHERE (`idrestaurant` = user_id);
    UPDATE `yelpDB`.`restaurant` SET `email` = email_id WHERE (`idrestaurant` = user_id);
    UPDATE `yelpDB`.`restaurant` SET `zipcode` = zipcode WHERE (`idrestaurant` = user_id);
	UPDATE `yelpDB`.`restaurantProfile` SET `location` = location WHERE (`idrestaurant` = user_id);
	UPDATE `yelpDB`.`restaurantProfile` SET `contact` = contact WHERE (`idrestaurant` = user_id);
	UPDATE `yelpDB`.`restaurantProfile` SET `cusine` = cusine WHERE (`idrestaurant` = user_id);
	UPDATE `yelpDB`.`restaurantProfile` SET `description` = description WHERE (`idrestaurant` = user_id);
	UPDATE `yelpDB`.`restaurantProfile` SET `timings` = timings WHERE (`idrestaurant` = user_id);
	UPDATE `yelpDB`.`restaurantProfile` SET `dinein` = dinein WHERE (`idrestaurant` = user_id);
	UPDATE `yelpDB`.`restaurantProfile` SET `takeout` = takeout WHERE (`idrestaurant` = user_id);
	UPDATE `yelpDB`.`restaurantProfile` SET `ydelivery` = ydelivery WHERE (`idrestaurant` = user_id);






    

        
        SELECT 'USER_UPDATED' AS status;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_dish` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `update_dish`(
  in dish_ID INT,
  in dish_name varchar(100),
  in dish_category varchar(100),
  in dish_ingredients varchar(100),
  in dish_description varchar(2000),
  in dish_price varchar(100)
  
)
BEGIN
    UPDATE `yelpDB`.`resDishes` SET `name` = dish_name WHERE (`dishID` = dish_ID);
    UPDATE `yelpDB`.`resDishes` SET `category` = dish_category WHERE (`dishID` = dish_ID);
    UPDATE `yelpDB`.`resDishes` SET `ingredients` = dish_ingredients WHERE (`dishID` = dish_ID);
	UPDATE `yelpDB`.`resDishes` SET `description` = dish_description WHERE (`dishID` = dish_ID);
	UPDATE `yelpDB`.`resDishes` SET `price` = dish_price WHERE (`dishID` = dish_ID);
        SELECT 'ITEM_UPDATED' AS status;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_orders` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`yelp`@`localhost` PROCEDURE `update_orders`(
  
  in _res_id varchar(45),
  in _order_id INT,
  in _order_status varchar(45),
  in _order_type varchar(45)
)
BEGIN
    UPDATE `yelpDB`.`orderhistory` SET `orderstatus` = _order_status WHERE (`idorderhistory` = _order_id);
    UPDATE `yelpDB`.`orderhistory` SET `ordertype` = _order_type WHERE (`idorderhistory` = _order_id);
        
SELECT 'ORDER_UPDATED' AS status;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-10 20:14:19
