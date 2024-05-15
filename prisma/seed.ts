import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.ruralProducer.create({
        data: {
            id: "25103a32-37bd-45db-a1a5-386433ac843a",
            CPForCNPJ: "65448660088",
            name: "Fazendeiro 1",
            farm: {
                create: {
                    id: "d0d1aa3f-2170-4678-8a5d-1d808b8599a9",
                    name: "Fazenda 1",
                    city: "Formiga",
                    state: "MG",
                    plantedCrops: ["COFFEE", "SOY"],
                    farmTotalArea: 580,
                    arableArea: 500,
                    vegetationArea: 80,
                }
            }
        }
    });

    await prisma.ruralProducer.create({
        data: {
            id: "e552935f-d968-4c45-b980-4216962cbeb2",
            CPForCNPJ: "97444164000140",
            name: "Fazendeiro 2",
            farm: {
                create: {
                    id: "bb90b81f-b6e3-4324-aab4-dbd806a331df",
                    name: "Fazenda 2",
                    city: "Cariacica",
                    state: "ES",
                    plantedCrops: ["SOY"],
                    farmTotalArea: 2000,
                    arableArea: 1500,
                    vegetationArea: 500,
                }
            }
        }
    });

    await prisma.ruralProducer.create({
        data: {
            id: "3e9992b6-894d-4b03-9aca-94995d5777e0",
            CPForCNPJ: "97444164000140",
            name: "Fazendeiro 2",
            farm: {
                create: {
                    id: "4e8d0f50-b23c-4136-abab-c47c447c3224",
                    name: "Fazenda 3",
                    city: "Formiga",
                    state: "MG",
                    plantedCrops: ["COTTON"],
                    farmTotalArea: 5000,
                    arableArea: 4120,
                    vegetationArea: 880,
                }
            }
        }
    });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })