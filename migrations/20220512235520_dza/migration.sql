/*
  Warnings:

  - You are about to drop the column `paypalMetamaskAddress` on the `settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `settings` DROP COLUMN `paypalMetamaskAddress`,
    ADD COLUMN `metamaskAddress` VARCHAR(191) NULL;
