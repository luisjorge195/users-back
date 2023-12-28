-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('Femenino', 'Masculino');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "genero" "Genero" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
