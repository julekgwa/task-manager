import {
  faBars,
  faBell,
  faHome,
  faSignOutAlt,
  faUser
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
  PRIMARY
} from 'app/constants';

import {
  logout,
  setTheme,
  showLogin
} from 'app/redux/actions';

const mapStateToProps = state => ({
  theme: state.theme,
  currentTheme: state.currentTheme,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  themeSwitcher: () => dispatch(setTheme()),
  showLoginForm: (payload) => dispatch(showLogin(payload)),
  logoutUser: () => dispatch(logout()),
});

const Links = ({
  toggleMenu,
  theme,
  themeSwitcher,
  currentTheme,
  showLoginForm,
  user,
  logoutUser,
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
    { user.login

      ? <React.Fragment>
        <a style={styles.themeSwitcher} onClick={logoutUser} href='#logout'>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </a>

        <a style={styles.themeSwitcher} href='#login'>
          <FontAwesomeIcon icon={faUser} />
          {user.name}
        </a>
      </React.Fragment>
      : <a style={styles.themeSwitcher} onClick={() => showLoginForm({
        login: true,
      })} href='#login'>
      Login/Signup
      </a>

    }
    <a style={styles.themeSwitcher} href='#switch'>
      <Switch
        theme={theme}
        data-testid='switch-theme'
        checked={currentTheme === PRIMARY ? false : true}
        onChange={themeSwitcher}
      />
    </a>
    <a href='#mobile' className='icon' onClick={toggleMenu}>
      <FontAwesomeIcon data-testid='mobile' icon={faBars} />
    </a>
  </React.Fragment>
);

Links.propTypes = {
  toggleMenu: PropTypes.func,
  theme: PropTypes.object,
  themeSwitcher: PropTypes.func,
  currentTheme: PropTypes.string,
  showLoginForm: PropTypes.func,
  user: PropTypes.object,
  logoutUser: PropTypes.func,
};

export const RoutesLinks = connect(
  mapStateToProps,
  mapDispatchToProps
)(Links);

const styles = {
  themeSwitcher: {
    float: 'right',
  },
};
