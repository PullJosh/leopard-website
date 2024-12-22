/*
  Warnings:

  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.

  - ^ MANUAL CHANGE! Manually changed the migration to rename the column instead of dropping and adding it.

*/
-- AlterTable
ALTER TABLE "Project"
RENAME COLUMN "name" TO "title";
