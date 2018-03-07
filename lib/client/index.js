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

const store = storeCreator();
store.runSaga(rootSaga());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(clientRouters)}
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
