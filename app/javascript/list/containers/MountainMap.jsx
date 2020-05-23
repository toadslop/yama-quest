import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl'; // remember to delete later
import MapGL, { Popup, NavigationControl, FullscreenControl, ScaleControl } from 'react-map-gl';

mapboxgl.accessToken = process.env.MAPBOX_KEY;

class MountainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
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
    this.renderMap()
    this.renderMarkers()
    const { map, markers } = this.state
    console.log(markers);
    markers.forEach(function(marker) {
      marker.addTo(map);
    })
  }
  
  componentDidUpdate() {
    this.renderMarkers()
    const { map, markers } = this.state
    markers.forEach(function(marker) {
      marker.addTo(map);
    })
  }
  
  render() {
    const { sidebar, locale } = this.props
    const mobileClass = (sidebar.visible ? 'sidebar-visible' : '')
    return (
      <div className={`main-box ${mobileClass}`}>
        <div locale={locale} ref={el => this.mapContainer = el} className="mapContainer" />
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