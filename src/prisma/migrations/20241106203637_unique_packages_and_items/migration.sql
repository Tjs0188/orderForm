/*
  Warnings:

  - A unique constraint covering the columns `[product_number,category,description]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Package` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,meta,category]` on the table `Package` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Item_product_number_category_description_key" ON "Item"("product_number", "category", "description");

-- CreateIndex
CREATE UNIQUE INDEX "Package_name_key" ON "Package"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Package_name_meta_category_key" ON "Package"("name", "meta", "category");
