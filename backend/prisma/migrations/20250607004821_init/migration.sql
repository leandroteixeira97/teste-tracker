/*
  Warnings:

  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `clientId` on the `Attendance` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Client_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Client";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "Customer_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attendance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Attendance_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Attendance" ("createdAt", "description", "id", "userId") SELECT "createdAt", "description", "id", "userId" FROM "Attendance";
DROP TABLE "Attendance";
ALTER TABLE "new_Attendance" RENAME TO "Attendance";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
