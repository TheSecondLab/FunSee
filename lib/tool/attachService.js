const { requestMid } = require('funsee-request');

const attachService = (config, app) => {
  if (config.service && config.service.default) {
    requestMid(config.service, app);
  }
};

module.exports = attachService;
