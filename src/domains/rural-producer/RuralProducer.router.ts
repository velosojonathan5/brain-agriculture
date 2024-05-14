import { Router, Request, Response, NextFunction } from "express";
import { RuralProducerService } from "./RuralProducer.service";
import { RuralProducerRepository } from "./repositories/RuralProducerRepository";
import prismaClient from "../../../prisma";

const ruralProducerRouter = Router();
const repository = new RuralProducerRepository(prismaClient);
const ruralProducerService = new RuralProducerService(repository);

ruralProducerRouter.get('/rural-producer/sums', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resp = await ruralProducerService.getSums();
        res.json(resp);
    } catch(err: any) {
        next(err);
    }
});

ruralProducerRouter.post('/rural-producer', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resp = await ruralProducerService.create(req.body);
        res.json(resp);
    } catch(err: any) {
        next(err);
    }
});

ruralProducerRouter.put('/rural-producer/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resp = await ruralProducerService.update(req.params.id, req.body);
        res.json(resp);
    } catch(err: any) {
        next(err);
    }
});

ruralProducerRouter.delete('/rural-producer/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resp = await ruralProducerService.remove(req.params.id);
        res.json(resp);
    } catch(err: any) {
        next(err);
    }
});

ruralProducerRouter.get('/rural-producer/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resp = await ruralProducerService.findById(req.params.id);
        res.json(resp);
    } catch(err: any) {
        next(err);
    }
});



export default ruralProducerRouter;