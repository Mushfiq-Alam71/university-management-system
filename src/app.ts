import type { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler.ts';
import router from './app/routes/index.ts';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

export default app;
