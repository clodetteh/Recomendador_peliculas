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
  PRIMARY KEY (`id`)
);