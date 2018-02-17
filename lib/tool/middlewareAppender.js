const convertParam = (param, needApp, app) => {
  let _param = [];

  if (Array.isArray(param)) {
    _param = param;
  } else {
    _param = param === undefined ? [] : [param];
  }

  return !needApp ? _param : _param.concat(app);
}

const lookForMiddleware = (mid) => {
  if(mid instanceof Function) {
    return mid;
  }

  /* *************************************************************** */
  /* TODO: 根据不一样的情况加载不同的文件夹下的middleware                  */
  /* *************************************************************** */
  return require(`../middleware/${mid}`);
}

const realAppender = (app, mids) => {
  if(!Array.isArray(mids)) return;

  mids.forEach((midObj) => {
    console.log(midObj);
    try {
      const { name, param, needApp } = midObj;
      const mid = lookForMiddleware(name);

      const _param = convertParam(param, needApp, app);

      app.use(mid.apply(this, _param));
    } catch(err) {
      console.error(`FunSeeError - <middlewareAppender> : ${err.message}`);
    }
  });
};

const middlewareAppender = (app, config) => {
  realAppender(app, config.middleware);
  realAppender(app, config.customMiddleware);
};

module.exports = middlewareAppender;
