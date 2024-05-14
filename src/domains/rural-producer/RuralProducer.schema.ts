import { z } from "zod";
import { StateEnum } from "../../dictionary/state.enum";
import { validateCNPJ, validateCPF } from "validations-br";
import { PlantedCrop } from "./entities/FarmEntity";


const validatorCPForCNPJ = (val: string): boolean => {
    return validateCNPJ(val) || validateCPF(val);
}

export const createRuralProducerSchema = z.object({
    CPForCNPJ: z.string().refine(validatorCPForCNPJ, {
        message: "Deve ser um CPF ou CNPJ válido",
    }),
    name: z.string(),
    farmName: z.string(),
    city: z.string(),
    state: z.nativeEnum(StateEnum),
    farmTotalArea: z.number().int().positive(),
    arableArea: z.number().int().positive(),
    vegetationArea: z.number().int().positive(),
    plantedCrops: z.nativeEnum(PlantedCrop).array().min(1),
});

export type CreateRuralProducerSchema = z.infer<typeof createRuralProducerSchema>;

export const updateRuralProducerSchema = z.object({
    CPForCNPJ: z.string().refine(validatorCPForCNPJ, {
        message: "Deve ser um CPF ou CNPJ válido",
    }).optional(),
    name: z.string().optional().optional(),
    farmName: z.string().optional().optional(),
    city: z.string().optional().optional(),
    state: z.nativeEnum(StateEnum).optional(),
    farmTotalArea: z.number().positive().optional(),
    arableArea: z.number().positive().optional(),
    vegetationArea: z.number().positive().optional(),
    plantedCrops: z.nativeEnum(PlantedCrop).array().min(1).optional(),
});

export type UpdateRuralProducerSchema = z.infer<typeof updateRuralProducerSchema>;