import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setTheme } from 'app/redux/actions';

const mapStateToProps = state => ({
  theme: state.theme
});

const mapDispatchToProps = dispatch => ({
  themeSwitcher: () => dispatch(setTheme())
});

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;

  input {
    display: none;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props =>
      props && props.theme && props.theme.heading} !important;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: ${props => props && props.theme && props.theme.alternate};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(55px);
  }
  .slider:after {
    content: 'THEME';
    color: white;
    display: block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    font-size: 11px;
    margin-left: 5px;
  }

  input:checked + .slider:after {
    content: 'THEME';
    margin-left: -6px;
  }
`;

const Wrapper = ({ themeSwitcher, theme }) => {
  return (
    <Toggle theme={theme}>
      <input
        onClick={e => {
          e.stopPropagation();
          themeSwitcher();
        }}
        type='checkbox'
        id='togBtn'
      />
      <div className='slider round'></div>
    </Toggle>
  );
};

Wrapper.propTypes = {
  themeSwitcher: PropTypes.func,
  theme: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
