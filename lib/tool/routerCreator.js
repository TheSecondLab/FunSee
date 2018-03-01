const Router = require('koa-router');

const router = new Router();

router.get('/health', (ctx) => {
  ctx.status = 200;
});

/**
 * 函数功能简述
 *
 * 处理收集到的路由配置
 *
 * @param    {Objedt}  controller     路由配置
 * @param    {String}  prefix     以路由文件文件名命名的前置路由
 * @returns  void
 *
 * @date     2018-3-1
 * @author   zhaoxing<jiyiwohanxing@gmail.com>
 */
const getController = (controller, prefix) => {
  if (typeof controller[controller.length - 1] === 'object') controller.pop();

  return controller.map((item, idx) => {
    if (idx === 0) return prefix + item;
    const file = require(`${global.__ROOT_PATH__}/server/controller/${item.split('.').shift()}`);
    return file[item.split('.').pop()];
  });
};


/**
 * 函数功能简述
 *
 * 挂载总路由
 *
 * @param    {Objedt}  app     Koa App
 * @param    {Array}  routers     合并处理后的服务器端路由配置
 * @returns  void
 *
 * @date     2018-2-28
 * @author   zhaoxing<jiyiwohanxing@gmail.com>
 */
module.exports = (app, routers) => {
  const prefixRouter = new Router({ prefix: '/api' });

  routers.forEach((element) => {
    const RouterGenerator = {

      post: (...arg) => {
        const routerController = getController(arg, element.name);
        prefixRouter.post(...routerController);
      },

      get: (...arg) => {
        const routerController = getController(arg, element.name);
        prefixRouter.get(...routerController);
      }
    };

    element.router(RouterGenerator);
  });

  router.use(prefixRouter.routes(), prefixRouter.allowedMethods());

  app.use(router.routes(), router.allowedMethods());
};
