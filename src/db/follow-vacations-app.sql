-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2024 at 11:35 PM
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
-- Database: `follow-vacations-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `following`
--

CREATE TABLE `following` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vocation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `following`
--

INSERT INTO `following` (`id`, `user_id`, `vocation_id`) VALUES
(22, 5, 14),
(30, 5, 15),
(36, 3, 14),
(38, 15, 15),
(41, 1, 14),
(43, 11, 15),
(44, 11, 14),
(50, 16, 19),
(53, 16, 15),
(54, 16, 16),
(55, 16, 14),
(56, 19, 20),
(57, 19, 14),
(58, 19, 18),
(59, 16, 21),
(61, 16, 17),
(62, 16, 23),
(64, 20, 22),
(65, 20, 21),
(66, 20, 24),
(67, 20, 17),
(68, 20, 16),
(70, 20, 14),
(71, 16, 29),
(72, 16, 25),
(73, 21, 22),
(74, 21, 27),
(75, 21, 14),
(76, 21, 29),
(77, 21, 24),
(78, 21, 31),
(79, 22, 19),
(81, 24, 19),
(82, 24, 15),
(83, 24, 17),
(84, 24, 23),
(86, 16, 28),
(87, 1, 20),
(88, 1, 15),
(89, 30, 22),
(90, 30, 34),
(91, 30, 14),
(92, 30, 21),
(101, 32, 16),
(102, 33, 16),
(103, 33, 20),
(104, 33, 28),
(105, 33, 14),
(106, 33, 35),
(107, 33, 22),
(108, 33, 36),
(109, 33, 37),
(110, 33, 34),
(111, 16, 38);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(225) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `token` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `token`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', 'password123', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsInRva2VuIjpudWxsfSwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzIxMjg4MTN9.ziH-SvEN1O5jM-t4aKBz-2ziO55nkjonCSNU9r5w4io'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', 'password456', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdF9uYW1lIjoiSmFuZSIsImxhc3RfbmFtZSI6IlNtaXRoIiwiZW1haWwiOiJqYW5lLnNtaXRoQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwidG9rZW4iOm51bGx9LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzIxMzEyMDZ9.Mo1pwg7tpJtu8T6vekuutiwUcVd6dCac4sS-k9n6pRQ'),
(3, 'Alice', 'Brown', 'alice.brown@example.com', 'password789', 'user', NULL),
(5, 'Tzipi', 'Farbstein', 'Farbstein@gmail.com', '1245', 'user', NULL),
(11, 'Ruti', 'Levi', '2020@gmail.com', '1234', 'user', NULL),
(15, 'Meir', 'Boy', 'mb12@gmail.com', '1234', 'user', NULL),
(16, 'Gedalya', 'Farbstein', 'simi220@gmail.com', '3312', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNiwiZmlyc3RfbmFtZSI6IkdlZGFseWEiLCJsYXN0X25hbWUiOiJGYXJic3RlaW4iLCJlbWFpbCI6InNpbWkyMjBAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJ0b2tlbiI6bnVsbH0sInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMyMDQyMzQzfQ.g2noHUu1eL4xULgDlLH4u-fWKh1O5DDAHBCjIiluY5A'),
(19, 'Yehudit', 'Arhel', 'ya123@gmail.com', 'ya123', 'user', NULL),
(20, 'Leah', 'Goor', 'leahgoor@gmail.com', '0987', 'user', NULL),
(21, 'Moshe', 'Cohen', 'mccn@gmail.com', '4567', 'user', NULL),
(22, 'ori', 'brook', 'ori@gmail.com', '1234', 'user', NULL),
(24, 'shaina', 'Farbstein', '1234@gmail.com', 'qwer', 'user', NULL),
(30, 'Shani', 'Lev', 'shani098@gmail.com', 'shani', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMCwiZmlyc3RfbmFtZSI6IlNoYW5pIiwibGFzdF9uYW1lIjoiTGV2IiwiZW1haWwiOiJzaGFuaTA5OEBnbWFpbC5jb20ifSwiaWF0IjoxNzMyMjA5MzU4fQ.6uloh-EhXQKTMNqR39thb8CecSG8TFWrIny8fmHD2I0'),
(31, 'מאיר', 'שיינברג', '123123@gmail.com', '4567', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMSwiZmlyc3RfbmFtZSI6Itee15DXmdeoIiwibGFzdF9uYW1lIjoi16nXmdeZ16DXkdeo15IiLCJlbWFpbCI6IjEyMzEyM0BnbWFpbC5jb20ifSwiaWF0IjoxNzMyMjEwMTYzfQ.8Io9tW0WEzTy3XAllFdnMaNylqskfWkG4l6v22BpvcE'),
(32, 'Mor', 'Limon', 'ml@outlook.com', '0912', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMiwiZmlyc3RfbmFtZSI6Ik1vciIsImxhc3RfbmFtZSI6IkxpbW9uIiwiZW1haWwiOiJtbEBvdXRsb29rLmNvbSJ9LCJpYXQiOjE3MzI2MTI2NzZ9.HRtB0n36piekEIlhYY8ISn0lEpWn4gFYASD1eZ3plhI'),
(33, 'Michi', 'Lopi', 'mlice@gmail.com', 'mlice', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMywiZmlyc3RfbmFtZSI6Ik1pY2hpIiwibGFzdF9uYW1lIjoiTG9waSIsImVtYWlsIjoibWxpY2VAZ21haWwuY29tIn0sImlhdCI6MTczMjgyMjY3Mn0.qEpFn1ggixx91ebCRqk3PAYiey2eXDdHUvJfPzRMFHQ');

-- --------------------------------------------------------

--
-- Table structure for table `vocation`
--

CREATE TABLE `vocation` (
  `id` int(11) NOT NULL,
  `destination` varchar(225) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `start_vocation` date NOT NULL,
  `end_vocation` date NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `url_image` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vocation`
