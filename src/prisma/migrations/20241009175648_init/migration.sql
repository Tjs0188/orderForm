-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "product_number" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Package" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "meta" TEXT NOT NULL,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PackageItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "package_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,
    CONSTRAINT "PackageItem_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PackageItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Template" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "proj_name" TEXT NOT NULL,
    "quote_num" TEXT NOT NULL,
    "contact_name" TEXT NOT NULL,
    "delivery_phone" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "deliv_date" TEXT NOT NULL,
    "acc_num" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lot_block" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL
);
