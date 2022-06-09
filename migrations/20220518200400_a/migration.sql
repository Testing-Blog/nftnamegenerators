-- AlterTable
ALTER TABLE `settings` ADD COLUMN `isRazorpay` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `razorpayPublicKey` VARCHAR(191) NULL;
