/*
  Warnings:

  - Made the column `usingVideo` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "membershipDuration" SET DATA TYPE TEXT,
ALTER COLUMN "usingVideo" SET NOT NULL;
