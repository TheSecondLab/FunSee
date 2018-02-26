/* eslint-env browser */

const React = require('react');
const ReactDOM = require('react-dom');
const { renderRoutes } = require('react-router-config');
const { BrowserRouter } = require('react-router-dom');

const clientRouterCreator = require('../tool/clientRouterCreator');

// 会在build阶段，用webpack.DefinePlugin替换__WEBPACK_REPLACE_CLIENT_ROUTER__
const clientRouters = clientRouterCreator(__WEBPACK_REPLACE_CLIENT_ROUTER__);

console.log('tttttttt', clientRouters)

ReactDOM.render(
  <BrowserRouter>
    {renderRoutes(clientRouters)}
  </BrowserRouter>, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
