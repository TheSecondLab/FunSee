const mergeWith = require('lodash.mergewith');

const defaultConfig = require('../../config/defaultFunSeeConfig');

const customizer = (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

/**
 * 合并各个config配置
 *
 * config有默认配置，new FunSee时传入的config， 还有真实项目中的funsee.<env>.js
 * 这个方法是合并这3者
 *
 * @param    {object}  constConfig     new FunSee时传入的config
 * @returns  object
 *
 * @date     2018-02-23
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
module.exports = (constConfig, logger) => {
  let funSeeConfig = {};
  try {
    funSeeConfig = require(`${global.__ROOT_PATH__}/config/funsee.${process.env.NODE_ENV}.js`);
  } catch (e) {
    logger.warn(`<funsee.${process.env.NODE_ENV}.js> is not existed when the env is "${process.env.NODE_ENV}" `);
  }

  return mergeWith(defaultConfig, funSeeConfig, constConfig, customizer);
};
