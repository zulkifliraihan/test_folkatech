/*
  Warnings:

  - You are about to alter the column `size` on the `Media` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Media` MODIFY `size` INTEGER NOT NULL;
