/*
  Warnings:

  - You are about to drop the `collection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `collection` DROP FOREIGN KEY `Collection_userId_fkey`;

-- AlterTable
ALTER TABLE `privacypage` MODIFY `content` VARCHAR(60000) NOT NULL;

-- AlterTable
ALTER TABLE `termspage` MODIFY `content` VARCHAR(60000) NOT NULL;

-- DropTable
DROP TABLE `collection`;
