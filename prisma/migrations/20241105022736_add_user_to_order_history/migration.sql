-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderData" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    CONSTRAINT "OrderHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_OrderHistory" ("createdAt", "id", "orderData") SELECT "createdAt", "id", "orderData" FROM "OrderHistory";
DROP TABLE "OrderHistory";
ALTER TABLE "new_OrderHistory" RENAME TO "OrderHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
