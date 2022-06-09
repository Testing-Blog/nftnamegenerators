-- AlterTable
ALTER TABLE `settings` ADD COLUMN `isMetamask` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isPaypal` BOOLEAN NOT NULL DEFAULT false;
