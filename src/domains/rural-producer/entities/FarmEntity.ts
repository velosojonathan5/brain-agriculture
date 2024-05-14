import { StateEnum } from "../../../dictionary/state.enum";
import { randomUUID } from 'crypto';
import { BusinessException } from "../../../exceptions/BusinessException";

export enum PlantedCrop {
    SOY = 'SOY', 
    CORN = 'CORN', 
    COTTON = 'COTTON', 
    COFFEE = 'COFFEE', 
    SUGAR_CANE = 'SUGAR_CANE'
}

export class FarmEntity {
    id!: string;
    name!: string;
    city!: string;
    state!: StateEnum;
    farmTotalArea!: number;
    arableArea!: number;
    vegetationArea!: number;
    plantedCrops!: PlantedCrop[];

    private constructor() {
        this.id = randomUUID();
    }

    static create(obj: Omit<FarmEntity, 'id'>): FarmEntity {
        if(obj.arableArea + obj.vegetationArea > obj.farmTotalArea) {
            throw new BusinessException("A soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda.");
        }

        return Object.assign(new FarmEntity(), obj);
    }

    static restore(obj: unknown) {
        return Object.assign(new FarmEntity(), obj);
    }
}