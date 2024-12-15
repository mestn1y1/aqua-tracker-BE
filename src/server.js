import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swagger } from './middlewares/swagger.js';
import router from './routers/index.js';
import waterRouter from './routers/water.js';

const PORT = 3000;

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use('water', waterRouter);
  app.use('/api-docs', swagger());

  app.use(router);

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });
  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
