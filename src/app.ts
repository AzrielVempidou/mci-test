import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import Config from './config';
import * as middlewares from './middlewares';
import api from './api';
import { StatusCodes } from 'http-status-codes';
import { Logger } from './utils/logger';

const app = express();
app.locals.version = process.env.npm_package_version || '';
const config = new Config();

const logger = new Logger(config);

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.locals.config = config;
app.on('close', async () => {});

app.get('/', (req, res) => {
  res.json({
    message: 'Todo',
    status: StatusCodes.OK,
  });
});

app.use('/api', api(app));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler(logger));
app._router.stack.forEach(function (r: any) {
  if (r.route && r.route.path) {
    logger.debug(r.route.path);
  }
});
export default app;