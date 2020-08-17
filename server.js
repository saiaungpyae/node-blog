import mongoose from 'mongoose';
import http from 'http';

import config from './config';
import setupExpress from './loaders/express';

const Console = console;

const mongooseOption = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(config.db, mongooseOption);

const db = mongoose.connection;

db.on('error', err => {
  Console.log('MONGOOSE ERR => ', err);
});

db.once('open', () => {
  Console.log('CONNECTED TO => ', config.db);
});

process.on('unhandledRejection', err => Console.error(err));

process.on('SIGINT', () => {
  db.close(() => {
    process.exit(0);
  });
});

const app = setupExpress();
const server = http.createServer(app);

server.listen(config.port, () => {
  Console.log('APPLICATION STARTED ON PORT => ', config.port);
});

export default server;
