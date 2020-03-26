import {
  faBars,
  faBell,
  faHome
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React from 'react';

import Switch from 'react-neumorphic-toggle';

import {
  connect 
} from 'react-redux';

import {
  NavLink 
} from 'react-router-dom';

import Logo from 'app/assets/logo.png';

import {
  setTheme 
} from 'app/redux/actions';

import {
  PRIMARY 
} from 'app/redux/constants';

const mapStateToProps = state => ({
  theme: state.app.theme,
  currentTheme: state.app.currentTheme
});

const mapDispatchToProps = dispatch => ({
  themeSwitcher: () => dispatch(setTheme())
});

const Links = ({
  toggleMenu,
  theme,
  themeSwitcher,
  currentTheme
}) => (
  <React.Fragment>
    <NavLink exact strict to='/'>
      <div className='logo'>
        <img src={Logo} alt='logo' />
      </div>
    </NavLink>
    <NavLink exact strict to='/'>
      <FontAwesomeIcon icon={faHome} />
      Home
    </NavLink>
    <NavLink exact strict to='/reminders'>
      <FontAwesomeIcon icon={faBell} />
      Reminders
    </NavLink>
    <a style={styles.themeSwitcher} href='#'>
      <Switch
        theme={theme}
        checked={currentTheme === PRIMARY ? false : true}
        onChange={themeSwitcher}
      />
    </a>
    <a href='#' className='icon' onClick={toggleMenu}>
      <FontAwesomeIcon icon={faBars} />
    </a>
  </React.Fragment>
);

Links.propTypes = {
  toggleMenu: PropTypes.func,
  theme: PropTypes.object,
  themeSwitcher: PropTypes.func,
  currentTheme: PropTypes.string
};

export const RoutesLinks = connect(
  mapStateToProps,
  mapDispatchToProps
)(Links);

const styles = {
  themeSwitcher: {
    float: 'right'
  }
};
