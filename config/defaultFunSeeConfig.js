const path = require('path')

/**
 * ------------------------------------------------------------------
 * middleware: [{
 *  name<string>: 中间件名字, npm包名
 *  param<any || array>: 传入中间件的参数, 如果是array的话，将会把数组的每一项依次传入中间件
 *  needApp<bool>: 是否需要app传入中间件， 需要的话会再中间件的使用方法最后传入app
 * }]
 * ------------------------------------------------------------------
 */
module.exports = {
  port: 8080,
  middleware: [{
    name: require('koa-compress')
  }, {
    name: require('koa-views'),
    param: [path.resolve(__dirname, '../views'), {
      map: {
        html: 'ejs'
      }
    }]
  }],
  customMiddleware: [{
    name: 'serverSideRender'
  }]
};
