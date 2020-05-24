// import external components
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapGL, { Popup, NavigationControl, FullscreenControl, ScaleControl } from 'react-map-gl';
import { fitBounds } from 'viewport-mercator-project';
import mapboxgl from 'mapbox-gl';

// import internal components
import MountainInfo from '../components/MountainInfo'
import MountainMarkers from '../components/MountainMarkers'

mapboxgl.accessToken = process.env.MAPBOX_KEY;

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px'
};

class MountainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null,
      boundsSet: false
    };
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
      this.setState({viewport})
    } else {
      this.setBounds(viewport)
    }
  };

  setBounds = (viewport) => {
    const { bounds } = this.props.mapData
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

        <div style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <div style={scaleControlStyle}>
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