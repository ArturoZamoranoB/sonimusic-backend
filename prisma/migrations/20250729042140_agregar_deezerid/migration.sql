/*
  Warnings:

  - A unique constraint covering the columns `[deezerId]` on the table `Cancion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deezerId` to the `Cancion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cancion" ADD COLUMN     "deezerId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cancion_deezerId_key" ON "Cancion"("deezerId");
