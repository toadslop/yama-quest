// import external components
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl'; // remember to delete later
import MapGL, { Popup, NavigationControl, FullscreenControl, ScaleControl } from 'react-map-gl';
import WebMercatorViewport, { fitBounds } from 'viewport-mercator-project';

// import internal components
import MountainInfo from '../components/MountainInfo'
import MountainMarkers from '../components/MountainMarkers'
import fitViewportToFeature from '../resources/fitViewport'

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
      popupInfo: null
    };
  }

  updateViewport = viewport => {
    this.setState({viewport});
  };

  componentDidMount() {
    const { bounds } = this.props.mapData
    const options = {
      height: this.mapRef.clientHeight,
      width: this.mapRef.clientWidth,
      bounds: [bounds.northeast, bounds.southwest]
    }
    const viewport = fitBounds(options)
    this.setState({viewport});
  }
  
  render() {
    const { mapData } = this.props
    const { geojson } = mapData;
    const { features } = geojson;
    const { viewport } = this.state;

    return (
      <div className="map-container" ref={mapContainer => this.mapRef = mapContainer}>
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/haiji/ckacho7mr2xse1ipfgqs7zwye"
          onViewportChange={this.updateViewport}
          mapboxApiAccessToken={process.env.MAPBOX_KEY}
        >
          {/* <MountainMarkers data={features} /> */}
          {/* onClick={this._onClickMarker}  add to above line*/}
          {/* {this._renderPopup()} */}

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
    sidebar: state.sidebar,
    mapData: state.mapData,
    locale: state.locale
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MountainMap);