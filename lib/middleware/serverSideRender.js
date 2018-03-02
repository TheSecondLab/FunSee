const React = require('react');
const { matchRoutes, renderRoutes } = require('react-router-config');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const { Provider } = require('react-redux');

const clientRouterCreatorForServer = require('../tool/clientRouterCreatorForServer');
const storeCreator = require('../tool/storeCreatorForServer');
const rootSaga = require('../tool/rootSagaForServer');

// webpack打包的时候会动态合成所有router文件并塞入global.__CLIENT_ROUTER__
const clientRouters = clientRouterCreatorForServer(global.__CLIENT_ROUTER__);

/**
 * 服务器端渲染中间件
 *
 * 该方法返回koa中间件，中间件作用是根据ctx.request来判断
 * 是否需要做服务器端渲染
 * TODO 待补充注释：初次发送请求逻辑
 *
 * @param    void
 * @returns  async(ctx, next)
 *
 * @date     2018-02-17
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
module.exports = () => async (ctx, next) => {
  const store = storeCreator();
  store.runSaga(rootSaga);

  /**
   * ------------------------------------------------------------------
   * render a html string contains the matched route
   * ------------------------------------------------------------------
   */
  const renderHtmlString = async () => {
    /* ***************************** */
    /*          if NECESSARY         */
    /*    TODO: context handler      */
    /* TODO: inititalDataArr handler */
    /* ***************************** */

    const context = {};

    // function render is added into ctx via PKG koa-views
    await ctx.render('index', {
      root: renderToString(
        <Provider store={store}>
          <StaticRouter
            location={ctx.request.url}
            context={context}
          >
            {renderRoutes(clientRouters)}
          </StaticRouter>
        </Provider>
      )
    });
  };

  /**
   * ------------------------------------------------------------------
   * this is a filter used for Array.prototype.filter
   * it will filter the root router('/')
   * ------------------------------------------------------------------
   */
  const isNotRootRoute = ({ match }) => match.path !== '/';

  // get all matched Routes & filter the one which is not the root one('/')
  const matchedRouter = matchRoutes(clientRouters, ctx.request.path).filter(isNotRootRoute);

  matchedRouter.map(({ route }) => {
    console.log(1234);
    return '';
  });

  if (!Array.isArray(matchedRouter) || matchedRouter.length === 0) {
    return next();
  }

  await renderHtmlString();
};
