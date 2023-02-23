-- CreateTable
CREATE TABLE "Tracker" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "plataform" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tracker_pkey" PRIMARY KEY ("id")
);
