-- CreateTable
CREATE TABLE `Page404` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT 'Oops!',
    `paragraph` VARCHAR(191) NOT NULL DEFAULT 'There’s nothing here, but if you feel this is an error please let us know.',
    `buttonText` VARCHAR(191) NOT NULL DEFAULT 'Go Back To Home Page',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
