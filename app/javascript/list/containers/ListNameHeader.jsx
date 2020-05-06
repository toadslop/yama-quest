import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ListNameHeader extends Component {
  render() {
    const { list } = this.props
    return (
      <div>
        <h1 className={`list-header ${I18n.locale}`}>{list.name}</h1>
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
    list: state.list
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNameHeader);
