import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.MAPBOX_KEY;

class MountainMap extends Component {
  constructor(props) {
    super(props);
      this.state = {
      };
    }

  componentDidMount() {
    const { mapData } = this.props

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/haiji/ckacho7mr2xse1ipfgqs7zwye',
      center: [mapData.center.lng, mapData.center.lat],
      zoom: 5,
      bearing: -25
    });
    map.addControl(new mapboxgl.NavigationControl());

    mapData.geojson.features.forEach(function(marker) {

      const el = document.createElement('i');
      el.className = 'marker fas fa-mountain';
    
      new mapboxgl.Marker(el, {offset: [40/2, 40/2]})
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 5 }) // add popups
        .setHTML(`
          <h3>${marker.properties.title}</h3>
          <p>Altitude: ${marker.properties.description.altitude}m</p>
          <p>Terrain difficulty: ${marker.properties.description.terrain}</p>
          <p>Physical Difficulty: ${marker.properties.description.effort}</p>
          <p>Trip length: ${marker.properties.description.length}</p>
        `))
        .addTo(map);
    });
  }
  
  render() {
    const { sidebar } = this.props
    const mobileClass = (sidebar.visible ? 'sidebar-visible' : '')
    return (
      <div className={`main-box ${mobileClass}`}>
        <div ref={el => this.mapContainer = el} className="mapContainer" />
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
    mapData: state.mapData
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MountainMap);