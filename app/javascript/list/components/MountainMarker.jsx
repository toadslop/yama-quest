import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';

const SIZE = 20;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class MountainMarker extends PureComponent {
  render() {
    const {data, onClick} = this.props;

    return data.map((city, index) => (
      <Marker key={`marker-${index}`} longitude={city.longitude} latitude={city.latitude}>
        <svg
          height={SIZE}
          viewBox="0 0 24 24"
          style={{
            cursor: 'pointer',
            fill: '#d00',
            stroke: 'none',
            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
          }}
          // onClick={() => onClick(city)}
        >
        </svg>
      </Marker>
    ));
  }
}