import { BusinessException } from "../../exceptions/BusinessException";
import { RuralProducerEntity } from "./entities/RuralProducer.entity";
import { CreateRuralProducerSchema, UpdateRuralProducerSchema, createRuralProducerSchema, updateRuralProducerSchema } from "./RuralProducer.schema";
import { RuralProducerRepositoryInMemory } from "./repositories/RuralProducerRepositoryInMemory";
import { RuralProducerSumsEntity } from "./entities/RuralProducerSums.entity";
import { FarmEntity, PlantedCrop } from "./entities/FarmEntity";
import { StateEnum } from "../../dictionary/state.enum";

export class RuralProducerService {
    constructor(
        private readonly ruralProducerRepository: Omit<RuralProducerRepositoryInMemory, 'store'>
    ) {}

    async create(schema: CreateRuralProducerSchema): Promise<{ id: string }> {        
        this.validate(schema, createRuralProducerSchema);

        const {
            CPForCNPJ,
            name,
            farmName,
            city,
            state,
            farmTotalArea,
            arableArea,
            vegetationArea,
            plantedCrops
        } = schema;

        const farm = FarmEntity.create({
            name: farmName, 
            city,
            state,
            farmTotalArea,
            arableArea,
            vegetationArea,
            plantedCrops
        });
        const ruralProducer = RuralProducerEntity.create({ CPForCNPJ, name, farm });
        return this.ruralProducerRepository.create(ruralProducer);
    }

    async update(id: string, ruralProducer: UpdateRuralProducerSchema): Promise<void> {
        this.validate(ruralProducer, updateRuralProducerSchema);

        await this.ruralProducerRepository.update(id, ruralProducer);
    }

    async remove(id: string): Promise<void> {
        await this.ruralProducerRepository.remove(id);
    }

    async findById(id: string): Promise<RuralProducerEntity> {
        const ruralProducer = await this.ruralProducerRepository.findById(id);

        if(!ruralProducer) {
            throw new BusinessException("Produtor rural não encontrado.");
        }

        return ruralProducer;
    }

    async getSums(): Promise<RuralProducerSumsEntity> {
        const producers = await this.ruralProducerRepository.find();

        let amountFarms = 0;
        let amountHectare = 0;
        const soloUseArea = { vegetation: 0, arable: 0 };
        const mapState: any = {};
        const mapCrop: any = {};
        
        for(let producer of producers) {
            amountFarms++;

            amountHectare += producer.farm.farmTotalArea;

            if(!mapState[producer.farm.state]) {
                mapState[producer.farm.state] = { amountFarms: 0, amountHectare: 0 }
            }
            mapState[producer.farm.state].amountFarms++;
            mapState[producer.farm.state].amountHectare += producer.farm.farmTotalArea;

            for(let crop of producer.farm.plantedCrops) {
                if(!mapCrop[crop]) {
                    mapCrop[crop] = { amountFarms: 0, amountHectare: 0 }
                }
                mapCrop[crop].amountFarms++;
                mapCrop[crop].amountHectare += producer.farm.farmTotalArea;
            }

            soloUseArea.vegetation += producer.farm.vegetationArea;
            soloUseArea.arable += producer.farm.arableArea;
        }

        const amountByState = Object.keys(mapState).map(key => { 
            return {
                state: key as StateEnum,
                amountFarms: mapState[key].amountFarms,
                amountHectare: mapState[key].amountHectare
            }
        });

        const amountByCrop = Object.keys(mapCrop).map(key => { 
            return {
                crop: key as PlantedCrop,
                amountFarms: mapCrop[key].amountFarms,
                amountHectare: mapCrop[key].amountHectare
            }
        });

        return RuralProducerSumsEntity.create({
            amountFarms,
            amountHectare,
            amountByState,
            amountByCrop,
            soloUseArea,
        });
    }

    private validate(obj: unknown, schema: {parse: (obj: unknown) => unknown}): void {
        try {
            schema.parse(obj);
        } catch(err: any) {
            throw new BusinessException(JSON.parse(err)[0].message)
        }
    }
}