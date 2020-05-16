import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    const { mobileClass } = this.props;
    return (
      <div className={`navbar ${mobileClass}`}>
      </div>
    );
  }
};

export default Navbar;