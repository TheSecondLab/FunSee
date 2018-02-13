const Router = require('koa-router');

const router = new Router();
router.get('/health', (ctx, next) => {
  ctx.status = 200;
});

module.exports = (app, routerPath) => {
  console.log(require(`${routerPath}/test`))

  app.use(router.routes(), router.allowedMethods());
};