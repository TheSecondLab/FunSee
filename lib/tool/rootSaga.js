const { fork } = require('redux-saga/effects');

const sagaFilePaths = __WEBPACK_REPLACE_CLIENT_SAGA__;
const sagas = sagaFilePaths.map(i => fork(require(__WEBPACK_REPLACE_SHARDED_RELATIVE_PATH__ + '/' + i)));

module.exports = function* () {
  yield sagas;
};
