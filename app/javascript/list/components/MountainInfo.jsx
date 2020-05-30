import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withSizes from 'react-sizes';

class MountainInfo extends Component {
  renderInfo = () => {
    const { info } = this.props;
    const { title, description } = info.properties;
    const { altitude, terrain, effort, length, img_url } = description;
    const imgClass = (img_url ? 'popup-img' : 'img-hidden')

    return (
      <div className="popup-content">
        <div>
          <h3>{I18n.t(`mountains.${title}`)}</h3>
          <p>{I18n.t(`attributes.altitude`)}: {altitude}m</p>
          <p>{I18n.t(`attributes.terrain`)}: {terrain}</p>
          <p>{I18n.t(`attributes.effort`)}: {effort}</p>
          <p>{I18n.t(`attributes.length`)}: {I18n.t(`lengths.${length}`)}</p>
        </div>
        <img className={imgClass} src={img_url} />
        <div>{this.props.isMobile ? 'Is Mobile' : 'Is Not Mobile'}</div>
      </div>
    )
  }
  
  render() {
    return (
      this.renderInfo()
    )
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
})

export default withSizes(mapSizesToProps)(MountainInfo);