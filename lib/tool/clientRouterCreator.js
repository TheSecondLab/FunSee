const path = require('path');
const React = require('react');

const { renderRoutes } = require('react-router-config');

const App = ({ route }) => (
  <div>
    hellow router
    {renderRoutes(route.routes)}
  </div>
);

module.exports = (configs) => {
  if (!Array.isArray(configs)) {
    console.error('FunSee<clientRouterCreator>: No moduleConfig.js found under folder<shared>');
    return;
  }

  const routers = typeof window === 'undefined' ?
    configs.map(config => ({
      path: config.path,
      component: require(global.relativePath + '/' + config.component)
    }))
    :
    configs.map(config => ({
      path: config.path,
      component: require(__WEBPACK_REPLACE_SHARDED_RELATIVE_PATH__ + '/' + config.component)
    }));

  return [
    {
      component: App,
      routes: routers
    }
  ];
};
