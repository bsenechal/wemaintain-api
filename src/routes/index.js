const Router = require('koa-router');

const router = new Router();
const { Validator } = require('jsonschema');
const { isEmpty } = require('lodash');
const log4js = require('log4js');
const routeService = require('../services/RouteService');
const routeOptimizerSchema = require('./validationSchema/routeOptimizer.json');

const logger = log4js.getLogger();

router
  .post('/routeOptimizer', async (ctx) => {
    const validator = new Validator();
    const { body } = ctx.request;
    const { errors } = validator.validate(body, routeOptimizerSchema);

    if (!isEmpty(errors)) {
      logger.error('/routeOptimizer - Wrong format:', errors);
      ctx.status = 400;
      ctx.body = 'Error: Please check the input format';
      return ctx;
    }

    ctx.body = await routeService.computeOptimizedRoute(body);

    return ctx;
  });


module.exports = router;
