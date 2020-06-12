import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSidebarContent } from './../actions';

class ListNameHeader extends Component {

  componentDidMount() {
    const { list } = this.props
    this.props.fetchSidebarContent(list.name)
  }

  render() {
    const { regionsList, sidebar } = this.props
    const mobileClass = ( sidebar.visible ? 'visible' : '')
    console.log(this.props.regionsList)
    return (
      <div className={`mountain-sidebar ${mobileClass}`}>
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

// TODO: Add functionality to change the markers displayed based on the region clicked
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchSidebarContent },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    regionsList: state.regionsList,
    locale: state.locale,
    sidebar: state.sidebar,
    list: state.list
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNameHeader);