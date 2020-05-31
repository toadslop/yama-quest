import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CenterNav extends Component {
  render() {
    const { mobileClass} = this.props
    return (
      <div className={`center-group ${mobileClass}`}>
        <i className="fas fa-mountain nav-icon"></i>
        <i className="fas fa-user nav-icon"></i>
        <i className="fas fa-scroll nav-icon"></i>
        <i className="fas fa-home nav-icon"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(CenterNav);
