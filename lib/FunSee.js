const { initGlobalVariable, validateFunSeeConfig } = require('./tool/initial');

// initialize the global variable for node 
initGlobalVariable();

const assign = require('lodash.assign');
const path = require('path');

const defaultConfig = require('../config/defaultFunSeeConfig');
const createApp = require('./tool/appCreator');
const routerCreator = require('./tool/routerCreator');
const middlewareAppender = require('./tool/middlewareAppender');

const _config = Symbol();
const _app = Symbol();
const _serverRouters = Symbol();

class FunSee {
  constructor(config) {
    this[_config] = assign({}, defaultConfig, config);
    // valid the config file for FunSee
    validateFunSeeConfig(this.config);

    // set Koa App
    this[_app] = createApp();

    // load important file for Funsee
    this.importantFileLoader();
    
    // load midderware for KOA app
    middlewareAppender(this.app, this.config);

    // add router
    routerCreator(this.app, this.serverRouters);
  }

  get config() {
    return this[_config];
  }

  get app() {
    return this[_app];
  }

  get serverRouters() {
    return this[_serverRouters];
  }

  importantFileLoader() {
    this[_serverRouters] = require(`${global.__ROOT_PATH__}/server/routers/test`);
  }

  startup() {
    // for test
    this.app.use((ctx, next) => {
      ctx.body = 'hello';
      ctx.status = 200;
    })
    // for test

    this.app.listen(this.config.port);
    console.log('listening at port: ', this.config.port)
  }
};

module.exports = FunSee;
