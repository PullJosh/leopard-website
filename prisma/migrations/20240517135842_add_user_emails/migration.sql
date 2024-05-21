/*
  Warnings:

  - A unique constraint covering the columns `[emailId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserEmail" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "verificationToken" TEXT,
    "verificationSentAt" TIMESTAMP(3),

    CONSTRAINT "UserEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserEmail_address_key" ON "UserEmail"("address");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailId_key" ON "User"("emailId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "UserEmail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
