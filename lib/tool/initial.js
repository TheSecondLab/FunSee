const fs = require('fs');

const initGlobalVariable = () => {
  global.__ROOT_PATH__ = process.cwd();
  global.__NODE_ENV__ = process.env.DEPLOY_ENV;

  process.env.NODE_ENV = process.env.DEPLOY_ENV === 'prd' ? 'production' : process.env.DEPLOY_ENV;
};

const isDirectory = (path) => {
  if (!fs.statSync(`${global.__ROOT_PATH__}/${path}`).isDirectory()) {
    console.error(`FunSee: Could not found ${path} folder under your workspace!`);
    console.error(`Hint: Please check whether you have the ${path} folder under the folder you run the command.`);
    throw Error(`FunSee: Could not found ${path} folder under your workspace!`);
  }
}

const validateFunSeeConfig = () => {
  isDirectory('views');
  isDirectory('server/routers');
}


module.exports = {
  initGlobalVariable,
  validateFunSeeConfig
}