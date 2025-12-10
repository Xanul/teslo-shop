/*
  Warnings:

  - Added the required column `alias` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."UserAddress_userId_key";

-- AlterTable
ALTER TABLE "UserAddress" ADD COLUMN     "alias" TEXT NOT NULL,
ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "UserAddress_userId_idx" ON "UserAddress"("userId");
