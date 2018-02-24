/* eslint-env browser */

const React = require('react');
const ReactDOM = require('react-dom');
const { renderRoutes } = require('react-router-config');
const { BrowserRouter } = require('react-router-dom');

const clientRouterCreator = require('../tool/clientRouterCreator');

const clientRouters = clientRouterCreator();

ReactDOM.render(
  <BrowserRouter>
    {renderRoutes(clientRouters)}
  </BrowserRouter>, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
