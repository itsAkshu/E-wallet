-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2023 at 10:30 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ewallet`
--

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `amount` int(5) NOT NULL,
  `details` varchar(255) NOT NULL,
  `type` varchar(2) NOT NULL,
  `wallet` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `phone`, `amount`, `details`, `type`, `wallet`, `created_at`) VALUES
(1, '8637834758', 50, 'New Acc Created', 'CR', 50, '2023-07-31 08:12:58'),
(2, '1234567890', 50, 'New Acc Created', 'CR', 50, '2023-07-31 08:15:38'),
(4, '2222222222', 50, 'New Acc Created', 'CR', 50, '2023-08-02 07:19:15'),
(5, '2222222222', 20, 'test', 'DR', 30, '2023-08-02 08:28:27'),
(6, '2222222222', 100, 'money added successfully from acc 645765675885', 'CR', 130, '2023-08-02 08:02:04'),
(8, '2222222222', 40, 'money sended successfully to acc 8637834758 test', 'DR', 90, '2023-08-02 08:28:12'),
(9, '8637834758', 40, 'money added successfully from acc 2222222222 test', 'CR', 90, '2023-08-02 08:28:14'),
(10, '2222222222', 20, 'money sended successfully to acc 8637834758 test2', 'DR', 70, '2023-08-02 08:28:17'),
(11, '8637834758', 20, 'money added successfully from acc 2222222222 test2', 'CR', 110, '2023-08-02 08:28:20'),
(12, '8637834758', 110, 'money sended successfully to acc 2222222222 TEST3', 'DR', 0, '2023-08-03 07:19:13'),
(13, '2222222222', 110, 'money added successfully from acc 8637834758 TEST3', 'CR', 180, '2023-08-03 07:19:16'),
(14, '2222222222', 60, 'electric bill recharge successfully to consumerid 546787897979 provider-WBSEDCL', 'DR', 120, '2023-08-03 07:36:55'),
(15, '2222222222', 20, 'mobile recharge successfully to mobile 9051568753 provider-Airtel', 'DR', 100, '2023-08-03 07:40:01'),
(16, '2222222222', 100, 'movie ticket book successfully movie name- Dhoom1 theater-Bioscope no of ticket-2 date-2023-08-04 time-4:50PM', 'DR', 0, '2023-08-03 08:25:38');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `phone`, `password`, `created_at`) VALUES
(1, 'Krishna', '8637834758', '2222', '2023-07-31 08:12:58'),
(2, 'Deepak', '1234567890', '2222', '2023-07-31 08:15:38'),
(3, 'sumanta', '2222222222', '2222', '2023-08-02 07:19:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
