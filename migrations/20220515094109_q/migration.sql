-- AlterTable
ALTER TABLE `settings` ADD COLUMN `isStripe` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `stripePublishableKey` VARCHAR(191) NULL,
    ADD COLUMN `stripeSecretKey` VARCHAR(191) NULL;
