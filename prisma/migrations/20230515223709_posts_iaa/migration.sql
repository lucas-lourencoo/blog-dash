-- AlterTable
ALTER TABLE `PostsIeducaa` MODIFY `content` VARCHAR(5000) NOT NULL,
    MODIFY `images` VARCHAR(500) NOT NULL;

-- CreateTable
CREATE TABLE `PostsIaa` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(5000) NOT NULL,
    `images` VARCHAR(500) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
