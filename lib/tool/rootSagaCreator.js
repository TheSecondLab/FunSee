const { fork } = require('redux-saga/effects');

const sagaFilePaths = global.__CLIENT_SAGA__;
const sagas = sagaFilePaths.map(i => fork(require(global.__RELATIVE_PATH__ + '/' + i)));

function* rootSaga() {
  yield sagas;
};

module.exports = () => rootSaga;
