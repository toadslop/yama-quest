import React, { Component } from 'react';
import withSizes from 'react-sizes';
import "~react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

//TODO Refactor this component
class MountainInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onInfo: true,
      popupHeight: 200,
    }
  }

  renderInfo = (info) => {
    const { description } = info.properties;
    const { altitude, terrain, effort, length } = description;
    return (
      <div className="info2">
        <p><b>{I18n.t(`attributes.altitude`)}:</b> {altitude}m</p>
        <p><b>{I18n.t(`attributes.terrain`)}:</b> {terrain}</p>
        <p><b>{I18n.t(`attributes.effort`)}:</b> {effort}</p>
        <p><b>{I18n.t(`attributes.length`)}:</b> {I18n.t(`lengths.${length}`)}</p>
      </div>
    )
  }
  
  renderDesktopContent = (info) => {
    const { img_url } = info.properties.description;
    const imgClass = (img_url ? 'popup-img' : 'img-hidden')
    const { title } = info.properties

    return (
      <div className="popup-content">
        <h3>{I18n.t(`mountains.${title}`)}</h3>
        <div className="main-box">
          {this.renderInfo(info)}
          <img className={imgClass} src={img_url} />
        </div>
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

  renderMobileContent = (info) => {
    const { title } = info.properties

    return (
      <div id="mobile-content" className="main-box"
        style={{
          width: `${Math.floor(window.innerWidth*0.6)}px`,
          height: `${this.state.popupHeight}px`
        }}
      >
      <h3>{I18n.t(`mountains.${title}`)}</h3>
      <Carousel>
        <div className="info">
          {this.renderInfo(info)}
        </div>
        <div>
          {this.renderImg(info)}
        </div>
      </Carousel>
      </div>
    )
  }

  updatePopup = (info) => {
    const content = this.renderInfo(info);
      const popupHeight = document.getElementById('mobile-content').clientHeight;
      this.setState({mobileContent: content, currentMountain: info, popupHeight})
  }

  componentDidMount() {
    const { info } = this.props;
    if (this.props.isMobile) {
      this.updatePopup(info);
    }
  }

  componentDidUpdate() {
    const { info } = this.props
    const { currentMountain } = this.state
    if (!currentMountain) { return }
    if (this.props.isMobile && currentMountain.properties.title != info.properties.title) {
      this.updatePopup(info);
    }
  }

  render() {
    const { info } = this.props;
    return (
      <div>
        {this.props.isMobile ? this.renderMobileContent(info) : this.renderDesktopContent(info)}
      </div>
    )
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
})

export default withSizes(mapSizesToProps)(MountainInfo);