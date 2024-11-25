-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Template" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "proj_name" TEXT,
    "quote_num" TEXT,
    "contact_name" TEXT,
    "delivery_phone" TEXT,
    "contact_email" TEXT,
    "deliv_date" TEXT,
    "acc_num" TEXT,
    "address" TEXT,
    "lot_block" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT
);
INSERT INTO "new_Template" ("acc_num", "address", "city", "contact_email", "contact_name", "deliv_date", "delivery_phone", "id", "lot_block", "name", "proj_name", "quote_num", "state", "zip") SELECT "acc_num", "address", "city", "contact_email", "contact_name", "deliv_date", "delivery_phone", "id", "lot_block", "name", "proj_name", "quote_num", "state", "zip" FROM "Template";
DROP TABLE "Template";
ALTER TABLE "new_Template" RENAME TO "Template";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
