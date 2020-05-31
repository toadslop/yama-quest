import React, { Component } from 'react';
import LeftNav from './navbarElements/LeftNav'
import CenterNav from './navbarElements/CenterNav'
import RightNav from './navbarElements/RightNav'

class Navbar extends Component {
  render() {
    const { mobileClass } = this.props;
    return (
      <div className={`navbar ${mobileClass}`}>
        <LeftNav mobileClass={`left-${mobileClass}`} />
        <CenterNav mobileClass={`center-${mobileClass}`} />
        <RightNav mobileClass={`right-${mobileClass}`} />
      </div>
    );
  }
};

export default Navbar;
