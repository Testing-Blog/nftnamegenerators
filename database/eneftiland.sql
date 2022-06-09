-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2022 at 03:36 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eneftiland`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `providerAccountId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refresh_token` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_token` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expires_at` int(11) DEFAULT NULL,
  `token_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scope` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_token` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `session_state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `userId`, `type`, `provider`, `providerAccountId`, `refresh_token`, `access_token`, `expires_at`, `token_type`, `scope`, `id_token`, `session_state`) VALUES
('cl3wy9lxb0462mwv2wllzhmts', 'cl3wy9lx20454mwv29w8ppxo8', 'credentials', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contactpage`
--

CREATE TABLE `contactpage` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Contact us',
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'How can we help you?',
  `paragraph` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Feel like getting in touch? Contact the customer support below.',
  `buttonText` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Send a Message',
  `emailPlaceholder` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Your email',
  `messagePlaceholder` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Your message',
  `namePlaceholder` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Your name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `generatorpage`
--

CREATE TABLE `generatorpage` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `downloadedFileName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'file'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `metatags`
--

CREATE TABLE `metatags` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ogType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ogTitle` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ogDesc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ogUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitterTitle` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitterDesc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitterSite` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitterCreator` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `assetsNumber` double NOT NULL,
  `features` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `watermark` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `privacypage`
--

CREATE TABLE `privacypage` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Privacy Policy',
  `content` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sessionToken` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `businessName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USD',
  `smtpEmail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `smtpPassword` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `smtpHost` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'smtp.gmail.com',
  `smtpPort` int(11) DEFAULT 465,
  `githubId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `githubSecret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `googleId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `googleSecret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paypalClientId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `metamaskAddress` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `googleAnalyticsTrackingCode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebookId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebookSecret` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isMetamask` tinyint(1) NOT NULL DEFAULT 0,
  `isPaypal` tinyint(1) NOT NULL DEFAULT 0,
  `isStripe` tinyint(1) NOT NULL DEFAULT 0,
  `stripePublishableKey` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripeSecretKey` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `watermarkText` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'watermark',
  `isRazorpay` tinyint(1) NOT NULL DEFAULT 0,
  `razorpayPublicKey` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isFacebook` tinyint(1) NOT NULL DEFAULT 0,
  `isGithub` tinyint(1) NOT NULL DEFAULT 0,
  `isGoogle` tinyint(1) NOT NULL DEFAULT 0,
  `isMetamaskAuth` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `termspage`
--

CREATE TABLE `termspage` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Terms and Services',
  `content` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `network` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paidAmount` double NOT NULL,
  `paymentMethod` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentCurrency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateCreated` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `metamaskAddress` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `emailVerified`, `image`, `role`, `password`, `metamaskAddress`) VALUES
('cl3wy9lx20454mwv29w8ppxo8', 'Super Admin', 'super-admin@email.com', NULL, NULL, 'superAdmin', '$2a$10$l7DvfYc3X3TjBcR5bCVW6OVeB3BDUX4AdvwKULYRG0wNvKYuaD4u6', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `verificationtoken`
--

CREATE TABLE `verificationtoken` (
  `identifier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  ADD KEY `Account_userId_fkey` (`userId`);

--
-- Indexes for table `contactpage`
--
ALTER TABLE `contactpage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generatorpage`
--
ALTER TABLE `generatorpage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `metatags`
--
ALTER TABLE `metatags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Plan_price_key` (`price`),
  ADD UNIQUE KEY `Plan_assetsNumber_key` (`assetsNumber`);

--
-- Indexes for table `privacypage`
--
ALTER TABLE `privacypage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  ADD KEY `Session_userId_fkey` (`userId`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `termspage`
--
ALTER TABLE `termspage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Transaction_userId_fkey` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `verificationtoken`
--
ALTER TABLE `verificationtoken`
  ADD UNIQUE KEY `VerificationToken_token_key` (`token`),
  ADD UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`,`token`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
