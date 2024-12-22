/*
  Warnings:

  - A unique constraint covering the columns `[verificationToken]` on the table `EmailAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmailAddress_verificationToken_key" ON "EmailAddress"("verificationToken");
