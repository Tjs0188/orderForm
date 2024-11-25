-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PackageItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "package_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL
);
INSERT INTO "new_PackageItem" ("id", "item_id", "package_id", "priority") SELECT "id", "item_id", "package_id", "priority" FROM "PackageItem";
DROP TABLE "PackageItem";
ALTER TABLE "new_PackageItem" RENAME TO "PackageItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
