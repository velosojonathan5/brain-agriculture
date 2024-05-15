import { RuralProducerEntity } from "../entities/RuralProducer.entity";

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
}