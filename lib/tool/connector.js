const React = require('react');
const { connect } = require('react-redux');

module.exports = (mapStateToProps, mapDispatchToProps) => (WrappedComp) => {
  class Connector extends React.Component {
    render() {
      return <WrappedComp {...this.props} />;
    }
  }

  // const ConnectedComp = 

  return connect(mapStateToProps, mapDispatchToProps)(Connector);
};
