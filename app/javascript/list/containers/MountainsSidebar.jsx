import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ListNameHeader extends Component {
  render() {
    const { regionsList } = this.props
    return (
      <div>
        <h3>{I18n.t('left-sidebar.area')}</h3>
        {regionsList.map((region) => {
          return(
            <div key={region.id}>
              <h3>{region.name}</h3>
            </div>
          )
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
    regionsList: state.regionsList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNameHeader);