-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2024 at 07:10 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medlocator`
--

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`id`, `name`, `description`) VALUES
(1, 'Aspirin', 'A pain reliever and anti-inflammatory medication commonly used to treat headaches, muscle pain, and arthritis.'),
(2, 'Paracetamol', 'A widely used over-the-counter pain reliever and fever reducer.'),
(3, 'Ibuprofen', 'A nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation.'),
(4, 'Amoxicillin', 'An antibiotic used to treat a wide variety of bacterial infections.'),
(5, 'Ciprofloxacin', 'An antibiotic used to treat a variety of bacterial infections, including respiratory and urinary tract infections.'),
(6, 'Metformin', 'A medication used to treat type 2 diabetes by helping to control blood sugar levels.'),
(7, 'Simvastatin', 'A medication used to lower cholesterol and reduce the risk of heart disease.'),
(8, 'Omeprazole', 'A proton pump inhibitor used to treat gastroesophageal reflux disease (GERD) and other stomach acid-related conditions.'),
(9, 'Lisinopril', 'An angiotensin-converting enzyme (ACE) inhibitor used to treat high blood pressure and heart failure.'),
(10, 'Amlodipine', 'A calcium channel blocker used to treat high blood pressure and angina (chest pain).'),
(11, 'Metoprolol', 'A beta-blocker used to treat high blood pressure, chest pain, and heart failure.'),
(12, 'Losartan', 'An angiotensin II receptor blocker (ARB) used to treat high blood pressure and protect the kidneys from damage due to diabetes.');

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `id` int(11) NOT NULL,
  `pharmacy_id` int(11) DEFAULT NULL,
  `medicine_id` int(11) DEFAULT NULL,
  `totalnumber` float NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`id`, `pharmacy_id`, `medicine_id`, `totalnumber`, `price`) VALUES
(1, 13, 2, 0, 0),
(2, 13, 4, 0, 0),
(3, 13, 8, 0, 0),
(4, 13, 10, 0, 0),
(5, 13, 2, 0, 0),
(6, 13, 1, 0, 0),
(7, 13, 9, 0, 0),
(8, 13, 12, 0, 0),
(12, 12, 11, 2, 5),
(13, 12, 2, 11, 111),
(14, 12, 4, 10, 11.2),
(15, 14, 3, 18, 32),
(16, 14, 3, 12, 14);

-- --------------------------------------------------------

--
-- Table structure for table `requestmedicine`
--

CREATE TABLE `requestmedicine` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `medicine_name` varchar(255) NOT NULL,
  `pharmacy_name` varchar(255) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requestmedicine`
--

INSERT INTO `requestmedicine` (`id`, `email`, `medicine_name`, `pharmacy_name`, `latitude`, `longitude`) VALUES
(1, 'yohannesguesh01@gmail.com', 'Paracetamol', 'yohannes', 13.4951, 39.4766),
(2, 'yohannesguesh04@gmail.com', 'Paracetamol', 'yohannes24', 22.3221, 34.2223),
(3, 'yohannesguesh04@gmail.com', 'Paracetamol', 'yohannes', 13.4823, 39.4706),
(4, 'jojojo@gmail.com', 'Paracetamol', 'yohannes', 13.4823, 39.4706),
(5, 'jojojo@gmail.com', 'Paracetamol', 'yohannes', 13.4823, 39.4706),
(6, 'jojojo@gmail.com', 'Paracetamol', 'yohannes', 13.4823, 39.4706),
(7, 'jojojo@gmail.com', 'Paracetamol', 'yohannes', 13.4823, 39.4706),
(8, 'jojojo@gmail.com', 'Paracetamol', 'yohannes', 13.4823, 39.4706),
(9, 'jojojo@gmail.com', 'Paracetamol', 'yohannes', 13.4823, 39.4706),
(10, 'jojojo@gmail.com', 'Paracetamol', 'yohannes', 13.4823, 39.4706),
(11, 'jojojo@gmail.com', 'Paracetamol', 'yohannes', 13.4823, 39.4706);

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expiry_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `verified` tinyint(1) DEFAULT 0,
  `isAdmin` tinyint(1) DEFAULT 0,
  `pharmacy` tinyint(1) DEFAULT 0,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `role`, `email`, `hashed_password`, `location`, `created_at`, `updated_at`, `verified`, `isAdmin`, `pharmacy`, `longitude`, `latitude`) VALUES
(12, 'yohannes', 'pharmacy', 'yohannesguesh01@gmail.com', '$2b$12$tiIk4t9FEsQ9wlvZUlRL1OpWBAU4o3M0hWr1kne4aOLCVQxBbV1PC', '34.22122 44.24233', '2024-05-31 17:38:10', '2024-06-06 22:09:02', 1, 1, 0, 39.4706, 13.4823),
(13, 'yohannes24', 'user', 'yohannesguesh04@gmail.com', '$2b$12$H47Tet8QCLFvF8zgOk/uweGBH0OtyvuHw493/Te4r/HdyMdDN1Wf2', '22.3221 34.22234', '2024-05-31 18:47:03', '2024-06-03 20:35:26', 0, 0, 0, 34.2223, 22.3221),
(14, 'yohanne4', 'pharmacy', 'yohannes@gmail.com', '$2b$12$9p3REWTQj03D5wPn0qo3M.suhgqXT2D6JhUPqkAxpX0VtK.M1fU5G', '13.46903879602975 39.45087969303132', '2024-06-03 07:48:38', '2024-06-06 22:08:54', 1, 0, 0, 39.4511, 13.4696),
(15, 'jojo', 'user', 'jojojo@gmail.com', '$2b$12$fyT9BTAcWl5HkH2G3QTHHOxvPjfvZUfCD9.UBDInJ/vGVvhLMjEeW', NULL, '2024-06-06 19:15:04', '2024-06-07 15:54:49', 0, 0, 0, 39.5697, 14.1277),
(17, 'yohannesGuesh', 'pharmacy', 'yohnnesguesh0101@gmail.com', '$2b$12$KXyba4DnS2ZwgViIbqWfiu/dh69eWtmnfNsrw3ASIse/A9DIi1HzS', NULL, '2024-06-07 22:18:35', '2024-06-07 22:18:35', 0, 0, 0, 39, 13.4898);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pharmacy_id` (`pharmacy_id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `requestmedicine`
--
ALTER TABLE `requestmedicine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `uc_name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `requestmedicine`
--
ALTER TABLE `requestmedicine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `medicines`
--
ALTER TABLE `medicines`
  ADD CONSTRAINT `medicines_ibfk_1` FOREIGN KEY (`pharmacy_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `medicines_ibfk_2` FOREIGN KEY (`medicine_id`) REFERENCES `medicine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
