-- CreateTable
CREATE TABLE `MetaTags` (
    `id` VARCHAR(191) NOT NULL,
    `ogType` VARCHAR(191) NOT NULL,
    `ogTitle` VARCHAR(191) NOT NULL,
    `ogDesc` VARCHAR(191) NOT NULL,
    `ogUrl` VARCHAR(191) NOT NULL,
    `twitterTitle` VARCHAR(191) NOT NULL,
    `twitterDesc` VARCHAR(191) NOT NULL,
    `twitterSite` VARCHAR(191) NOT NULL,
    `twitterCreator` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `keywords` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
