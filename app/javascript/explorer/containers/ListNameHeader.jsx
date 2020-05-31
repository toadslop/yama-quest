import React, { Component } from 'react';
import { connect } from 'react-redux';

class ListNameHeader extends Component {
  render() {
    const { list } = this.props
    return (
      <div>
        <h1 className={`list-header ${I18n.locale}`}>{I18n.t(`lists.${list.name}`)}</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.list,
    locale: state.locale
  };
}

export default connect(mapStateToProps)(ListNameHeader);
