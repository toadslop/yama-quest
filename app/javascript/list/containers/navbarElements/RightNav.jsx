import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setLocale } from '../../actions';

class RightNav extends Component {
  handleClick = () => {
    const newLocale = (I18n.locale === 'en' ? 'jp' : 'en')
    this.props.setLocale(newLocale)
  }

  render() {
    const { mobileClass } = this.props
    const localeSymbol = (I18n.locale === 'en' ? '日' : 'en')
    return (
      <div className={`right-group ${mobileClass}`}>
        <div className={`set-lang ${I18n.locale}`} onClick={this.handleClick}>{localeSymbol}</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { setLocale },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    locale: state.locale
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RightNav);
