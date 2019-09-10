const Koa = require('koa');
const config = require('config');
const http = require('http');
const dotenv = require('dotenv');
const log4js = require('log4js');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes');

module.exports = () => {
  const app = new Koa();

  const logger = log4js.getLogger();

  logger.level = 'info';

  app.use(bodyParser());

  app.use(routes.routes());
  app.use(routes.allowedMethods());

  app.on('error', (err) => {
    logger.error('server error', err);
  });

  dotenv.config();

  logger.info(`Koa server running on port ${config.port}.`);

  const appServer = http
    .createServer(app.callback());

  appServer.listen(config.port);

  return appServer;
};
