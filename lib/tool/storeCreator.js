/* eslint-env browser */

const {
  createStore,
  compose,
  applyMiddleware,
  combineReducers
} = require('redux');
const createSagaMiddleware = require('redux-saga');
const { createLogger } = require('redux-logger');

const logger = createLogger();

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
  let commonReducers;
  const reducerFilePaths = global.__CLIENT_REDUCER__;
  const commonReducerFilePaths = global.__COMMON_CLIENT_REDUCER__;

  Object.keys(reducerFilePaths).forEach((i) => {
    reducers[i] = require(`${global.__RELATIVE_PATH__}/${reducerFilePaths[i]}`);
  });

  Object.keys(commonReducerFilePaths).forEach((i) => {
    commonReducers = require(`${global.__COMMON_RELATIVE_PATH__}/${commonReducerFilePaths[i]}`);
  });

  // combineReducers does not accept void object, so switch void reducers to a function
  const moduleReducer = Object.keys(reducers).length ? combineReducers(reducers) : moduleState => moduleState || {};

  // 扩展实际项目中的common reducer, 通过该入口能够以键值对的形式嵌入多个与common同级的redux strore key, 默认只有common
  const funseeReducer = typeof commonReducers === 'function' ? {
    module: moduleReducer,
    common: commonReducers
  } : {
    module: moduleReducer,
    ...commonReducers
  };


  // Q: default ?
  const sagaMiddleware = createSagaMiddleware.default();


  const store = createStore(combineReducers(funseeReducer), state, composeEnhancers(
    applyMiddleware(sagaMiddleware, logger)
  ));

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(createSagaMiddleware.END);

  return store;
};
