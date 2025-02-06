-- CreateEnum
CREATE TYPE "statusEnum" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "status" "statusEnum" NOT NULL DEFAULT 'ACTIVE';
