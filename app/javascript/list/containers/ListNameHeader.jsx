import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ListNameHeader extends Component {
  render() {
    const { list, locale } = this.props
    return (
      <div>
        <h1 className={`list-header ${locale}`}>{list.name}</h1>
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
    list: state.list,
    locale: state.locale
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNameHeader);
