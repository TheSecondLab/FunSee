const {
  createStore,
  compose,
  applyMiddleware,
  combineReducers
} = require('redux');
const createSagaMiddleware = require('redux-saga');

/**
 * 创建store
 *
 * 通过webpack替换获取到所有的reducer文件，再通过combineReducers组装到一起
 * 创建saga中间件，将中间件挂载到store上
 * 返回store
 *
 * @param    {object} state
 * @returns  {object} store
 *
 * @date     2018-03-01
 * @author   zhangyang<zhangyang@zhongan.com>
 */
module.exports = (state = {}) => {
  const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  const reducers = {};
  const reducerFilePaths = __WEBPACK_REPLACE_CLIENT_REDUCER__;

  Object.keys(reducerFilePaths).forEach((i) => {
    reducers[i] = require(__WEBPACK_REPLACE_SHARDED_RELATIVE_PATH__ + '/' +reducerFilePaths[i]);
  });

  const sagaMiddleware = createSagaMiddleware.default();

  const store = createStore(combineReducers({
    module: combineReducers(reducers)
  }), state, composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ));

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(createSagaMiddleware.END);

  return store;
};
