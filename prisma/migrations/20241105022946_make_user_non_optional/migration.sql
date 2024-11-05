/*
  Warnings:

  - Made the column `userId` on table `OrderHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderData" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "OrderHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderHistory" ("createdAt", "id", "orderData", "userId") SELECT "createdAt", "id", "orderData", "userId" FROM "OrderHistory";
DROP TABLE "OrderHistory";
ALTER TABLE "new_OrderHistory" RENAME TO "OrderHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
