-- CreateTable
CREATE TABLE "ConversionLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scratchProjectId" TEXT NOT NULL,
    "sandboxId" TEXT NOT NULL,

    CONSTRAINT "ConversionLog_pkey" PRIMARY KEY ("id")
);
