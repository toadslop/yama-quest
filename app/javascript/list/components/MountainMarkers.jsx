import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';

const SIZE = 20;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class MountainMarkers extends PureComponent {
  render() {
    const {data, onClick} = this.props;
    return data.map((mountain, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={mountain.geometry.coordinates[0]}
        latitude={mountain.geometry.coordinates[1]}
        offsetLeft={-5}
        offsetTop={-5}
        className="marker"
      >
        <i className="fas fa-mountain" onClick={() => onClick(mountain)}></i>
      </Marker>
    ));
  }
}