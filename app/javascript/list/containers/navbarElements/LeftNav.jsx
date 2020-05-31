import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleSidebar } from '../../actions';
import logo from 'images/logo.png';

class LeftNav extends Component {
  onClickBar = () => {
    const { sidebar } = this.props
    const sidebarVisible = (sidebar.visible ? false : true)
    this.props.toggleSidebar(sidebarVisible)
  }

  render() {
    const { mobileClass } = this.props
    return (
      <div className={`left-group ${mobileClass}`}>
        <i className="fas fa-bars" onClick={this.onClickBar}></i>
        <a href="/">
          <div className="logo-holder">
            <img className="nav-logo" src={logo} />
          </div>
        </a>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { toggleSidebar },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
