-- CreateTable
CREATE TABLE "ConversionLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scratchProjectId" TEXT NOT NULL,
    "sandboxId" TEXT NOT NULL
);
