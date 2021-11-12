/*
  Warnings:

  - You are about to drop the column `Phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `Phone`,
    DROP COLUMN `Status`,
    ADD COLUMN `phone` INTEGER NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `name` VARCHAR(191) NOT NULL;
