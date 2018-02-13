const assign = require('lodash.assign');
const path = require('path');

const defaultConfig = require('../config/defaultFunSeeConfig');
const createApp = require('./tool/appCreator');
const routerCreator = require('./tool/routerCreator');
const middlewareAppender = require('./tool/middlewareAppender');

const _config = Symbol();
const _app = Symbol();

module.exports = class FunSee {
  constructor(config) {
    this[_config] = assign({}, defaultConfig, config);
    this[_app] = createApp();
    
    // load midderware for KOA app
    middlewareAppender(this.app, this.config.middleware);

    // add router
    routerCreator(this.app, path.resolve(__dirname, '../../FunSeeBoilerplate/server/routes'));
  }

  get config() {
    return this[_config];
  }

  get app() {
    return this[_app];
  }

  startup() {
    this.app.use((ctx, next) => {
      ctx.body = 'hello';
      ctx.status = 200;
    })
    this.app.listen(this.config.port);
    console.log('start up', this.config.port)
  }
};
