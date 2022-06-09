-- AlterTable
ALTER TABLE `privacypage` MODIFY `content` VARCHAR(60000) NOT NULL;

-- AlterTable
ALTER TABLE `termspage` MODIFY `content` VARCHAR(60000) NOT NULL;

-- CreateTable
CREATE TABLE `Collection` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `width` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `network` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NULL,
    `sellerFeeBasisPoints` DOUBLE NULL,
    `externalUrl` VARCHAR(191) NULL,
    `creators` VARCHAR(191) NULL,
    `layers` VARCHAR(65000) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Collection` ADD CONSTRAINT `Collection_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
