const { fork } = require('redux-saga/effects');

const sagaFilePaths = global.__CLIENT_SAGA__;
const sagas = sagaFilePaths.map(i => fork(require(`${global.relativePath}/${i}`)));

module.exports = function* () {
  yield sagas;
};
