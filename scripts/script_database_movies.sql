CREATE DATABASE `movies`;

USE `movies`;

CREATE TABLE `pelicula` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `duracion` int(5),
  `director` varchar(400) NOT NULL,
  `anio` int(5) NOT NULL,
  `fecha_lanzamiento` date,
  `puntuacion` int(2),
  `poster` varchar(300) NOT NULL,
  `trama` varchar(700),
  `genero_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`genero_id`) REFERENCES `genero`(`id`)
);

CREATE TABLE `genero`(
  `id`int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `actor`(
  `id`int NOT NULL AUTO_INCREMENT,
  `nombre`varchar(70),
  PRIMARY KEY (`id`)
);

CREATE TABLE `actor_pelicula`(
  `id`int NOT NULL AUTO_INCREMENT,
  `actor_id` int,
  `pelicula_id` int,
  PRIMARY KEY(`id`)
)