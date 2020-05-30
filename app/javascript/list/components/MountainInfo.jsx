import React, { Component } from 'react';
import withSizes from 'react-sizes';
import { useSwipeable, Swipeable } from 'react-swipeable'

class MountainInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onInfo: true
    }
  }

  renderInfo = (info) => {
    const { title, description } = info.properties;
    const { altitude, terrain, effort, length } = description;

    if (this.state.onInfo) {
      return (
        <div>
          <h3>{I18n.t(`mountains.${title}`)}</h3>
          <p>{I18n.t(`attributes.altitude`)}: {altitude}m</p>
          <p>{I18n.t(`attributes.terrain`)}: {terrain}</p>
          <p>{I18n.t(`attributes.effort`)}: {effort}</p>
          <p>{I18n.t(`attributes.length`)}: {I18n.t(`lengths.${length}`)}</p>
        </div>
      )
    } else {
      return (
        <div className="popup-content">
          <img className={imgClass} src={img_url} />
        </div>
      )
    }
  }
  
  renderDesktopInfo = (info) => {
    const { img_url } = info.properties.description;
    const imgClass = (img_url ? 'popup-img' : 'img-hidden')

    return (
      <div className="popup-content">
        {this.renderInfo(info)}
        <img className={imgClass} src={img_url} />
      </div>
    )
  }

  renderImg = (info) => {
    const { img_url } = info.properties.description;
    const imgClass = 'popup-img'
    return (
      <div className="popup-content">
        <img className={imgClass} src={img_url} />
      </div>
    )
  }

  leftSwipe = (info) => {
    const content = this.renderImg(info)
    this.setState({ mobileContent: content, onInfo: false })
  }

  rightSwipe = (info) => {
    const content = this.renderInfo(info);
    this.setState({mobileContent: content, onInfo: true })
  }

  renderMobileInfo = (info) => {
    const config = {
      delta: 10,                             // min distance(px) before a swipe starts
      preventDefaultTouchmoveEvent: false,   // preventDefault on touchmove, *See Details*
      trackTouch: true,                      // track touch input
      trackMouse: false,                     // track mouse input
      rotationAngle: 0,                      // set a rotation angle
    }

    return (
      <Swipeable
        onSwipedLeft={() => this.leftSwipe(info) }
        onSwipedRight={() => this.rightSwipe(info) }
        {...config} >
        {this.state.mobileContent || this.renderInfo(info)}
      </Swipeable>
    )
  }

  render() {
    const { info } = this.props;
    return (
      <div>{this.props.isMobile ? this.renderMobileInfo(info) : this.renderDesktopInfo(info)}</div>
    )
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
})

export default withSizes(mapSizesToProps)(MountainInfo);