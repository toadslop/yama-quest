// External imports
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setLocale } from '../../actions';
import { Link } from 'react-router-dom';

// Internal imports
import { getLangBase } from '../../index';

class RightNav extends Component {
  handleClick = () => {
    const newLocale = (I18n.locale === 'en' ? 'jp' : 'en')
    this.props.setLocale(newLocale)
  }

  render() {
    const langBase = getLangBase();
    const { mobileClass } = this.props
    const localeSymbol = (I18n.locale === 'en' ? '日' : 'en')
    return (
      <div className={`right-group ${mobileClass}`}>
        <Link to={`${langBase}/explorer/${this.props.list.name}`}>
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
