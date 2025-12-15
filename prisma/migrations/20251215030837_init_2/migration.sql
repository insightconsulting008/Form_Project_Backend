/*
  Warnings:

  - You are about to drop the column `options` on the `FormField` table. All the data in the column will be lost.
  - You are about to drop the column `placeholder` on the `FormField` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `FormField` table. All the data in the column will be lost.
  - The primary key for the `FormResponse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FormResponse` table. All the data in the column will be lost.
  - You are about to drop the column `placeholder` on the `MasterField` table. All the data in the column will be lost.
  - The primary key for the `ResponseValue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ResponseValue` table. All the data in the column will be lost.
  - You are about to drop the column `responseId` on the `ResponseValue` table. All the data in the column will be lost.
  - The `value` column on the `ResponseValue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `order` to the `FormField` table without a default value. This is not possible if the table is not empty.
  - The required column `formResponseId` was added to the `FormResponse` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `formResponseId` to the `ResponseValue` table without a default value. This is not possible if the table is not empty.
  - The required column `responseValueId` was added to the `ResponseValue` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "ResponseValue" DROP CONSTRAINT "ResponseValue_responseId_fkey";

-- AlterTable
ALTER TABLE "FormField" DROP COLUMN "options",
DROP COLUMN "placeholder",
DROP COLUMN "type",
ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FormResponse" DROP CONSTRAINT "FormResponse_pkey",
DROP COLUMN "id",
ADD COLUMN     "formResponseId" TEXT NOT NULL,
ADD CONSTRAINT "FormResponse_pkey" PRIMARY KEY ("formResponseId");

-- AlterTable
ALTER TABLE "MasterField" DROP COLUMN "placeholder";

-- AlterTable
ALTER TABLE "ResponseValue" DROP CONSTRAINT "ResponseValue_pkey",
DROP COLUMN "id",
DROP COLUMN "responseId",
ADD COLUMN     "formResponseId" TEXT NOT NULL,
ADD COLUMN     "responseValueId" TEXT NOT NULL,
DROP COLUMN "value",
ADD COLUMN     "value" JSONB,
ADD CONSTRAINT "ResponseValue_pkey" PRIMARY KEY ("responseValueId");

-- AddForeignKey
ALTER TABLE "ResponseValue" ADD CONSTRAINT "ResponseValue_formResponseId_fkey" FOREIGN KEY ("formResponseId") REFERENCES "FormResponse"("formResponseId") ON DELETE RESTRICT ON UPDATE CASCADE;
