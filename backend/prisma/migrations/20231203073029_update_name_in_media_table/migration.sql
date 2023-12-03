/*
  Warnings:

  - You are about to drop the column `file_name` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Media` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Media` DROP COLUMN `file_name`,
    DROP COLUMN `name`,
    ADD COLUMN `filename` VARCHAR(191) NOT NULL;
