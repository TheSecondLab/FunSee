const middlewareAppender = require('../lib/tool/middlewareAppender');

const config = require('../config/defaultFunSeeConfig');

const appCreator = require('../lib/tool/appCreator');

const app = appCreator();

middlewareAppender(app, config);