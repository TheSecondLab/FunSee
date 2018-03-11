/* eslint-env browser */

const React = require('react');
const ReactDOM = require('react-dom');
const { renderRoutes } = require('react-router-config');
const { BrowserRouter } = require('react-router-dom');
const { Provider } = require('react-redux');

const clientRouterCreator = require('../tool/clientRouterCreator');
const storeCreator = require('../tool/storeCreator');
const rootSaga = require('../tool/rootSagaCreator');

// 会在build阶段，用webpack.DefinePlugin替换global.__CLIENT_ROUTER__
const clientRouters = clientRouterCreator(global.__CLIENT_ROUTER__);

// prepare initialState for client state
let initialState = {};
if (typeof window !== 'undefined') {
  initialState = window.FUNSEE_STATE;
}
// create store & run the saga
const store = storeCreator(initialState);
store.runSaga(rootSaga());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(clientRouters)}
    </BrowserRouter>
  </Provider>, document.getElementById('root'));


/* *************************************************************** */
/* TODO: 补充热更新细节                                              */
/* *************************************************************** */
if (module.hot) {
  module.hot.accept();
}
