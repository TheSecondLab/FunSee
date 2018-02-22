const fs = require('fs');
const path = require('path');

/**
 * 初始化global变量
 *
 * 项目启动初期， 为NodeJs准备整个FunSee所需要的环境变量， 并放置于global中。
 *
 * @param    void
 * @returns  void
 *
 * @date     2018-02-17
 * @author   yanzhenggang<robinyzg@hotmail.com>
 */
const initGlobalVariable = () => {
  // 存放实际项目的根目录, 如果项目启动命令没在根目录跑， 那十有八九Funsee会挂
  global.__ROOT_PATH__ = process.cwd();

  // 实际项目中FunSee的文件夹位置
  global.__FS_PATH__ = path.resolve(__dirname, '../../');

  // 存放node_env, 由于公司内docker镜像是通过DEPLOY_ENV来判断环境， 所以预设
  if (process.env.DEPLOY_ENV) 
    process.env.NODE_ENV = process.env.DEPLOY_ENV === 'prd' ? 'production' : process.env.DEPLOY_ENV;
  global.__NODE_ENV__ = process.env.NODE_ENV;
};

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
const _isDirectory = (path) => {
  if (!fs.statSync(path).isDirectory()) {
    console.error(`FunSee: Could not found ${path} folder under your workspace!`);
    console.error(`Hint: Please check whether you have the ${path} folder under the folder you run the command.`);
    throw Error(`FunSee: Could not found ${path} folder under your workspace!`);
  }
}

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
const validateFunSeeConfig = (config) => {
  // 检查真实项目文件夹下是否存在views文件夹
  _isDirectory(`${global.__ROOT_PATH__}/views`);

  // 检查真实项目文件夹下是否存在server/routers文件夹
  _isDirectory(`${global.__ROOT_PATH__}/server/routers`);

  // 检查真实项目文件夹下是否存在dist文件夹
  _isDirectory(`${global.__ROOT_PATH__}/dist`);
}


module.exports = {
  initGlobalVariable,
  validateFunSeeConfig
}