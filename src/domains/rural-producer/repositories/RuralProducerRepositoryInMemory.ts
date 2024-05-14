import { StateEnum } from "../../../dictionary/state.enum";
import { PlantedCrop } from "../entities/FarmEntity";
import { RuralProducerEntity } from "../entities/RuralProducer.entity";
import { RuralProducerSumsEntity } from "../entities/RuralProducerSums.entity";

export class RuralProducerRepositoryInMemory {
    private store: RuralProducerEntity[] = [];

    async create(obj: RuralProducerEntity): Promise<{id: string}> {
        this.store.push(obj);
        return { id: obj.id };
    }

    async update(id: string, obj: Partial<RuralProducerEntity>): Promise<void> {
        const index = this.store.findIndex(item => item.id === id);
        const updatedItem = { ...this.store[index], ...obj };
        this.store[index] = updatedItem;
    }

    async remove(id: string): Promise<void> {
        const index = this.store.findIndex(item => item.id === id);
        this.store.splice(index, 1)[0];
    }

    async findById(id: string): Promise<RuralProducerEntity | undefined> {
        const item = this.store.find(item => item.id === id);
        return item ? item : undefined;
    }

    async find(): Promise<RuralProducerEntity[]> {
        return this.store;
    }

    // async getSums(): Promise<RuralProducerSumsEntity> {

    //     let amountFarms = 0;
    //     let amountHectare = 0;
    //     const soloUseArea = { vegetation: 0, arable: 0 };
    //     const mapState: any = {};
    //     const mapCrop: any = {};
        
    //     for(let producer of this.store) {
    //         amountFarms++;

    //         amountHectare += producer.farm.farmTotalArea;

    //         if(!mapState[producer.farm.state]) {
    //             mapState[producer.farm.state] = { amountFarms: 0, amountHectare: 0 }
    //         }
    //         mapState[producer.farm.state].amountFarms++;
    //         mapState[producer.farm.state].amountHectare += producer.farm.farmTotalArea;

    //         for(let crop of producer.farm.plantedCrops) {
    //             if(!mapCrop[crop]) {
    //                 mapCrop[crop] = { amountFarms: 0, amountHectare: 0 }
    //             }
    //             mapCrop[crop].amountFarms++;
    //             mapCrop[crop].amountHectare += producer.farm.farmTotalArea;
    //         }

    //         soloUseArea.vegetation += producer.farm.vegetationArea;
    //         soloUseArea.arable += producer.farm.arableArea;
    //     }

    //     const amountByState = Object.keys(mapState).map(key => { 
    //         return {
    //             state: key as StateEnum,
    //             amountFarms: mapState[key].amountFarms,
    //             amountHectare: mapState[key].amountHectare
    //         }
    //     });

    //     const amountByCrop = Object.keys(mapCrop).map(key => { 
    //         return {
    //             crop: key as PlantedCrop,
    //             amountFarms: mapCrop[key].amountFarms,
    //             amountHectare: mapCrop[key].amountHectare
    //         }
    //     });

    //     return RuralProducerSumsEntity.create({
    //         amountFarms,
    //         amountHectare,
    //         amountByState,
    //         amountByCrop,
    //         soloUseArea,
    //     });
    // }
}