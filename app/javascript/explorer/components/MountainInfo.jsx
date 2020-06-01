import React, { Component } from 'react';
import withSizes from 'react-sizes';
import { Swipeable } from 'react-swipeable'


//TODO Refactor this component
class MountainInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onInfo: true,
      popupHeight: 200
    }
  }

  renderInfo = (info) => {
    const { description } = info.properties;
    const { altitude, terrain, effort, length } = description;
    return (
      <div className="info-div">
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

  leftSwipe = (info) => {
    const content = this.renderImg(info)
    this.setState({ mobileContent: content, onInfo: false })
  }

  rightSwipe = (info) => {
    const content = this.renderInfo(info);
    this.setState({mobileContent: content, onInfo: true })
  }

  renderMobileContent = (info) => {
    const config = {
      delta: 10,                             // min distance(px) before a swipe starts
      preventDefaultTouchmoveEvent: false,   // preventDefault on touchmove, *See Details*
      trackTouch: true,                      // track touch input
      trackMouse: false,                     // track mouse input
      rotationAngle: 0,                      // set a rotation angle
    }
    const { title } = info.properties

    return (
      <Swipeable
        onSwipedLeft={() => this.leftSwipe(info) }
        onSwipedRight={() => this.rightSwipe(info) }
        {...config} >
        <div id="mobile-content"
          style={{
            width: `${Math.floor(window.innerWidth*0.6)}px`,
            height: `${this.state.popupHeight}px`
          }} 
          className="main-box">
          <h3>{I18n.t(`mountains.${title}`)}</h3>
          <div className="popup-content">
            {this.state.mobileContent}
          </div>
        </div>
      </Swipeable>
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
    if (!currentMountain.properties.title) { return }
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