import React, { Component } from 'react';
import LeftNav from './navbarElements/LeftNav'

class Navbar extends Component {
  render() {
    const { mobileClass } = this.props;
    return (
      <div className={`navbar ${mobileClass}`}>
        <LeftNav />
      </div>
    );
  }
};

export default Navbar;

{/* <div class="navbar">
  
  <div class="center-group">
    <%= link_to list_path(1) do %>
      <i class="fas fa-mountain nav-icon"></i>
    <% end %>
    <i class="fas fa-user nav-icon"></i>
    <i class="fas fa-scroll nav-icon"></i>
    <i class="fas fa-home nav-icon"></i>
  </div>
  <div class="right-group">
    <% if I18n.locale == I18n.default_locale %>
      <%= link_to "日", { locale: 'jp' }, class: "set_lang jp" %>
    <% else %>
      <%= link_to "En", { locale: nil }, class: "set_lang en" %>
    <%end%>
  </div>
</div> */}