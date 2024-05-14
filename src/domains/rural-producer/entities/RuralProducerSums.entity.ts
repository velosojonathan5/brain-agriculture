import { StateEnum } from "../../../dictionary/state.enum";
import { PlantedCrop } from "./FarmEntity";

export class RuralProducerSumsEntity {
    amountFarms!: number; 
    amountHectare!: number; 
    amountByState!: { state: StateEnum; amountFarms: number, amountHectare: number}[]; 
    amountByCrop!: { crop: PlantedCrop; amountFarms: number, amountHectare: number}[]; 
    soloUseArea!: { arable: number; vegetation: number }; 

    private constructor () {}

    static create(obj: RuralProducerSumsEntity){
        return Object.assign(new RuralProducerSumsEntity(), obj);
    }
}