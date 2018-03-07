const path = require('path');
const React = require('react');

const { renderRoutes } = require('react-router-config');

const App = ({ route }) => (
  <div>
    hellow router
    {renderRoutes(route.routes)}
  </div>
);

const clientRouterCreator = (configs) => {
  if (!Array.isArray(configs)) {
    console.error('FunSee<clientRouterCreator>: No moduleConfig.js found under folder<shared>');
    return;
  }

  const routers = configs.map(config => ({
    path: config.path,
    component: require(global.__RELATIVE_PATH__ + '/' + config.component)
  }));

  return [
    {
      component: App,
      routes: routers
    }
  ];
};

module.exports = clientRouterCreator;
