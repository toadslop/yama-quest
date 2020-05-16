import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo from 'images/logo.png'

class LeftNav extends Component {
  render() {
    const { mobileClass } = this.props
    return (
      <div className={`left-group ${mobileClass}`}>
        <div className="logo-holder">
          <img className="nav-logo" src={logo} />
        </div>
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
