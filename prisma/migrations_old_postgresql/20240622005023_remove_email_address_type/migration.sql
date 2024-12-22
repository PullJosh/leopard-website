/*
  Warnings:

  - You are about to drop the column `type` on the `EmailAddress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailAddress" DROP COLUMN "type";

-- DropEnum
DROP TYPE "EmailAddressType";
