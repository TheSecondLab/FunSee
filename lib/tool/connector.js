const React = require('react');
const { connect } = require('react-redux');

module.exports = (mapStateToProps, mapDispatchToProps) => (WrappedComp) => {
  class Connector extends React.Component {
    static testInit() {
      if (WrappedComp.good instanceof Function) {
        return WrappedComp.good;
      }

      return null;
    }
    render() {
      console.log('good', WrappedComp.good);
      return <WrappedComp {...this.props} />;
    }
  }

  // const ConnectedComp =

  return connect(mapStateToProps, mapDispatchToProps)(Connector);
};
