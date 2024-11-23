-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PackageItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "package_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,
    CONSTRAINT "PackageItem_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PackageItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PackageItem" ("id", "item_id", "package_id", "priority") SELECT "id", "item_id", "package_id", "priority" FROM "PackageItem";
DROP TABLE "PackageItem";
ALTER TABLE "new_PackageItem" RENAME TO "PackageItem";
CREATE UNIQUE INDEX "PackageItem_package_id_item_id_key" ON "PackageItem"("package_id", "item_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
