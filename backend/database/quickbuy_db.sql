-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2025 at 07:04 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quickbuy_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('customer','seller','admin') NOT NULL,
  `shop_name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `shop_name`, `created_at`) VALUES
(1, 'jake', 'jake@gmail.com', '$2b$10$6TXM3OEafFVVoOzdaek8JO5VRjhj4rYC4m/GYp8FE3XToIb0rT/2i', 'admin', NULL, '2025-03-03 11:57:23'),
(2, 'jake1', 'jakevin@gmail.com', '$2b$10$IP5.dUCQ197OHU8ANSPGoOYFQ6YtXaCx8vp67bghxyyvkOJNJE5qa', 'customer', NULL, '2025-03-03 12:02:33'),
(3, 'jake2', 'jake@g.com', '$2b$10$wI/2HFq9s8.T3SHmzZ9qvu3QJOfuzH7imW.SFzV4jFLh2ZfbJs1iC', 'seller', 'ja', '2025-03-04 04:34:10'),
(4, 'jake3', 'j@gmail.com', '$2b$10$0XAhx7T.h8Rlef7FtdQcZu8wAktoLqiLfbekO.PyWuyjXSD0Wo/BK', 'seller', 'flower', '2025-03-04 11:38:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
