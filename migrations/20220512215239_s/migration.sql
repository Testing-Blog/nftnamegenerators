-- CreateTable
CREATE TABLE `Plan` (
    `id` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `assetsNumber` DOUBLE NOT NULL,
    `features` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(191) NOT NULL,
    `planId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Settings` (
    `id` VARCHAR(191) NOT NULL,
    `businessName` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'USD',
    `smtpEmail` VARCHAR(191) NULL,
    `smtpPassword` VARCHAR(191) NULL,
    `smtpHost` VARCHAR(191) NULL DEFAULT 'smtp.gmail.com',
    `smtpPort` INTEGER NULL DEFAULT 465,
    `downloadedFileName` VARCHAR(191) NOT NULL DEFAULT 'file',
    `githubId` VARCHAR(191) NULL,
    `githubSecret` VARCHAR(191) NULL,
    `googleId` VARCHAR(191) NULL,
    `googleSecret` VARCHAR(191) NULL,
    `databaseUrl` VARCHAR(191) NULL,
    `paypalClientId` VARCHAR(191) NULL,
    `paypalMetamaskAddress` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
