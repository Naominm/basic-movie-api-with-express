-- CreateTable
CREATE TABLE "movies_table" (
    "id" TEXT NOT NULL,
    "movieTitle" TEXT NOT NULL,
    "movieDescription" TEXT NOT NULL,
    "isWatched" BOOLEAN NOT NULL DEFAULT false,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movies_table_pkey" PRIMARY KEY ("id")
);
