import { randomUUID } from 'crypto';
import { FarmEntity } from './FarmEntity';

export class RuralProducerEntity {
    id!: string;
    CPForCNPJ!: string;
    name!: string;
    farm!: FarmEntity;

    private constructor() {
        this.id = randomUUID();
    }

    static create(obj: { CPForCNPJ: string; name: string; farm: FarmEntity }): RuralProducerEntity {
        return Object.assign(new RuralProducerEntity(), obj);
    }

    static restore(obj: unknown) {
        return Object.assign(new RuralProducerEntity(), obj);
    }
}