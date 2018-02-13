const convertParam = (param, needApp, app) => {
  let _param = [];

  if (Array.isArray(param)) {
    _param = param;
  } else {
    _param = param === undefined ? [] : [param];
  }

  return !needApp ? _param : _param.concat(app);
}

const middlewareAppender = (app, mids) => {
  if(!Array.isArray(mids)) return;

  mids.forEach((midObj) => {
    try {
      const { name, param, needApp } = midObj;
      const mid = require(name);

      const _param = convertParam(param, needApp, app);

      app.use(mid.apply(this, _param))
    } catch(err) {
      console.error(`FunSeeError - <middlewareAppender> : ${err.message}`);
    }
  });
};

module.exports = middlewareAppender;
