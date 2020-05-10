import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.MAPBOX_KEY;

class MountainMap extends Component {
  constructor(props) {
    super(props);
      this.state = {
        lng: 142.84879846697,
        lat: 43.527117778633,
        zoom: 15
      };
    }

  componentDidMount() {
  const map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/haiji/cka0n94d20qqd1immb3aotoo8',
    center: [this.state.lng, this.state.lat],
    zoom: this.state.zoom
   });
   map.addControl(new mapboxgl.NavigationControl());
  }
  
  render() {
    console.log(process.env.MAPBOX_KEY)
    return (
      <div className="main-box">
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MountainMap);