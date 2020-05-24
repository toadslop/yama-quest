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

  renderMarkers = () => {
    const { mapData } = this.props
    this.state.markers = []
    this.state.markers = mapData.geojson.features.map(function(marker) {
      const el = document.createElement('i');
      const { title, description } = marker.properties;
      const { altitude, terrain, effort, length } = description;

      el.className = 'marker fas fa-mountain';
      return new mapboxgl.Marker(el, {offset: [40/2, 40/2]})
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 5 }) // add popups
      .setHTML(`
        <h3>${I18n.t(`mountains.${title}`)}</h3>
        <p>${I18n.t(`attributes.altitude`)}: ${altitude}m</p>
        <p>${I18n.t(`attributes.terrain`)}: ${terrain}</p>
        <p>${I18n.t(`attributes.effort`)}: ${effort}</p>
        <p>${I18n.t(`attributes.length`)}: ${I18n.t(`lengths.${length}`)}</p>
      `))
    });
  }

  renderMap = () => {
    const { mapData, locale } = this.props
    const screenHorizontal = this.mapContainer.offsetWidth > this.mapContainer.offsetHeight;
    if (!screenHorizontal) {
      const { northeast, southwest } = mapData.bounds
      const shiftVert = (northeast[0] - southwest[0]) * 0.05
      const shiftHor = (northeast[1] - southwest[1]) * 0.05
      mapData.bounds.northeast[0] += shiftVert;
      mapData.bounds.southwest[0] -= shiftVert;
      mapData.bounds.northeast[1] += shiftHor;
      mapData.bounds.southwest[1] -= shiftHor;
    }
    
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/haiji/ckacho7mr2xse1ipfgqs7zwye',
      bounds: [mapData.bounds.northeast, mapData.bounds.southwest],
      locale: locale
    });
    
    const bearing = (screenHorizontal ? -25 : 0);
    map.setBearing(bearing);
    map.addControl(new mapboxgl.NavigationControl());

    this.renderMarkers(map, mapData)
    this.state.map = map;
  }

  componentDidMount() {
    //console.log(this.mapRef.clientHeight);
  }
  
  render() {
    const { mapData } = this.props
    const { geojson, bounds } = mapData;
    const { features } = geojson;
    const options = { width: 400, height: 400, bounds: [[145,45],[130,30]]}
    const viewportOptions = fitBounds(options);
    const viewport = new WebMercatorViewport(viewportOptions);

    return (
      <div className="map-container" ref={mapContainer => this.mapRef = mapContainer}>
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/haiji/ckacho7mr2xse1ipfgqs7zwye"
          // onViewportChange={this._updateViewport}
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