-- AlterTable
ALTER TABLE `contactpage` ADD COLUMN `buttonText` VARCHAR(191) NOT NULL DEFAULT 'Send a Message',
    ADD COLUMN `emailPlaceholder` VARCHAR(191) NOT NULL DEFAULT 'Your email',
    ADD COLUMN `messagePlaceholder` VARCHAR(191) NOT NULL DEFAULT 'Your message',
    ADD COLUMN `namePlaceholder` VARCHAR(191) NOT NULL DEFAULT 'Your name',
    MODIFY `subtitle` VARCHAR(191) NOT NULL DEFAULT 'Contact us',
    MODIFY `title` VARCHAR(191) NOT NULL DEFAULT 'How can we help you?',
    MODIFY `paragraph` VARCHAR(191) NOT NULL DEFAULT 'Feel like getting in touch? Contact the customer support below.';

-- AlterTable
ALTER TABLE `privacypage` MODIFY `title` VARCHAR(191) NOT NULL DEFAULT 'Privacy Policy';

-- AlterTable
ALTER TABLE `termspage` MODIFY `title` VARCHAR(191) NOT NULL DEFAULT 'Terms and Services';
