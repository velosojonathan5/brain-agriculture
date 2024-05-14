import { StateEnum } from "../../dictionary/state.enum";
import { FarmEntity, PlantedCrop } from "./entities/FarmEntity";
import { RuralProducerEntity } from "./entities/RuralProducer.entity";
import { RuralProducerService } from "./RuralProducer.service";
import { RuralProducerRepositoryInMemory } from "./repositories/RuralProducerRepositoryInMemory";

const ruralProducerData = {
    CPForCNPJ: "65448660088",
    name: "Augusto Marques",
    farmName: "Fazenda Alegria",
    city: "Formiga",
    state: StateEnum.MG,
    farmTotalArea: 1000,
    arableArea: 900,
    vegetationArea: 100,
    plantedCrops: [PlantedCrop.COFFEE],
};

const mockFarm1 = FarmEntity.create({
    name: "Fazenda 1",
    city: "Formiga",
    state: StateEnum.MG,
    plantedCrops: [PlantedCrop.COFFEE, PlantedCrop.SOY],
    farmTotalArea: 580,
    arableArea: 500,
    vegetationArea: 80,
})

const mockFarm2 = FarmEntity.create({
    name: "Fazenda 2",
    city: "Cariacica",
    state: StateEnum.ES,
    plantedCrops: [PlantedCrop.SOY],
    farmTotalArea: 2000,
    arableArea: 1500,
    vegetationArea: 500,
})

const mockFarm3 = FarmEntity.create({
    name: "Fazenda 3",
    city: "Formiga",
    state: StateEnum.MG,
    plantedCrops: [PlantedCrop.COTTON],
    farmTotalArea: 5000,
    arableArea: 4120,
    vegetationArea: 880,
})

const mockRuralProducer1 = RuralProducerEntity.create({
    CPForCNPJ: "65448660088", 
    name: "producer 1",
    farm: mockFarm1
});
const mockRuralProducer2 = RuralProducerEntity.create({
    CPForCNPJ: "65448660088", 
    name: "producer 2",
    farm: mockFarm2
});
const mockRuralProducer3 = RuralProducerEntity.create({
    CPForCNPJ: "65448660088", 
    name: "producer 3",
    farm: mockFarm3
});

describe('Test RuralProducerService', () => {
    let ruralProducerService: RuralProducerService;
    let inMemoryRepository: RuralProducerRepositoryInMemory;

    beforeEach(() => {
        inMemoryRepository = new RuralProducerRepositoryInMemory();
        ruralProducerService = new RuralProducerService(inMemoryRepository);
    })

    describe('create method', () => {
        it('should create a rural producer', async () => {
            const response = await ruralProducerService.create(ruralProducerData);

            expect(response.id).toBe(inMemoryRepository['store'][0]?.id);
        })

        it('should create a rural producer when using a valid CNPJ', async () => {
            const data = {
                ...ruralProducerData,
                CPForCNPJ: "66103217000135",
            };
            const response = await ruralProducerService.create(data);

            expect(response.id).toBe(inMemoryRepository['store'][0]?.id);
        })

        it('should create a rural producer when more than a planted crop', async () => {
            const data = {
                ...ruralProducerData,
                plantedCrops: [PlantedCrop.COFFEE, PlantedCrop.SOY],
            };
            const response = await ruralProducerService.create(data);

            expect(response.id).toBe(inMemoryRepository['store'][0]?.id);
            expect(data.plantedCrops).toEqual(inMemoryRepository['store'][0]?.farm.plantedCrops);
        })

        it('should throw exception when CPF is not valid', async () => {
            const data = {
                ...ruralProducerData,
                CPForCNPJ: "12345678912",
            };

            await expect(async () => ruralProducerService.create(data)).rejects.toThrowError("Deve ser um CPF ou CNPJ válido");
        });

        it('should throw exception when CNPJ is not valid', async () => {
            const data = {
                ...ruralProducerData,
                CPForCNPJ: "1234567891234",
            };

            await expect(async () => ruralProducerService.create(data)).rejects.toThrowError("Deve ser um CPF ou CNPJ válido");
        });

        it('should throw exception when is not CPF or CNPJ', async () => {
            const data = {
                ...ruralProducerData,
                CPForCNPJ: "123456789123",
            };

            await expect(async () => ruralProducerService.create(data)).rejects.toThrowError("Deve ser um CPF ou CNPJ válido");
        });

        it('should throw business exception when arable area + vegetation area is bigger than total area', async () => {
            const data = {
                ...ruralProducerData,
                vegetationArea: 101,
            };

            await expect(async () => ruralProducerService.create(data)).rejects.toThrowError("A soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda.")
        })
    });

    describe('update method', () => {
        it('should update a rural producer', async () => {
            

            inMemoryRepository['store'] = [mockRuralProducer1, mockRuralProducer2, mockRuralProducer3];

            await ruralProducerService.update(mockRuralProducer2.id, { name: "producer 2 alterado" });

            expect(inMemoryRepository['store'][1].name).toBe("producer 2 alterado");
        })
    });

    describe('remove method', () => {
        it('should remove a rural producer', async () => {

            inMemoryRepository['store'] = [mockRuralProducer1, mockRuralProducer2, mockRuralProducer3];

            await ruralProducerService.remove(mockRuralProducer2.id);

            expect(inMemoryRepository['store'].length).toBe(2);
        })
    });

    describe('findById method', () => {
        it('should return a rural producer', async () => {

            inMemoryRepository['store'] = [mockRuralProducer1, mockRuralProducer2, mockRuralProducer3];

            const response = await ruralProducerService.findById(mockRuralProducer3.id);

            expect(response).toEqual(mockRuralProducer3);
        });

        it('should throw when a rural producer is not found', async () => {

            inMemoryRepository['store'] = [mockRuralProducer1, mockRuralProducer2, mockRuralProducer3];

            await expect(async () => ruralProducerService.findById("f2f58a58-725b-427f-aa81-3ae5d64f69ef")).rejects.toThrowError("Produtor rural não encontrado.")
        })
    });


    describe('getSums method', () => {
        it('should return the sums', async () => {
            inMemoryRepository['store'] = [mockRuralProducer1, mockRuralProducer2, mockRuralProducer3];
            
            const response = await ruralProducerService.getSums();

            expect(response.amountFarms).toBe(3);
            expect(response.amountHectare).toBe(7580);
            expect(response.amountByState).toEqual([{
                state: StateEnum.MG,
                amountFarms: 2,
                amountHectare: 5580
            },{
                state: StateEnum.ES,
                amountFarms: 1,
                amountHectare: 2000
            }]);
            expect(response.amountByCrop).toEqual([{
                crop: PlantedCrop.COFFEE,
                amountFarms: 1,
                amountHectare: 580
            },{
                crop: PlantedCrop.SOY,
                amountFarms: 2,
                amountHectare: 2580
            },
            {
                crop: PlantedCrop.COTTON,
                amountFarms: 1,
                amountHectare: 5000
            }]);
            expect(response.soloUseArea.arable).toBe(6120);
            expect(response.soloUseArea.vegetation).toBe(1460);
        });
    });
})