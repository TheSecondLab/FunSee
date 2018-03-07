const fs = require('fs');

/**
 * 判断传入路径是否是文件夹
 *
 * 判断传入路径是否是文件夹， 是就啥都不做， 不是就打一堆错误log， 且throw一个error
 * 目前仅为initial内部使用
 *
 * @param    {string}  path     文件夹路径
 * @returns  void
 *
 * @date     2018-02-17
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
const _isDirectory = (_path) => {
  if (!fs.statSync(_path).isDirectory()) {
    console.error(`FunSee: Could not found ${_path} folder under your workspace!`);
    console.error(`Hint: Please check whether you have the ${_path} folder under the folder you run the command.`);
    throw Error(`FunSee: Could not found ${_path} folder under your workspace!`);
  }
};

/**
 * 验证FunSee的config是否合格
 *
 * 验证FunSee的config是否合格， 让错误出现的更早一点， 应避免运行时报错。
 * 所以所有可能产生运行时出错的验证， 都应在此处做检查
 *
 * @param    {object}  config     FunSee的配置文件
 * @returns  void
 *
 * @date     2018-02-17
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
const validateFunSeeConfig = () => {
  // 检查真实项目文件夹下是否存在views文件夹
  _isDirectory(`${global.__ROOT_PATH__}/views`);

  // 检查真实项目文件夹下是否存在server/routers文件夹
  _isDirectory(`${global.__ROOT_PATH__}/server/routers`);

  // 检查真实项目文件夹下是否存在dist文件夹
  _isDirectory(`${global.__ROOT_PATH__}/dist`);
};


module.exports = {
  validateFunSeeConfig
};
