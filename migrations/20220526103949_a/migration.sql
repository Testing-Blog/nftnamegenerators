-- AlterTable
ALTER TABLE `settings` ADD COLUMN `isFacebook` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isGithub` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isGoogle` BOOLEAN NOT NULL DEFAULT false;
