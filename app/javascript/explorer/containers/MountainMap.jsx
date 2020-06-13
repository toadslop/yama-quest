// import external components
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapGL, { Popup, NavigationControl, FullscreenControl, ScaleControl } from 'react-map-gl';
import { fitBounds, lngLatToWorld } from 'viewport-mercator-project';
import { throttle } from 'lodash';

// import internal components
import MountainInfo from '../components/MountainInfo'
import MountainMarkers from '../components/MountainMarkers'

// import action creators
import { fetchGeojson, fetchMapBounds } from '../actions';

// import internal fuctions
import {
  screenVertical,
  addMarginToMap,
  getSlope,
  getAngle
} from '../functions'

// TODO: replace the state with redux state
class MountainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        height: 200,
        width: 200
      }
    };
    this.handleUpdateThrottled = throttle(this.updateViewport, 100)
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
          longitude={coordinates[0]}
          latitude={coordinates[1]}
          offsetTop={0}
          anchor={'top'}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
          dynamicPosition={true}
        >
          <MountainInfo locale={this.props.locale} info={popupInfo} />
        </Popup>
      )
    );
  }

  // takes a viewport hash and a hash of map data and returns the bearing
  // for the map such that the most extreme data points in all directions
  // are angled to minimize empty space on the map
  // IMPORTANT: RELIES ON lngLatToWorld from 'viewport-mercator-project'

  getBearing = (viewport, bounds) => {
    // the coordinates of the viewport height with bottom-left defined as 0,0
    const boxCoords = { y2: viewport.height, y1: 0, x2: viewport.width, x1: 0 }

    // these convert lng and lat to a flat mercator projection to match a flat rendered mercator map
    const convertedNortheast = lngLatToWorld(bounds.northeast)
    const convertedSouthwest = lngLatToWorld(bounds.southwest)

    // det the data above into a convenient hash for calculating
    const markerCoords = {
      y2: convertedNortheast[1],
      y1: convertedSouthwest[1],
      x1: convertedNortheast[0],
      x2: convertedSouthwest[0]
    }
  
    const boxSlope = getSlope(boxCoords)
    const markerSlope = getSlope(markerCoords)
    const slopes = { m1: boxSlope, m2: markerSlope }
    return getAngle(slopes)
  }

  updateViewport = (viewport) => {  
    const { bounds } = this.props

    if (this.state.boundsSet) {
      viewport.bearing = this.getBearing(viewport, bounds)
      this.setState({viewport})
    } else {
      this.setBounds(viewport)
    }
  };

  // IMPORTANT: relies on fitBounds from 'viewport-mercator-project';
  setBounds = (viewport) => {
    let { bounds } = this.props
    if (screenVertical(viewport)) {
      bounds = addMarginToMap(bounds)
    }
    
    const options = {
      height: viewport.height,
      width: viewport.width,
      bounds: [bounds.northeast, bounds.southwest]
    }
    viewport = fitBounds(options);
    this.setState({viewport, boundsSet: true})
  }

  componentWillMount() {
    const { list } = this.props
    this.props.fetchMapBounds(list.name)
    this.props.fetchGeojson('lists', list.name)
  }

  renderMarkers = (features) => {
    if (features) {
      return <MountainMarkers data={features} onClick={this.onClickMarker} />
    } else {
      return <div></div>
    }
  }
  
  render() {
    const { geojson } = this.props;
    const { viewport } = this.state;
    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/haiji/ckacho7mr2xse1ipfgqs7zwye"
        onViewportChange={this.handleUpdateThrottled}
        mapboxApiAccessToken={process.env.MAPBOX_KEY}
      >
        {this.renderMarkers(geojson.features)}
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

// TODO: replace map state with redux state
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchGeojson, fetchMapBounds },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
    mapData: state.mapData,
    bounds: state.mapData.bounds,
    geojson: state.mapData.geojson,
    locale: state.locale,
    list: state.list
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MountainMap);