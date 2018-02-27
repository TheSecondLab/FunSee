const { createStore, compose, applyMiddleware } = require('redux');

module.exports = (state = {}) => {

  const reducer = require('/Users/robin/Documents/project/FS/FunSeeBoilerplate/test/reducer');

  console.log('rrrrr', reducer)
  const store = createStore(reducer);

  // store.close = () => store.dispatch(createSagaMiddleware.END);

  return store;
};
