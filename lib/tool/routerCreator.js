const Router = require('koa-router');

const router = new Router();
router.get('/health', (ctx, next) => {
  ctx.status = 200;
});

module.exports = (app, routers) => {
  console.log(routers)

  app.use(router.routes(), router.allowedMethods());
};