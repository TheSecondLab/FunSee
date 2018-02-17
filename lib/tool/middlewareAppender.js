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
}

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
  if(mid instanceof Function) {
    return mid;
  }

  /* *************************************************************** */
  /* TODO: 加载不同文件夹下的middleware                                 */
  /* *************************************************************** */
  return require(`../middleware/${mid}`);
}

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
const _realAppender = (app, mids) => {
  if(!Array.isArray(mids)) return;

  mids.forEach((midObj) => {
    
    try {
      const { name, param, needApp, desc } = midObj;
      const mid = _lookForMiddleware(name);

      const _param = _convertParam(param, needApp, app);
      console.info(`挂载中间件: ${desc || name}`);
      app.use(mid.apply(this, _param));
    } catch(err) {
      console.error(`FunSeeError - <middlewareAppender> : ${err.message}`);
    }
  });
};

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
const middlewareAppender = (app, config) => {
  // 挂载第三方中间件
  _realAppender(app, config.middleware);

  // 挂载自定义中间件
  _realAppender(app, config.customMiddleware);
};

module.exports = middlewareAppender;
