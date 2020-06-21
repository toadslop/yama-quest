import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { WebMercatorViewport } from 'viewport-mercator-project';
import { FlyToInterpolator } from 'react-map-gl';
import * as d3 from 'd3-ease';

import { fetchSidebarContent, setSubGeojson, setViewport, toggleSidebar, resetData } from './../actions';
import { subGeojson } from './../functions'

class ListNameHeader extends Component {

  componentDidMount() {
    const { list } = this.props
    this.props.fetchSidebarContent(list.name)
  }

  adjustViewport = (bounds) => {
    let { viewport } = this.props
    console.log("adjust viewport", bounds)
    const {longitude, latitude, zoom} = (
      bounds[0][0] === bounds[1][0] ? 
      {latitude: bounds[0][1], longitude: bounds[0][0], zoom: 18} :
      new WebMercatorViewport(viewport)
        .fitBounds([bounds[0], bounds[1]], {
          padding: 100
        }));

    viewport = {
        ...this.props.viewport,
        longitude,
        latitude,
        zoom,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: d3.easeCubic
    }
    this.props.setViewport(viewport);
  };

  handleClick = () => {
    const { mapData } = this.props
    const newGeojson = subGeojson(mapData.features, parseInt(event.target.id))
    const sidebarVisible = (this.props.sidebar.visible ? false : true)
    this.props.toggleSidebar(sidebarVisible);
    this.props.setSubGeojson(newGeojson);
    this.adjustViewport(newGeojson.geojson.bounds);
    
  }

  handleAllClick = () => {
    const { masterData } = this.props
    this.props.resetData(masterData)
    const sidebarVisible = (this.props.sidebar.visible ? false : true)
    this.props.toggleSidebar(sidebarVisible)
    this.adjustViewport(masterData.bounds);
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
          <h3 className={`sidebar-item ${I18n.locale}`} onClick={this.handleAllClick}>All</h3>
          { this.renderList() }
        </div>
      </div>
    );
  }
}

// TODO: Add functionality to change the markers displayed based on the region clicked
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchSidebarContent, setSubGeojson, setViewport, toggleSidebar, resetData },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    regionsList: state.regionsList,
    locale: state.locale,
    sidebar: state.sidebar,
    list: state.list,
    mapData: state.mapData.geojson,
    viewport: state.mapViewport,
    masterData: state.mapData.masterData
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNameHeader);