import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ListNameHeader extends Component {
  render() {
    const { mountains } = this.props
    return (
      <div>
        {mountains.map((mountain) => {
          return <p>{mountain.name}</p>
        })}
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
    mountains: state.mountains
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNameHeader);