import React, { Component } from 'react';
import withSizes from 'react-sizes';
import { Swipeable } from 'react-swipeable'

class MountainInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onInfo: true,
      popupHeight: 197
    }
  }

  renderInfo = (info) => {
    const { description } = info.properties;
    const { altitude, terrain, effort, length } = description;
    return (
      <div>
        <p>{I18n.t(`attributes.altitude`)}: {altitude}m</p>
        <p>{I18n.t(`attributes.terrain`)}: {terrain}</p>
        <p>{I18n.t(`attributes.effort`)}: {effort}</p>
        <p>{I18n.t(`attributes.length`)}: {I18n.t(`lengths.${length}`)}</p>
      </div>
    )
  }
  
  renderDesktopContent = (info) => {
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

  renderMobileContent = (info) => {
    const config = {
      delta: 10,                             // min distance(px) before a swipe starts
      preventDefaultTouchmoveEvent: false,   // preventDefault on touchmove, *See Details*
      trackTouch: true,                      // track touch input
      trackMouse: false,                     // track mouse input
      rotationAngle: 0,                      // set a rotation angle
    }
    const { title } = info.properties
    console.log(this.state.popupHeight)

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

  componentDidMount() {
    if (this.props.isMobile) {
      const { info } = this.props;
      const content = this.renderInfo(info);
      const popupHeight = document.getElementById('mobile-content').clientHeight;
      this.setState({mobileContent: content, currentMountain: info, popupHeight})
    }
  }

  componentDidUpdate() {
    const { info } = this.props
    const { currentMountain } = this.state
    if (this.props.isMobile && currentMountain.properties.title != info.properties.title) {
      const content = this.renderInfo(info);
      const popupHeight = document.getElementById('mobile-content').clientHeight;
      this.setState({mobileContent: content, currentMountain: info, popupHeight})
    }
  }

  render() {
    const { info } = this.props;
    return (
      <div>{this.props.isMobile ? this.renderMobileContent(info) : this.renderDesktopContent(info)}</div>
    )
  }
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
})

export default withSizes(mapSizesToProps)(MountainInfo);