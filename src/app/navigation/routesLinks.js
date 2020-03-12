import {
  faBell,
  faEdit,
  faHome,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import {NavLink} from "react-router-dom";

import Logo from "app/assets/logo.png";
import {Toggle} from "app/components/toggle";

export const RoutesLinks = ({toggleMenu}) => (
  <>
    <NavLink exact strict to="/">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
    </NavLink>
    <NavLink exact strict to="/">
      <FontAwesomeIcon icon={faHome} />
      Home
    </NavLink>
    <NavLink exact strict to="/reminders">
      <FontAwesomeIcon icon={faBell} />
      Reminders
    </NavLink>
    <NavLink exact strict to="/edit">
      <FontAwesomeIcon icon={faEdit} />
      Edit
    </NavLink>
    <a style={styles.themeSwitcher} href="#">
      <Toggle />
    </a>
    <a href="#" className="icon" onClick={toggleMenu}>
      <FontAwesomeIcon icon={faBars} />
    </a>
  </>
);

RoutesLinks.propTypes = {
  toggleMenu: PropTypes.func,
};

const styles = {
  themeSwitcher: {
    float: "right",
  },
};
