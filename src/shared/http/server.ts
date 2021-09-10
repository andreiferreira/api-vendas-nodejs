import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'reflect-metadata';

import routes from './routes';
import { AppError } from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'Error', message: error.message });
    }

    return response
      .status(500)
      .json({ status: 'Error', message: 'Internal error' });
  },
);

app.listen(1234, () => {
  console.log('Rodando 1234');
});
