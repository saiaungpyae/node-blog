import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import 'express-async-errors'; // no more try catch for async await

import { errorHandler } from '../helpers/handlers';
import setupRoutes from '../routes';
import config from '../config';

const app = express();

export default () => {
  app.use(
    cors({
      optionsSuccessStatus: 200
    })
  );
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(morgan('dev'));

  setupRoutes(app);

  app.use(errorHandler);

  return app;
};
