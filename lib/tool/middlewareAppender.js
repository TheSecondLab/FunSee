const fs = require('fs');

/**
 * 转换中间件需要的参数
 *
 * 将配置文件中的param字段转换为中间件所可以接受的参数
 *
 * @param    {any}     param     中间件配置对象的param属性
 * @param    {bool}    needApp   是否需要往中间件内传入koa app, true的话， 会再param数组随后传入app
 * @param    {Koa app} param
 * @returns  array               返回参数数组
 *
 * @date     2018-02-17
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
const _convertParam = (param, needApp, app) => {
  let _param = [];

  if (Array.isArray(param)) {
    _param = param;
  } else {
    _param = param === undefined ? [] : [param];
  }

  return !needApp ? _param : _param.concat(app);
};

/**
 * 通过传入的mid返回真实middleware
 *
 * 如果传入的mid是第三方库则直接返回， 不然则认为是自定义库
 *
 * @param    {string || Function}  mid     中间件
 * @returns  Function   koa可实际使用的中间件
 *
 * @date     2018-02-17
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
const _lookForMiddleware = (mid) => {
  if (mid instanceof Function) {
    return mid;
  }

  if (fs.existsSync(`${global.__FS_PATH__}/dist/middleware/${mid}.js`)) {
    return require(`../middleware/${mid}`);
  }

  if (fs.existsSync(`${global.__ROOT_PATH__}/server/middleware/${mid}.js`)) {
    return require(`${global.__ROOT_PATH__}/server/middleware/${mid}`);
  }

  throw Error(`Could not found middleware: ${mid}`);
};

/**
 * #private# 真正的中间件挂载器
 *
 * 读取中间件配置对象数组， 挂载中间件至koa app上
 *
 * @param    {object}  app     Koa App
 * @param    {array}   mids    中间件配置对象数组
 * @returns  void
 *
 * @date     2018-02-17
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
const _realAppender = (app, mids, logger) => {
  if (!Array.isArray(mids)) return;

  mids.forEach((midObj) => {
    const {
      name, param, needApp, desc, sort
    } = midObj;
    const mid = _lookForMiddleware(name);

    const _param = _convertParam(param, needApp, app);
    logger.silly(`挂载中间件: ${sort} -- ${desc || name}`);
    app.use(mid.apply(this, _param));
  });
};

/**
 * 将指定key转换为数字型， 不能转换的设置为9999
 *
 * @param    {string}  key     对象的属性
 * @returns  数组的map方法
 *
 * @date     2018-03-21
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
const _transferKeyToNumber = key => (mid) => {
  mid[key] = Number.isNaN(Number(mid[key])) ? 9999 : Number(mid[key]);
  return mid;
};

/**
 * 按指定的key来排序的数组排序方法
 *
 * 适用于对象数组， 按照数组中储存的对象的某个指定的key来做升序排列
 *
 * @param    {string}  key     对象的属性
 * @returns  数组排序方法
 *
 * @date     2018-03-21
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
const _sortByKey = key => (a, b) => a[key] - b[key];

/**
 * 合并并排序中间件数组
 *
 * 将配置中的第三方中间件和自定义中间件数组合并为一个数组，
 * 并按照sort的字段排序
 *
 * @param    {array}  mids       第三方中间件
 * @param    {array}  custMids   自定义中间件
 * @returns  合并且排序后的数组
 *
 * @date     2018-03-21
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
const _mergeSortMiddlewares = (mids, custMids) => [...mids, ...custMids].map(_transferKeyToNumber('sort')).sort(_sortByKey('sort'));

/**
 * FunSee挂载器壳壳
 *
 * 读取配置文件，往koa app上挂在中间件
 *
 * @param    {object}  app     Koa App
 * @param    {object}  config  FunSee的config文件
 * @returns  void
 *
 * @date     2018-02-17
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
const middlewareAppender = ({ app, config, logger }) => {
  // 合并中间件
  const mids = _mergeSortMiddlewares(config.middleware, config.customMiddleware);

  // 挂在中间件
  _realAppender(app, mids, logger);
};

module.exports = middlewareAppender;
