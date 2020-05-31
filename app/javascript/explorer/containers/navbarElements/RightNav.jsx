// External imports
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setLocale } from '../../actions';
import { Link } from 'react-router-dom';

// Internal imports
import { getLangBase } from '../../index'; // to handle i18n rounting

class RightNav extends Component {
  handleClick = () => {
    this.props.setLocale()
  }

  render() {
    const langBase = getLangBase();
    const { mobileClass } = this.props
    const { name } = this.props.list
    const localeSymbol = (I18n.locale === 'en' ? '日' : 'en')
    return (
      <div className={`right-group ${mobileClass}`}>
        <Link to={`${langBase}/explorer/${name}`}>
          <div className={`set-lang ${I18n.locale}`} onClick={this.handleClick}>{localeSymbol}</div>
        </Link>
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
    locale: state.locale,
    list: state.list
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RightNav);