--

INSERT INTO `vocation` (`id`, `destination`, `description`, `start_vocation`, `end_vocation`, `price`, `url_image`) VALUES
(14, 'Vienna', 'Explore the historic city of Vienna, full of culture and music.', '2024-11-10', '2024-11-20', 1800.00, 'cityscape-with-ancient-cathedral.jpg'),
(15, 'Israel', 'Visit the holy land and explore ancient cities.', '2024-10-05', '2024-10-20', 2000.00, 'jewish-people-praying-jerusalem-s-western-wall.jpg'),
(16, 'San Francisco', 'A trip to San Francisco, with visits to the Golden Gate Bridge.', '2024-09-25', '2024-10-05', 2200.00, 'aerial-shot-golden-gate-bridge-beautiful-sunset.jpg'),
(17, 'Denmark', 'A beautiful vacation in the Swiss Alps with skiing and hiking.', '2024-11-19', '2024-12-17', 500.00, 'high-angle-shot-small-houses-by-sea-kragero-telemark-norway.jpg'),
(18, 'France', 'Explore the historic city of Vienna, full of culture and music.', '2024-12-31', '2025-01-11', 1800.00, 'eiffel-tower-champ-de-mars-paris-france.jpg'),
(19, 'Dubai', 'Visit the holy land and explore ancient cities.', '2024-08-01', '2024-08-24', 2000.00, 'vertical-view-skyscrapers-palm-trees-dubai-uae.jpg'),
(20, 'Eilat', 'A trip to San Francisco, with visits to the Golden Gate Bridge.', '2024-09-18', '2024-10-05', 2200.00, 'beautiful-shot-fortica-blue-cloudy-sky-miskovici-croatia.jpg'),
(21, 'Tokyo', 'Experience the vibrant culture and delicious cuisine of Tokyo.', '2024-10-15', '2024-10-30', 3000.00, 'modern-exterior-urban-view.jpg'),
(22, 'Barcelona', 'Enjoy the stunning architecture and beaches of Barcelona.', '2024-11-22', '2024-11-27', 2100.00, '5cc5ddca-1a3c-42a5-b77d-27f8761c0ef6.jpg'),
(23, 'New York', 'Explore the iconic landmarks of New York City.', '2024-11-01', '2024-11-10', 2800.00, 'aerial-shot-beautiful-cityscape-brazil.jpg'),
(24, 'Rome', 'Discover the rich history and art of Rome.', '2024-11-20', '2024-12-01', 2300.00, 'ancient-ruins-roman-forum-foro-romano-sunsrise-rome-italy-view-from-capitoline-hill.jpg'),
(25, 'Sdom', 'fjdkfajfkdjfkdasjf kadjf kdjf kdh sksadf k', '2024-11-25', '2024-12-02', 300.00, '49a2c6e6-672b-405f-8456-50720b2d5398.jpg'),
(27, 'Machu Picchu', 'An ancient Incan city set high in the Andes Mountains, offering breathtaking views and rich history.', '2024-11-01', '2024-11-08', 9000.00, '42c561f0-8d1d-45ef-83fa-61eda745b6d4.jpg'),
(28, 'Root', 'stam makom, lo behmet mashehu hamiti!', '2024-11-05', '2024-11-25', 444.00, '4fc671a5-7519-43dd-bb10-6a9cb854232a.jpg'),
(29, 'Ye or No?', 'lets check it...', '2024-11-30', '2024-12-30', 1227.00, '953031fd-2034-42f7-9cdc-ce65e17018e6.jpg'),
(31, 'Try', 'To send new vacation whithout picture', '2024-10-30', '2024-10-31', 100.00, 'd3912182-2844-4ab0-aca1-b17cf854e3d7.jpg'),
(32, 'Lodahat', 'kjfka dsjfk dasjfka fjjdjsahf dsasjhf jdasfh jsadfdfkfhds jshfj dsashfjda hf ajdfh jdsashf jsdahfjhjd sfhsja fjdasfh jsdahf;asdfe', '2024-11-29', '2024-12-12', 500.00, 'c0cb2b26-cabc-43c3-9aa0-f9c69ddcfc02.jpg'),
(34, 'Zfat Hahatika', 'An old city in IL addd rehidat hadama twice and people still like to visit their.', '2024-11-21', '2024-11-29', 1234.00, '596db74e-db63-4767-b3f5-6a9d3fef1784.JPG'),
(35, 'My home', 'someWere you like to be there...', '2024-12-23', '2024-12-28', 345.00, '096a8a65-234c-4268-a86d-9cf52d84ab96.jpg'),
(36, 'Mount Huashan', 'Mount Huashan has five main peaks, each with spiritual significance, and is famous for its steep, narrow paths, including the \"Plank Walk\" where hikers walk on wooden boards attached to the cliffs.\r\nThe mountain offers breathtaking views, ancient temples, and an adventurous experience for those who love hiking and nature.', '2024-12-01', '2024-12-07', 45.00, '85e47606-4cc2-44c1-baa4-c2615f6690a2.jpg'),
(37, 'Liechtenstein ', 'Liechtenstein is a small, mountainous country between Switzerland and Austria. It offers stunning landscapes, hiking opportunities, and charming villages. The capital, Vaduz, is home to the Prince\'s Palace. Visitors can explore the Liechtenstein Museum of Art, enjoy winter sports, and experience the country\'s natural beauty. It\'s a peaceful destination for those seeking a scenic and cultural escape.', '2025-01-01', '2025-01-28', 765.00, '6ad33c8d-3438-450c-8531-153945f5e982.jpg'),
(38, 'SomeWhere', 'hjfhjdfha jhf jadhf ajfhj dshfj hsd fjdhsjfh jasdhfjdsahfj dsahfj ashfljdahfljahsjfhdjhf jsdhf jashf jahsf kjalhsdfjhasjfhjsahfjsd', '2025-01-28', '2025-02-08', 900.00, '49b1db8a-f1ae-47a4-a05a-5e1bf4c8e76c.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `following`
--
ALTER TABLE `following`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `vocation_id` (`vocation_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vocation`
--
ALTER TABLE `vocation`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `following`
--
ALTER TABLE `following`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `vocation`
--
ALTER TABLE `vocation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `following`
--
ALTER TABLE `following`
  ADD CONSTRAINT `following_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `following_ibfk_2` FOREIGN KEY (`vocation_id`) REFERENCES `vocation` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
