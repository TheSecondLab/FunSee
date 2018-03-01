const {
  createStore,
  compose,
  applyMiddleware,
  combineReducers
} = require('redux');
const createSagaMiddleware = require('redux-saga');

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
