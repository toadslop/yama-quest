import React, { PureComponent } from 'react';

export default class MountainInfo extends PureComponent {
  render() {
    const { feature } = this.props;
    const { title, description } = feature.properties;
    const { altitude, terrain, effort, length } = description;

    return (
      <div>
        <div>
          <h3>{I18n.t(`mountains.${title}`)}</h3>
          <p>{I18n.t(`attributes.altitude`)}: {altitude}m</p>
          <p>{I18n.t(`attributes.terrain`)}: {terrain}</p>
          <p>{I18n.t(`attributes.effort`)}: {effort}</p>
          <p>{I18n.t(`attributes.length`)}: {I18n.t(`lengths.${length}`)}</p>
        </div>
        {/* add an image later <img width={240} src={info.image} /> */}
      </div>
    );
  }
}