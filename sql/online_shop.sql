-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 04 avr. 2023 à 07:37
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `online_shop`
--

-- --------------------------------------------------------

--
-- Structure de la table `avis_client`
--

DROP TABLE IF EXISTS `avis_client`;
CREATE TABLE IF NOT EXISTS `avis_client` (
  `id_avis` int(11) NOT NULL AUTO_INCREMENT,
  `id_produit` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `titre_avis` text NOT NULL,
  `commentaire_avis` text NOT NULL,
  `note_avis` int(11) NOT NULL,
  PRIMARY KEY (`id_avis`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id_categories` int(11) NOT NULL AUTO_INCREMENT,
  `name_categories` varchar(255) NOT NULL,
  PRIMARY KEY (`id_categories`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `id_client` int(11) NOT NULL AUTO_INCREMENT,
  `login_client` varchar(255) NOT NULL,
  `password_client` varchar(255) NOT NULL,
  `type_compte` varchar(255) NOT NULL,
  `avatar_client` varchar(300) NOT NULL,
  `prenom_client` varchar(255) NOT NULL,
  `nom_client` varchar(255) NOT NULL,
  `ville_client` varchar(255) NOT NULL,
  `code_postale_client` varchar(5) NOT NULL,
  `adresse_client` varchar(255) NOT NULL,
  `email_client` varchar(319) NOT NULL,
  `mobile_client` varchar(15) NOT NULL,
  `pays_client` varchar(255) NOT NULL,
  `created_at_client` timestamp NOT NULL,
  PRIMARY KEY (`id_client`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `id_commande` int(11) NOT NULL AUTO_INCREMENT,
  `id_client` int(11) NOT NULL,
  `date_commande` timestamp NOT NULL,
  `motant_commande` decimal(10,2) NOT NULL,
  `statue_commande` varchar(255) NOT NULL,
  PRIMARY KEY (`id_commande`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `detail_commande`
--

DROP TABLE IF EXISTS `detail_commande`;
CREATE TABLE IF NOT EXISTS `detail_commande` (
  `id_detail_commande` int(11) NOT NULL AUTO_INCREMENT,
  `id_commande` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `quantite_produit` int(11) NOT NULL,
  PRIMARY KEY (`id_detail_commande`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

DROP TABLE IF EXISTS `panier`;
CREATE TABLE IF NOT EXISTS `panier` (
  `id_panier` int(11) NOT NULL AUTO_INCREMENT,
  `id_client` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantite_product` int(11) NOT NULL,
  `date_creation` timestamp NOT NULL,
  PRIMARY KEY (`id_panier`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `name_product` int(11) NOT NULL,
  `description_product` int(11) NOT NULL,
  `price_product` decimal(10,2) NOT NULL,
  `quantite_product` int(11) NOT NULL,
  `quantite_vendue` int(11) DEFAULT NULL,
  `img_product` varchar(300) NOT NULL,
  `rating_product` decimal(3,2) NOT NULL,
  `released_date_product` timestamp NOT NULL,
  `id_subcategories` int(11) NOT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
CREATE TABLE IF NOT EXISTS `subcategories` (
  `id_subcategories` int(11) NOT NULL AUTO_INCREMENT,
  `name_subcategories` varchar(255) NOT NULL,
  `categories_id` int(11) NOT NULL,
  PRIMARY KEY (`id_subcategories`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_users` int(11) NOT NULL,
  `login_users` varchar(255) NOT NULL,
  `password_users` varchar(255) NOT NULL,
  `type_compte_users` varchar(255) NOT NULL,
  `avatar_users` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
