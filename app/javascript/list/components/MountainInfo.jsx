import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class MountainInfo extends Component {
  render() {
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
    locale: state.locale
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MountainInfo);