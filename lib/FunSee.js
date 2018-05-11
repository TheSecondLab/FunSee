/* eslint global-require: "off" */
const { FunSeeLogger } = require('funsee-logger');

const { validateFunSeeConfig } = require('./tool/initial');
const combineServerRoute = require('./tool/combineServerRoute');

const createApp = require('./tool/appCreator');
const routerCreator = require('./tool/routerCreator');
const middlewareAppender = require('./tool/middlewareAppender');
const configLoader = require('./tool/configLoader');
const attachService = require('./tool/attachService');
const { version } = require('../package.json');

const _config = Symbol('config');
const _app = Symbol('app');
const _serverRouters = Symbol('serverRouters');
const _logger = Symbol('logger');

class FunSee {
  /**
   * FunSee构造函数
   *
   * FunSee采用单例模式，可接受直接传入funsee配置， 传入的配置将会merge到defaultConfig里面
   *
   * @param    {object}  config     FunSee的config， 详见defaultFunSeeConfig.js
   * @returns  FunSee               返回FunSee的实例（单例)
   *
   * @date     2018-03-08
   * @author   yanzhenggang<robinyzg@hotmail.com>
   */
  constructor(config) {
    if (FunSee.prototype.__instance === undefined) {
      this.initializeFunSee(config);
      FunSee.prototype.__instance = this;
    }

    return FunSee.prototype.__instance;
  }

  get logger() {
    return this[_logger];
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

  initializeFunSee(config) {
    // 根据环境加载不同的config
    this[_config] = configLoader(config);

    // valid the config file for FunSee
    validateFunSeeConfig(this.config);

    // add log for Funsee instance
    this[_logger] = new FunSeeLogger(this.config.log || {});
    // attach logger into Koa
    this.config.middleware.forEach((element) => {
      if (element.desc === 'FunSeeLogger') {
        element.param = this.config.log;
      }
    });

    this.logger.silly(`FunSee: ${version}: Init`);

    // set Koa App
    this[_app] = createApp();

    this[_app].keys = ['Funsee is a really good project'];
    this[_app].context.fsConfig = this[_app].context.fsConfig || this[_config].customParam || {};

    // load important file for Funsee
    this.importantFileLoader();

    // add service into Funsee
    attachService(this.config, this.app);

    // load midderware for KOA app
    middlewareAppender(this);

    // add router
    routerCreator(this.app, this.serverRouters);
  }

  importantFileLoader() {
    // collect server router
    const routeConfig = combineServerRoute();
    this[_serverRouters] = routeConfig;
  }

  startup() {
    this.app.listen(this.config.port);
    this.logger.info('listening at port: ', this.config.port);
  }

  use(mid) {
    this.app.use(mid);
  }
}

FunSee.connect = require('./tool/connector');

module.exports = FunSee;
