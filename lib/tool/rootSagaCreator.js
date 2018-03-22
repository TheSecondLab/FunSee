const { fork } = require('redux-saga/effects');

const sagaFilePaths = global.__CLIENT_SAGA__;
const rootSagaFilePaths = global.__COMMON_CLIENT_SAGA__;

const sagas = sagaFilePaths.map(i => fork(require(`${global.__RELATIVE_PATH__}/${i}`)));
const commonSagas = rootSagaFilePaths.map(i => fork(require(`${global.__COMMON_RELATIVE_PATH__}/${i}`)));

function* rootSaga() {
  yield sagas.concat(commonSagas);
}

module.exports = () => rootSaga;
