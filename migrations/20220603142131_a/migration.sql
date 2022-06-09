-- AlterTable
ALTER TABLE `privacypage` MODIFY `content` VARCHAR(60000) NOT NULL;

-- AlterTable
ALTER TABLE `settings` MODIFY `smtpPort` VARCHAR(191) NULL DEFAULT '465';

-- AlterTable
ALTER TABLE `termspage` MODIFY `content` VARCHAR(60000) NOT NULL;
