import React, { Component } from 'react';
import LeftNav from './navbarElements/LeftNav'
import CenterNav from './navbarElements/CenterNav'

class Navbar extends Component {
  render() {
    const { mobileClass } = this.props;
    return (
      <div className={`navbar ${mobileClass}`}>
        <LeftNav />
        <CenterNav />
      </div>
    );
  }
};

export default Navbar;

{/* <div class="navbar">
  
  
  <div class="right-group">
    <% if I18n.locale == I18n.default_locale %>
      <%= link_to "日", { locale: 'jp' }, class: "set_lang jp" %>
    <% else %>
      <%= link_to "En", { locale: nil }, class: "set_lang en" %>
    <%end%>
  </div>
</div> */}