/* eslint-env browser */

const React = require('react');
const { connect } = require('react-redux');

module.exports = (mapStateToProps, mapDispatchToProps) => (WrappedComp) => {
  class Connector extends React.Component {
    static pageInit(store, rootSaga) {
      const action = WrappedComp.pageInit instanceof Function ? WrappedComp.pageInit() : {};

      // page service server render
      if (action instanceof Function) {
        const promise = store.runSaga(rootSaga()).done;
        store.dispatch(action());
        return promise;
      }

      console.error('PageInit should return a function');
      return Promise.resolve();
    }

    componentWillMount() {
      if (typeof window === 'undefined') {
        return;
      }
      const { pageTitle } = WrappedComp;
      document.title = pageTitle || document.title;
    }

    render() {
      return <WrappedComp {...this.props} />;
    }
  }


  return connect(mapStateToProps, mapDispatchToProps)(Connector);
};
