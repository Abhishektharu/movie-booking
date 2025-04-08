-- Create the appdb database
CREATE DATABASE IF NOT EXISTS movie_booking;

-- Use the appdb database
USE movie_booking;

-- Create the apptb table
CREATE TABLE `movie_booking`.`movie_booking` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));


