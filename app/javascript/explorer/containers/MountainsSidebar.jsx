import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { WebMercatorViewport } from 'viewport-mercator-project';
import { FlyToInterpolator } from 'react-map-gl';
import * as d3 from 'd3-ease';

import { fetchSidebarContent, fetchSubGeojson, setViewport } from './../actions';

class ListNameHeader extends Component {

  componentDidMount() {
    const { list } = this.props
    this.props.fetchSidebarContent(list.name)
  }

  adjustViewport = () => {
    const { bounds } = this.props.mapData.geojson
    let { viewport } = this.props
    console.log("new bounds on click", bounds)
    console.log("previous viewport", viewport)
    const {longitude, latitude, zoom} = new WebMercatorViewport(viewport)
        .fitBounds([bounds[0], bounds[1]], {
          padding: 60
        });
    viewport = {
        ...this.props.viewport,
        longitude,
        latitude,
        zoom,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: d3.easeCubic
    }
    console.log("new viewport", viewport);
    this.props.setViewport(viewport);
  };

  handleClick = () => {
    const { list } = this.props
    this.props.fetchSubGeojson(list.name, event.target.id).
    then(() => {
      this.adjustViewport();
    });
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
    { fetchSidebarContent, fetchSubGeojson, setViewport },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    regionsList: state.regionsList,
    locale: state.locale,
    sidebar: state.sidebar,
    list: state.list,
    mapData: state.mapData,
    viewport: state.mapViewport
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNameHeader);