/**
 * ------------------------------------------------------------------
 * port<number>: node启动端口号
 * ------------------------------------------------------------------
 * middleware<array of optionObj>: 配置FunSee所使用的第三方中间件
 * optionObj: {
 *  name<string>: 中间件名字, npm包名
 *  param<any || array>: 传入中间件的参数, 如果是array的话，将会把数组的每一项依次传入中间件
 *  needApp<bool>: 是否需要app传入中间件， 需要的话会再中间件的使用方法最后传入app
*   desc<string>: 打印日志用
 * }]
 * ------------------------------------------------------------------
 *  customMiddleware<array of optionObj>: 配置FunSee所使用的自定义中间件
 *  optionObj: {
 *   name<string>: 中间件名字, npm包名
 *   param<any || array>: 传入中间件的参数, 如果是array的话，将会把数组的每一项依次传入中间件
 *   needApp<bool>: 是否需要app传入中间件， 需要的话会再中间件的使用方法最后传入app，
 *   desc<string>: 打印日志用, 不传则使用name代替
 *  }]
 * ------------------------------------------------------------------
 */
module.exports = {
  port: 8080,
  middleware: [{
    name: require('koa-compress'),
    desc: 'koa-compress'
  }, {
    name: require('koa-views'),
    desc: 'koa-views',
    param: [`${global.__ROOT_PATH__}/dist`, {
      map: {
        html: 'ejs'
      }
    }]
  }, {
    name: require('koa-static'),
    desc: 'koa-static',
    param: `${global.__ROOT_PATH__}/dist`
  }],
  customMiddleware: [{
    name: 'serverSideRender'
  }]
};
