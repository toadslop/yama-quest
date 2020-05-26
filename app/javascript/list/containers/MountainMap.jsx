// import external components
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapGL, { Popup, NavigationControl, FullscreenControl, ScaleControl } from 'react-map-gl';
import { fitBounds, lngLatToWorld } from 'viewport-mercator-project';
import mapboxgl from 'mapbox-gl';

// import internal components
import MountainInfo from '../components/MountainInfo'
import MountainMarkers from '../components/MountainMarkers'

mapboxgl.accessToken = process.env.MAPBOX_KEY;

class MountainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
        height: 200,
        width: 200
      },
      popupInfo: null,
      boundsSet: false
    };
  }

  screenVertical = (viewport) => {
    const {height, width} = viewport
    return height > width
  }

  addMarginToMap = (bounds) => {
    const { northeast, southwest } = bounds
    const shiftVert = (northeast[0] - southwest[0]) * 0.05
    const shiftHor = (northeast[1] - southwest[1]) * 0.15
    northeast[0] += shiftVert;
    southwest[0] -= shiftVert;
    northeast[1] += shiftHor;
    southwest[1] -= shiftHor;
    return { northeast, southwest }
  }

  radians_to_degrees = (radians) => {
    const pi = Math.PI;
    return radians * (180/pi);
  }

  getSlope = (coords) => {
    return (coords.y2 - coords.y1) / (coords.x2 - coords.x1)
  }

  getAngle = (slopes) => {
    const { m1, m2 } = slopes
    const radians = Math.atan(Math.abs((m2 - m1) / (1 + m1*m2)))
    const degrees = this.radians_to_degrees(radians)
    return -degrees
  }
  getBearing = (viewport) => {
    const { bounds } = this.props.mapData
    const boxCoords = {y2: viewport.height, y1: 0, x2: viewport.width, x1: 0}
    const convertedNortheast = lngLatToWorld(bounds.northeast)
    const convertedSouthwest = lngLatToWorld(bounds.southwest)
    const markerCoords = {
      y2: convertedNortheast[1],
      y1: convertedSouthwest[1],
      x1: convertedNortheast[0],
      x2: convertedSouthwest[0]
    }

    const boxSlope = this.getSlope(boxCoords)
    const markerSlope = this.getSlope(markerCoords)
    const slopes = { m1: boxSlope, m2: markerSlope }
    return this.getAngle(slopes)
  }

  onClickMarker = mountain => {
    this.setState({popupInfo: mountain});
  };

  renderPopup() {
    const {popupInfo} = this.state;
    const {coordinates} = (popupInfo ? popupInfo.geometry : [0,0])
    return (
      popupInfo && (
        <Popup
          className="popup"
          tipSize={5}
          anchor="top"
          longitude={coordinates[0]}
          latitude={coordinates[1]}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <MountainInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  updateViewport = viewport => {  
    if (this.state.boundsSet) {
      viewport.bearing = this.getBearing(viewport)
      this.setState({viewport})
    } else {
      this.setBounds(viewport)
    }
  };

  setBounds = (viewport) => {
    let { bounds } = this.props.mapData
    if (this.screenVertical(viewport)) {
      bounds = this.addMarginToMap(bounds)
    }
    console.log(bounds)
    const options = {
      height: viewport.height,
      width: viewport.width,
      bounds: [bounds.northeast, bounds.southwest]
    }
    viewport = fitBounds(options);
    this.setState({viewport, boundsSet: true})
  }
  
  render() {
    const { mapData } = this.props
    const { geojson } = mapData;
    const { features } = geojson;
    const { viewport } = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/haiji/ckacho7mr2xse1ipfgqs7zwye"
        onViewportChange={this.updateViewport}
        mapboxApiAccessToken={process.env.MAPBOX_KEY}
      >
        <MountainMarkers data={features} onClick={this.onClickMarker} />
        {this.renderPopup()}

        <div className="map-control">
          <FullscreenControl />
        </div>
        <div className="map-nav-control">
          <NavigationControl />
        </div>
        <div className="map-scale-control">
          <ScaleControl />
        </div>
      </MapGL>
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
    sidebar: state.sidebar,
    mapData: state.mapData,
    locale: state.locale
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MountainMap);