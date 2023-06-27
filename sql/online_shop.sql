-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 27 juin 2023 à 09:00
-- Version du serveur : 5.7.36
-- Version de PHP : 8.1.0

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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `produit_id` int(11) NOT NULL,
  `title_comment` text,
  `content` text NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `note_avis` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `update_at` timestamp NULL DEFAULT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `avis_client`
--

INSERT INTO `avis_client` (`id`, `produit_id`, `title_comment`, `content`, `parent_id`, `note_avis`, `created_at`, `update_at`, `users_id`) VALUES
(1, 1, 'Test', 'Test', NULL, 4, '2023-04-19 14:25:23', NULL, 1),
(2, 1, 'ttt', 'In hendrerit gravida rutrum quisque. Neque vitae tempus quam pellentesque nec.', NULL, 3, '2023-04-19 14:38:32', '2023-06-09 08:33:01', 1),
(4, 1, 'Lorem', 'Corporis ad aperiam possimus similique rem. Dolore quae molestiae eos sit molestiae voluptatem. Ad perspiciatis aliquam quia.', NULL, 1, '2023-04-19 15:34:25', NULL, 3),
(5, 9, 'Test', 'Test', NULL, 4, '2023-04-27 14:45:47', NULL, 5),
(6, 9, 'test02', 'Try', NULL, 2, '2023-04-27 14:47:11', NULL, 5),
(7, 9, 'test 04', 'F', NULL, 2, '2023-04-27 14:47:59', NULL, 5),
(8, 2, 'Harum quisquam', 'Harum quisquam officia eligendi nam eos qui illum aut. Omnis accusantium debitis nihil temporibus consequatur velit. Laboriosam non explicabo debitis. Est autem omnis nostrum soluta corrupti qui id reiciendis. Repudiandae quia natus est et', NULL, 3, '2023-04-27 14:49:32', NULL, 5),
(9, 1, NULL, '122225453342', 2, NULL, '2023-06-06 07:24:44', NULL, 15),
(13, 1, NULL, 'gggfff', 4, NULL, '2023-06-09 12:30:05', NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id_cart` int(11) NOT NULL AUTO_INCREMENT,
  `total_price_cart` decimal(10,2) NOT NULL DEFAULT '0.00',
  `status_cart` varchar(50) NOT NULL DEFAULT 'active',
  `created_at_cart` timestamp NOT NULL,
  `modified_at_cart` timestamp NOT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`id_cart`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cart`
--

INSERT INTO `cart` (`id_cart`, `total_price_cart`, `status_cart`, `created_at_cart`, `modified_at_cart`, `users_id`) VALUES
(3, '106.60', 'active', '2023-04-24 14:16:18', '2023-04-26 09:20:30', 3),
(4, '44.99', 'active', '2023-04-25 10:13:24', '2023-04-25 12:47:34', 4),
(5, '0.00', 'active', '2023-04-27 04:30:58', '2023-04-27 04:34:41', 2),
(9, '57.99', 'active', '2023-04-27 17:38:02', '2023-04-27 17:38:02', 5);

-- --------------------------------------------------------

--
-- Structure de la table `cart_product`
--

DROP TABLE IF EXISTS `cart_product`;
CREATE TABLE IF NOT EXISTS `cart_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity_product` int(11) NOT NULL,
  `price_product` decimal(10,2) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cart_product`
--

INSERT INTO `cart_product` (`id`, `quantity_product`, `price_product`, `cart_id`, `product_id`) VALUES
(36, 1, '51.11', 3, 10),
(35, 1, '55.49', 3, 4),
(34, 1, '44.99', 4, 8),
(43, 1, '57.99', 9, 9);

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id_categories` int(11) NOT NULL AUTO_INCREMENT,
  `name_categories` varchar(255) NOT NULL,
  PRIMARY KEY (`id_categories`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id_categories`, `name_categories`) VALUES
(1, 'Action'),
(2, 'Aventure'),
(11, 'Horreur'),
(4, 'RPG'),
(12, 'Multijoueur'),
(5, 'Réflexion'),
(6, 'Simulation'),
(7, 'Stratégie'),
(8, 'Sport');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `id_client` int(11) NOT NULL AUTO_INCREMENT,
  `prenom_client` varchar(255) NOT NULL DEFAULT '',
  `nom_client` varchar(255) NOT NULL DEFAULT '',
  `ville_client` varchar(255) NOT NULL DEFAULT '',
  `code_postal_client` varchar(5) NOT NULL DEFAULT '',
  `adresse_client` varchar(255) NOT NULL DEFAULT '',
  `mobile_client` varchar(15) NOT NULL DEFAULT '',
  `pays_client` varchar(255) NOT NULL DEFAULT '',
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`id_client`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id_client`, `prenom_client`, `nom_client`, `ville_client`, `code_postal_client`, `adresse_client`, `mobile_client`, `pays_client`, `users_id`) VALUES
(1, 'Jules', 'Jean', 'Marseille', '10000', '4 lorem ipsum', '', 'France', 1),
(2, '', '', '', '', '', '', '', 2),
(3, 'Lionel', 'Lion', 'Marseille', '13000', 'test d\'adresse', '', 'France', 3),
(4, '', '', '', '', '', '', '', 4),
(5, 'test', 'Test', 'toto', '13000', '4 rue de toto', '', 'France', 5),
(9, '', '', '', '', '', '', '', 9),
(10, '', '', '', '', '', '', '', 10),
(11, '', '', '', '', '', '', '', 11),
(12, '', '', '', '', '', '', '', 12),
(13, '', '', '', '', '', '', '', 13),
(14, '', '', '', '', '', '', '', 14),
(15, 'User', 'User', 'User', '13000', '4 boulevard du  User', '', 'User', 15);

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `id_commande` int(11) NOT NULL AUTO_INCREMENT,
  `date_commande` timestamp NOT NULL,
  `motant_commande` decimal(10,2) NOT NULL,
  `statue_commande` varchar(255) NOT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`id_commande`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id_commande`, `date_commande`, `motant_commande`, `statue_commande`, `users_id`) VALUES
(8, '2023-05-10 18:43:00', '113.48', 'En cours', 15);

-- --------------------------------------------------------

--
-- Structure de la table `comment_avis`
--

DROP TABLE IF EXISTS `comment_avis`;
CREATE TABLE IF NOT EXISTS `comment_avis` (
  `id_comment` int(11) NOT NULL AUTO_INCREMENT,
  `avis_parent_id` int(11) DEFAULT NULL,
  `comment_parent_id` int(11) DEFAULT NULL,
  `content_comment` text NOT NULL,
  `created_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL,
  `users_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id_comment`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comment_avis`
--

INSERT INTO `comment_avis` (`id_comment`, `avis_parent_id`, `comment_parent_id`, `content_comment`, `created_at`, `update_at`, `users_id`, `product_id`) VALUES
(1, 3, NULL, 'Test Réponse Edit', '2023-04-19 22:36:36', '2023-05-07 11:28:56', 1, 1),
(2, 3, NULL, '<i>Ce commentaire a été supprimer.</i>', '2023-04-19 22:54:37', NULL, 1, 1),
(3, NULL, 2, 'Test Rep Comment', '2023-04-23 15:10:01', NULL, 1, 1),
(4, NULL, 3, 'Essai rep', '2023-04-24 14:17:26', NULL, 3, 1),
(5, 7, NULL, 'REPONSE', '2023-04-28 12:56:01', NULL, 5, 9),
(6, NULL, 4, 'rep a 4', '2023-05-01 07:25:39', NULL, 3, 1),
(7, NULL, 1, 'Réponse à Test Réponse Edit', '2023-05-07 14:39:51', '2023-05-07 14:39:51', 4, 1),
(8, NULL, 4, 'Réponse à Essai rep', '2023-05-07 17:03:49', '2023-05-07 17:03:49', 1, 1),
(9, NULL, 3, 'Lorem', '2023-05-07 17:24:55', '2023-05-07 17:24:55', 1, 1),
(10, NULL, 3, 'Reponse au Comment id-3', '2023-05-07 18:14:47', '2023-05-07 18:14:47', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `detail_commande`
--

DROP TABLE IF EXISTS `detail_commande`;
CREATE TABLE IF NOT EXISTS `detail_commande` (
  `id_detail_commande` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `quantite_produit` int(11) NOT NULL,
  `price_product` decimal(10,2) NOT NULL,
  `command_id` int(11) NOT NULL,
  PRIMARY KEY (`id_detail_commande`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `detail_commande`
--

INSERT INTO `detail_commande` (`id_detail_commande`, `product_id`, `quantite_produit`, `price_product`, `command_id`) VALUES
(1, 1, 1, '19.99', 3),
(2, 3, 1, '10.99', 3),
(3, 4, 1, '55.49', 4),
(4, 4, 2, '55.49', 5),
(5, 2, 1, '28.49', 5),
(9, 9, 1, '57.99', 8),
(10, 4, 1, '55.49', 8);

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `name_product` varchar(255) NOT NULL,
  `description_product` text NOT NULL,
  `price_product` decimal(10,2) NOT NULL,
  `quantite_product` int(11) NOT NULL,
  `quantite_vendue` int(11) DEFAULT '0',
  `img_product` varchar(300) NOT NULL,
  `rating_product` decimal(3,2) DEFAULT NULL,
  `released_date_product` date NOT NULL,
  `ajout_date_product` timestamp NOT NULL,
  `dispo_product` int(11) NOT NULL,
  `subcategories_id` int(11) NOT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id_product`, `name_product`, `description_product`, `price_product`, `quantite_product`, `quantite_vendue`, `img_product`, `rating_product`, `released_date_product`, `ajout_date_product`, `dispo_product`, `subcategories_id`) VALUES
(1, 'Far Cry 6', 'Far Cry 6 est un FPS qui se déroule sur l\'île tropicale fictive de Yara. Vous incarnez Dani Rojas, un membre de la guérilla locale qui lutte contre le régime oppressif du dictateur du pays, Anton Castillo, qui prépare son fils à prendre sa suite. Pour vous aider dans votre combat, vous pouvez compter sur vos alliés les Amigos et fabriquer vos propres armes et véhicules.', '19.99', 149, 1, '1631607413-3853-jaquette-avant.jpg', '1.80', '2021-10-07', '2023-04-10 08:54:10', 0, 1),
(2, 'Cyberpunk 2077', 'Cyberpunk 2077 est un jeu de rôle futuriste et dystopique inspiré du jeu de rôle papier du même nom. Dans un monde devenu indissociable de la cybernétique, l\'indépendance des robots humanoïdes pose quelques problèmes...', '28.49', 149, 2, '2077-jaquette-avant.gif', '3.00', '2020-12-10', '2023-04-10 13:17:02', 0, 1),
(3, 'Assassin\'s Creed Origins', 'Assassin\'s Creed Origins est un action RPG en monde ouvert incluant des mécaniques d\'infiltration. Le titre vous fait visiter les terres mystérieuses de l\'Egypte antique dans la peau de Bayek, nouveau héros d\'un épisode nous dévoilant les origines de la création de la confrérie des assassins chère à la série phare d\'Ubisoft.', '10.99', 0, 1, '1497601876-9386-jaquette-avant.jpg', NULL, '2017-10-27', '2023-04-18 13:14:40', 1, 1),
(4, 'Hogwarts Legacy : l\'Héritage de Poudlard', 'Hogwarts Legacy : l\'Héritage de Poudlard est un jeu de rôle se déroulant au XIXe siècle dans l\'univers d\'Harry Potter. Le joueur y incarne un étudiant et peut librement explorer Poudlard et s\'y forger sa carrière de sorcier.', '55.49', 213, 3, '1636363677-7536-jaquette-avant.gif', NULL, '2023-02-10', '2023-04-21 14:10:19', 0, 7),
(5, 'FIFA 23', 'Il s\'agit de la dernière version du célèbre licence de football en collaboration avec la FIFA. FIFA 23 apporte des améliorations techniques, de nouveaux modes et de nouveaux joueurs pour créer les équipes de foot.', '40.00', 210, 0, '1659449057-7682-jaquette-avant.webp', NULL, '2022-10-30', '2023-04-21 14:21:49', 0, 8),
(6, 'Elden Ring', 'Elden Ring est le nouveau jeu de From Software. Il s\'agit d\'un Action-RPG à la troisième personne qui se déroule dans un monde ouvert. Le jeu marque la collaboration entre Hidetaka Miyazaki et George R. R. Martin, le créateur de Game of Thrones.', '51.64', 450, 0, '1633006670-7022-jaquette-avant.webp', NULL, '2022-02-25', '2023-04-21 14:25:50', 0, 9),
(7, 'NBA 2K23', 'Découvrez l\'édition 2023 de la fameuse licence de jeux de Basketball, réintroduisant les Jordan Challenges, encourageant les joueurs à reproduire 15 moments iconiques de l\'un des plus grands joueurs de l\'histoire.', '22.00', 165, 0, '1657036955-618-jaquette-avant.webp', NULL, '2022-10-09', '2023-04-21 14:28:50', 0, 8),
(8, 'Mario + The Lapins Crétins Sparks of Hope', 'Mario retrouve les Lapins Crétins pour sauver l\'univers. Ce jeu d\'aventure tactique est peuplé de nouveaux ennemis, dont le terrible Cursa qui cherche à absorber l\'intégralité de l\'énergie de la galaxie.', '44.99', 209, 1, '1640614342-8582-jaquette-avant.gif', NULL, '2022-10-20', '2023-04-21 14:33:23', 0, 10),
(9, 'Dead Island 2', 'Dead Island 2 est un FPS, suite directe du premier volet. Plusieurs mois après les événements qui se sont déroulés à Banoi, les Etats-Unis se voient obligés de mettre la Californie en quarantaine. Désormais zone interdite, &quot;l\'Etat doré&quot; est devenu un paradis sanglant pour ceux qui ont refusé de quitter leur maison, et un terrain de chasse rêvé pour les renégats qui cherchent l’aventure, la gloire et un nouveau départ.', '57.99', 148, 5, '1681999622-9062-jaquette-avant.webp', '2.70', '2023-04-21', '2023-04-23 17:35:31', 0, 11),
(10, 'Resident Evil 4 (2023)', 'Leon Kennedy revient avec le remake de Resident Evil 4. Ce survival-horror proposera une aventure totalement repensée et modernisée, à l\'instar de ce qui a été fait avec Resident Evil 2 et Resident Evil 3. Un mode spécial en VR est prévu pour fonctionner avec le PSVR2.', '51.11', 109, 1, '1678711307-842-jaquette-avant.webp', NULL, '2023-03-24', '2023-04-23 17:42:17', 0, 12),
(11, 'God of War : Ragnarok', 'God of War : Ragnarok est un jeu d\'action sur PS5 développé par Santa Monica, qui fait suite au soft reboot de la série God of War sur PS4. Le Ragnarök, célèbre événement de la mythologie nordique est ici la toile de fond scénaristique du jeu.', '54.91', 146, 0, '1631285951-644-jaquette-avant.webp', NULL, '2022-11-09', '2023-04-23 17:44:40', 0, 1),
(12, 'PGA Tour 2K23', 'PGA Tour 2K23 est une simulation de golf. Vous pourrez parcourir 20 parcours sous licence en incarnant quatorze golfeurs professionnels et… Stephen Curry ! Le jeu propose entre autres le mode Carrière PGA Tour qui vous permettra de créer votre personnage et de l\'amener au sommet de ce sport.', '17.20', 25, 0, '1676019744-9127-jaquette-avant.jpg', NULL, '2022-10-11', '2023-04-25 07:47:37', 0, 8),
(13, 'The Last of Us Part I', 'The Last of Us Part I est un remake du jeu The Last of Us, sorti en 2013. Développé par Naughty Dog, le jeu propose une aventure technique refaite à partir de zéro et sublimée grâce aux nouvelles technologies de la PlayStation 5. L\'intelligence a aussi été totalement refaite, tandis que l\'expérience comprend une compatibilité avec l\'audio 3D, les retours haptiques ou les gâchettes adaptatives. Les effets, l\'exploration et les combats ont aussi été améliorés.', '49.99', 340, 0, '1659428750-8481-jaquette-avant.webp', NULL, '2022-09-02', '2023-04-25 07:50:16', 0, 12),
(14, 'Diablo IV', 'Dans Diablo IV, les amateurs de hack&#039;n slash sont réunis dans un monde partagé pour braver des donjons aléatoires remplis d&#039;ennemis et de butins ou pour s’entre-tuer lors de combats PvP. Cinq classes sont jouables, dont le barbare, la sorcière et le druide. Chacune dispose d&#039;arbres de talents et de compétences personnalisables, à conjuguer avec un système de butincomprenant des objets légendaires et d’ensemble à collectionner, des combinaisons de runes et de mots runiques, et des montures personnalisées pour parcourir le monde ouvert.', '58.73', 550, 0, '1655108114-4402-jaquette-avant.webp', NULL, '2023-06-06', '2023-06-20 13:47:06', 0, 1),
(15, 'Call of Duty : Modern Warfare 2 (2022)', 'Version reboot de l&#039;emblématique jeu de tir à la première personne sorti en 2009, Call of Duty Modern Warfare 2 offre une expérience multi et solo ayant pour but de raviver la flamme de son illustre prédécesseur. Le jeu bénéficie de nouveaux graphismes et d&#039;une refonte complète. Il devrait être le début d&#039;une nouvelle ère pour la licence.', '45.02', 120, 0, '1655108230-8066-jaquette-avant.webp', NULL, '2022-10-29', '2023-06-22 12:07:40', 0, 1),
(16, 'Star Wars Jedi : Survivor', 'Star Wars Jedi : Survivor se passe cinq années après Fallen Order et plonge le joueur une nouvelle fois dans l&#039;histoire de Cal Kestis. Notre héros est désormais un Jedi accompli et tente de survivre aux confins de la Galaxie. Toujours accompagné de BD-1, le Jedi affrontera à nouveau le terrible Empire galactique.', '59.99', 80, 0, '1675258819-5809-jaquette-avant.webp', NULL, '2023-04-28', '2023-06-22 12:19:20', 0, 1),
(17, 'Final Fantasy XVI', 'Final Fantasy XVI est un Action RPG sur PS5 qui a été annoncé au cours de la conférence présentant les jeux, le prix et la date de sortie de la PlayStation 5. Celui-ci se déroule dans un univers medieval fantastique bien plus proche de l&#039;Heroic Fantasy que ne l&#039;était son prédécesseur.', '68.85', 259, 1, '1603960843-5635-jaquette-avant.webp', NULL, '2023-06-22', '2023-06-22 12:27:43', 0, 7);

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
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `subcategories`
--

