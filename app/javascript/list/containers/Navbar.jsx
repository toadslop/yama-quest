import React, { Component } from 'react';
import LeftNav from './navbarElements/LeftNav'
import CenterNav from './navbarElements/CenterNav'
import RightNav from './navbarElements/RightNav'

class Navbar extends Component {
  render() {
    const { mobileClass } = this.props;
    return (
      <div className={`navbar ${mobileClass}`}>
        <LeftNav />
        <CenterNav />
        <RightNav />
      </div>
    );
  }
};

export default Navbar;
