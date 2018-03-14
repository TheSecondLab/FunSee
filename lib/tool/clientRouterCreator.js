const { renderRoutes } = require('react-router-config');

/**
 * 生成客户端路由对象， 最后提供给react-router-config
 *
 * 在FunSeeHammer中， combine函数会读取所有项目shared文件夹下的moduleConfig文件，
 * 然后经过转换并塞到一个数组中， 传给当前方法， 给方法会把这些config生成为react-router-config认识的格式， 并export出去
 *
 * @param    {array}  configs     funsee的实际项目中的每个module文件夹下应该用一个moduleConfig.js
 * @returns  routers              客户端路由文件集合
 *
 * @date     2018-03-08
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */


const clientRouterCreator = ({ router, rootRouter }) => {
  if (!Array.isArray(router)) {
    console.error('FunSee<clientRouterCreator>: No moduleConfig.js found under folder<shared>');
    return;
  }

  const routers = router.map(config => ({
    path: config.path,
    component: require(`${global.__RELATIVE_PATH__}/${config.component}`)
  }));
  const completeRouters = rootRouter.map(config => ({
    path: config.path,
    component: require(`${global.__RELATIVE_PATH__}/${config.component}`)(renderRoutes),
    routes: routers
  }));

  return completeRouters;
};

module.exports = clientRouterCreator;