INSERT INTO `subcategories` (`id_subcategories`, `name_subcategories`, `categories_id`) VALUES
(1, 'Combat', 1),
(8, 'Simulation ', 8),
(7, 'Action RPG', 1),
(6, 'Beat them All', 1),
(9, 'RPG', 4),
(10, 'Action', 7),
(11, 'FPS', 1),
(12, 'Survival-Horror ', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_users` int(11) NOT NULL AUTO_INCREMENT,
  `login_users` varchar(255) NOT NULL,
  `email_users` varchar(319) NOT NULL,
  `password_users` varchar(255) NOT NULL,
  `type_compte_users` varchar(255) NOT NULL,
  `avatar_users` varchar(255) NOT NULL,
  `created_at_users` timestamp NOT NULL,
  `modified_at_users` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_users`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_users`, `login_users`, `email_users`, `password_users`, `type_compte_users`, `avatar_users`, `created_at_users`, `modified_at_users`) VALUES
(1, 'Jules', 'jules@gmail.com', '$2y$10$D3mudbEmz/P05lHCPguMeeQ0PUIWaIP0fNddnW3NmOow4lPJ57H0y', 'administrateur', '343af6-Joaquiniquil.png', '2023-04-04 11:47:07', '2023-06-27 08:51:07'),
(3, 'Lionel', 'lionel@gmail.com', '$2y$10$i/bTTRLR4.rJrweYCeWK8Obb69jmkgoDVF/OFtks4UPPNlnnBmfqe', 'client', 'default_avatar.png', '2023-04-05 09:24:43', '2023-04-05 10:11:11'),
(4, 'toto', 'lionlion@gmail.com', '$2y$10$YJFMXLWrZsaD94aWPXgjSOmL.d8gEWAYlCQWqdQIkyB0S6DwJ3fAK', 'administrateur', 'default_avatar.png', '2023-04-24 20:35:32', NULL),
(5, 'test01', 'test01@gmail.com', '$2y$10$8495qKAlaZYQJcol2dzCyueMXcoc/mzqk0rQOmowRYtJHh/QRfsDC', 'administrateur', 'default_avatar.png', '2023-04-27 04:47:19', NULL),
(9, 'User1', 'user1@gmail.com', '$2y$10$KxU6JFoD/JPf04WACezFMu/mEk64cnGDNmYkBWCs8qfFiMP7UCyN.', 'client', 'default_avatar.png', '2023-05-08 20:07:21', NULL),
(10, 'User2', 'user2@gmail.com', '$2y$10$GsLhvluVYy5PJCDQ6CQ61eW5I8VM5lZ/Ilz4ndS62aebM1lImJD2O', 'client', 'default_avatar.png', '2023-05-08 20:07:31', NULL),
(11, 'User3', 'user3@gmail.com', '$2y$10$Nn0J0oBCN/RzsBH0f9AbRu3GrXR.lFFHACM/g0X2VQde0UOqIHMD.', 'client', 'default_avatar.png', '2023-05-08 20:07:41', NULL),
(12, 'User4', 'user4@gmail.com', '$2y$10$CHRdZw/ucMDB4GviCseOfet0ZivMbIccPA0TAvo6XOEITK07NYKYa', 'client', 'default_avatar.png', '2023-05-08 20:09:03', NULL),
(13, 'User5', 'user5@gmail.com', '$2y$10$GUEFtpBXRYfp5nvQIG1ljOj9QIG4/8cGw/rZ7pGWhI3pjS6qCqX6q', 'client', 'default_avatar.png', '2023-05-08 20:10:31', NULL),
(14, 'User6', 'user6@gmail.com', '$2y$10$iTVsGp3SE0FuOY0IXwHBbeOmAUjUJwkAkj1ZoaSzwS4QXamcPawYO', 'client', 'default_avatar.png', '2023-05-08 20:10:37', NULL),
(15, 'User7', 'user7@gmail.com', '$2y$10$/yDBVr/0bWoy3.K0i76O4.xRTWTfEODwTVJ5nEX6/jGqx7YKBwUWe', 'administrateur', 'default_avatar.png', '2023-05-08 20:10:45', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
