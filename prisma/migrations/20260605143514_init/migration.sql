-- CreateTable
CREATE TABLE "volunteers" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "avatarKey" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "volunteers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animals" (
    "id" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "scientific_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "habitat" TEXT NOT NULL,
    "conservation_status" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "population_note" TEXT NOT NULL,
    "image_key" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "object_position" TEXT NOT NULL DEFAULT '50% 50%',
    "rotate" INTEGER NOT NULL DEFAULT 0,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "animals_sort_order_idx" ON "animals"("sort_order");
