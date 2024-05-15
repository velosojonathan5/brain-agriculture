import express, { Router, NextFunction, Request, Response } from 'express';
import ruralProducerRouter from './domains/rural-producer/RuralProducer.router';
import { BusinessException } from './exceptions/BusinessException';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const PORT = 3000;
const app = express();
const route = Router();

app.use(express.json())

const swaggerDocument = fs.readFileSync('./docs/swagger.json', 'utf8');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(JSON.parse(swaggerDocument)));

route.get('/', (req, res) => {
    res.json({ message: 'hello world' })
})

app.use(route);

app.use(ruralProducerRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BusinessException) {
        res.status(400).json({ error: err.message });
    } else if(err){
        res.status(500);
        console.error(err.stack);
        res.status(500).send('Internal server error.');
    } else {
        next(err)
    }
});

app.listen(3000, () => console.log(`Server running on port ${PORT}`))

