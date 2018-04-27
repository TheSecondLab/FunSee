const { requestMid } = require('funsee-request');

const attachService = (config, app) => {
  if (config.service && config.service.default) {
    requestMid(app, config.service);
  }
};

module.exports = attachService;
