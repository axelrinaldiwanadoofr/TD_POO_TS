-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 06 déc. 2024 à 08:12
-- Version du serveur : 8.0.31
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dessin2d`
--

-- --------------------------------------------------------

--
-- Structure de la table `dessins`
--

DROP TABLE IF EXISTS `dessins`;
CREATE TABLE IF NOT EXISTS `dessins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `figures`
--

DROP TABLE IF EXISTS `figures`;
CREATE TABLE IF NOT EXISTS `figures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL,
  `idDessin` int NOT NULL,
  `V1` int DEFAULT NULL,
  `V2` int DEFAULT NULL,
  `V3` int DEFAULT NULL,
  `V4` int DEFAULT NULL,
  `V5` int DEFAULT NULL,
  `V6` int DEFAULT NULL,
  `V7` int DEFAULT NULL,
  `V8` int DEFAULT NULL,
  `V9` int DEFAULT NULL,
  `V10` int DEFAULT NULL,
  `V12` int DEFAULT NULL,
  `V13` int DEFAULT NULL,
  `V14` int DEFAULT NULL,
  `V15` int DEFAULT NULL,
  `V16` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
