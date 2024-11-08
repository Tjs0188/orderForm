/*
  Warnings:

  - A unique constraint covering the columns `[package_id,item_id]` on the table `PackageItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PackageItem_package_id_item_id_key" ON "PackageItem"("package_id", "item_id");
