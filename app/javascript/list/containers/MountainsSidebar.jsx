import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ListNameHeader extends Component {
  render() {
    const { regionsList } = this.props
    return (
      <div className="mountain-sidebar">
        <h2 className={I18n.locale}>{I18n.t('left-sidebar.area')}</h2>
        <div className="area-list">
          {regionsList.map((region) => {
            return(
              <h3 key={region.id} className={`sidebar-item ${I18n.locale}`}>{I18n.t(`regions.${region.name}`)}</h3>
            )
          })}
        </div>
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
    regionsList: state.regionsList,
    locale: state.locale
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNameHeader);