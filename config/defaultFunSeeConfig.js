const { FunSeeLoggerMid } = require('funsee-logger');

/**
 *
 * config: {
 *   port<number>: node启动端口号
 *   middleware<array of optionObj>: 配置FunSee所使用的第三方中间件, optionObj如下
 *   customMiddleware<array of optionObj>: 配置FunSee所使用的自定义中间件, optionObj如下
 * }
 *
 * ------------------------------------------------------------------
 *
 * optionObj: {
 *  name<string || function>: 中间件。1.传入字符串str， 将会在<project>/server/middleware下找到str.js的文件并传入koa
 *                                   2. 传入require(<pkgName>), 第三方中间件须以这种方式传入
 *  param<any || array of any>: 传入中间件的参数。 如果是array的话，将会把数组的每一项依次传入中间件
 *  needApp<bool>: 是否需要app传入中间件， 需要的话会再中间件的使用方法最后传入app
 *  desc<string>: 打印日志用, 希望可以标识你的中间件
 *  sort<string>: 中间件传入funsee的顺序，程序中会将次转为数字， 非数字或为空会被转为9999
 * }]
 *
 */
module.exports = {
  port: 8080,
  middleware: [{
    name: require('koa-compress'),
    desc: 'koa-compress',
    sort: '1000'
  }, {
    name: require('koa-bodyparser'),
    desc: 'koa-bodyparser',
    sort: '1500'
  }, {
    name: FunSeeLoggerMid,
    desc: 'FunSeeLogger',
    sort: '1600'
  }, {
    name: require('koa-views'),
    desc: 'koa-views',
    sort: '2000',
    param: [`${global.__ROOT_PATH__}/dist`, {
      map: {
        html: 'ejs'
      }
    }]
  }, {
    name: require('koa-static'),
    desc: 'koa-static',
    sort: '3000',
    param: `${global.__ROOT_PATH__}/dist`
  }],
  customMiddleware: [{
    name: 'serverSideRender',
    sort: '4000'
  }]
};
