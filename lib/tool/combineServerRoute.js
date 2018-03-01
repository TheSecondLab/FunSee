const fs = require('fs');

/**
 * 函数功能简述
 *
 * 收集路由
 *
 * @returns  {Array}
 *
 * @date     2018-3-1
 * @author   zhaoxing<jiyiwohanxing@gmail.com>
 */
module.exports = () => {
  const routeConfig = [];
  fs.readdirSync(`${global.__ROOT_PATH__}/server/routers`)
    .forEach((item) => {
      const name = item.split('.');
      name.pop();
      routeConfig.push({
        name: `/${name.join('')}`,
        router: require(`${global.__ROOT_PATH__}/server/routers/${item}`)
      });
    });
  return routeConfig;
};

