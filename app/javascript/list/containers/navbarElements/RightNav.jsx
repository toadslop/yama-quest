import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class RightNav extends Component {
  render() {
    const { mobileClass } = this.props
    return (
      <div className={`right-group ${mobileClass}`}>
        <div className="set-lang jp">日</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RightNav);
