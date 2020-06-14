import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSidebarContent, fetchSubGeojson } from './../actions';

class ListNameHeader extends Component {

  componentDidMount() {
    const { list } = this.props
    this.props.fetchSidebarContent(list.name)
  }

  handleClick = () => {
    const { list } = this.props
    this.props.fetchSubGeojson(list.name, event.target.id)
  }

  renderList = () => {
    const { regionsList } = this.props
    if ( this.regionsList === [] ) {
      return <div></div>
    } else {
      return regionsList.map((region) => {
          return (
            <h3
              key={region.id}
              id={region.id}
              className={`sidebar-item ${I18n.locale}`}
              onClick={this.handleClick}
            >
              {I18n.t(`regions.${region.name}`)}
            </h3>
          )
        }
      )
    }
    
  }

  render() {
    const { sidebar } = this.props
    const mobileClass = ( sidebar.visible ? 'visible' : '')
    
    return (
      <div className={`mountain-sidebar ${mobileClass}`}>
        <h2 className={I18n.locale}>{I18n.t('left-sidebar.area')}</h2>
        <div className="area-list">
          { this.renderList() }
        </div>
      </div>
    );
  }
}

// TODO: Add functionality to change the markers displayed based on the region clicked
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchSidebarContent, fetchSubGeojson },
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