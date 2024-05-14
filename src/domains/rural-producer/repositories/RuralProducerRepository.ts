import { PrismaClient } from "@prisma/client";
import { RuralProducerEntity } from "../entities/RuralProducer.entity";
import { FarmEntity } from "../entities/FarmEntity";

export class RuralProducerRepository {

    constructor(
        private readonly pismaClient: PrismaClient
    ) {}

    async create(obj: RuralProducerEntity): Promise<{ id: string }> {
        const producerCreated = await this.pismaClient.ruralProducer.create({
            data: {
                id: obj.id,
                CPForCNPJ: obj.CPForCNPJ,
                name: obj.name,
                farm: {
                    create: {
                        id: obj.farm.id,
                        name: obj.farm.name,
                        city: obj.farm.city,
                        state: obj.farm.state,
                        farmTotalArea: obj.farm.farmTotalArea,
                        arableArea: obj.farm.arableArea,
                        vegetationArea: obj.farm.vegetationArea,
                        plantedCrops: obj.farm.plantedCrops,
                    }
                }
            }
        })

        return { id: producerCreated.id }
    }

    async update(id: string, obj: Partial<RuralProducerEntity>): Promise<void> {
        await this.pismaClient.ruralProducer.update({
            where: {id},
            data: {
                id: obj.id,
                CPForCNPJ: obj.CPForCNPJ,
                name: obj.name,
                farm: {
                    create: obj.farm
                }
            }
        })
    }

    async remove(id: string): Promise<void> {
        await this.pismaClient.ruralProducer.delete({ where: { id } })
    }

    async findById(id: string): Promise<RuralProducerEntity | undefined> {
        const resp = await this.pismaClient.ruralProducer.findFirst({ where: { id }, include: { farm: true } });

        if(!resp){
            return undefined;
        }

        const farm = FarmEntity.restore(resp.farm);
        return RuralProducerEntity.restore({...resp, farm: farm});
    }

    async find(): Promise<RuralProducerEntity[]> {
        return this.pismaClient.ruralProducer.findMany({ include: { farm: true } }) as unknown as RuralProducerEntity[];
    }

}