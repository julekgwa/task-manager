import PropTypes from "prop-types";

import React from "react";

import {
  connect 
} from "react-redux";

import {
  Switch 
} from "app/elements/switch/switch";

import {
  setTheme 
} from "app/redux/actions";

import {
  PRIMARY 
} from "app/redux/constants";

const mapStateToProps = state => ({
  theme: state.theme,
  currentTheme: state.currentTheme,
});

const mapDispatchToProps = dispatch => ({
  themeSwitcher: () => dispatch(setTheme()),
});

const SwitchContainer = ({ themeSwitcher, theme, currentTheme, }) => {

  return (
    <Switch theme={theme}>
      <input
        readOnly
        checked={currentTheme === PRIMARY ? false : true}
        onClick={themeSwitcher}
        type="checkbox"
        id="togBtn"
      />
      <div className="slider round"></div>
    </Switch>
  );

};

SwitchContainer.propTypes = {
  themeSwitcher: PropTypes.func,
  theme: PropTypes.object,
  currentTheme: PropTypes.string,
};

export const Toggle = connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchContainer);
