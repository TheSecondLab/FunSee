const merge = require('lodash.merge');

const defaultConfig = require('../../config/defaultFunSeeConfig');

module.exports = (constConfig) => {
  let funSeeConfig = {};
  try {
    funSeeConfig = require(`${global.__ROOT_PATH__}/config/funsee.${process.env.NODE_ENV}.js`);
  } catch (e) {
    console.warn(`<funsee.${process.env.NODE_ENV}.js> is not existed when the env is "${process.env.NODE_ENV}" `);
  }

  return merge(defaultConfig, funSeeConfig, constConfig);
}