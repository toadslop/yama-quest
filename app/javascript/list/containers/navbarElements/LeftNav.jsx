import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LeftNav extends Component {
  render() {
    const { mobileClass } = this.props
    return (
      <div className={`left-group ${mobileClass}`}>
        <div className="logo-holder"></div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {  },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
