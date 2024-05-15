-- CreateEnum
CREATE TYPE "StateEnum" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- CreateEnum
CREATE TYPE "PlantedCrop" AS ENUM ('SOY', 'CORN', 'COTTON', 'COFFEE', 'SUGAR_CANE');

-- CreateTable
CREATE TABLE "Farm" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "state" "StateEnum" NOT NULL,
    "farm_total_area" INTEGER NOT NULL,
    "arable_area" INTEGER NOT NULL,
    "vegetation_area" INTEGER NOT NULL,
    "planted_crops" "PlantedCrop"[],

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuralProducer" (
    "id" UUID NOT NULL,
    "cpf_or_cnpj" VARCHAR(14) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "farmId" UUID NOT NULL,

    CONSTRAINT "RuralProducer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RuralProducer_farmId_key" ON "RuralProducer"("farmId");

-- AddForeignKey
ALTER TABLE "RuralProducer" ADD CONSTRAINT "RuralProducer_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
