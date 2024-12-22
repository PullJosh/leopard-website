/*
  Warnings:

  - You are about to drop the column `emailId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserEmail` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EmailAddressType" AS ENUM ('PRIMARY', 'PARENT');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_emailId_fkey";

-- DropIndex
DROP INDEX "User_emailId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailId";

-- DropTable
DROP TABLE "UserEmail";

-- CreateTable
CREATE TABLE "EmailAddress" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "EmailAddressType" NOT NULL DEFAULT 'PRIMARY',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "verificationToken" TEXT,
    "verificationSentAt" TIMESTAMP(3),

    CONSTRAINT "EmailAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmailAddress" ADD CONSTRAINT "EmailAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
