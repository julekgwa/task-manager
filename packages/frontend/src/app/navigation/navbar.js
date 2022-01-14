import PropTypes from 'prop-types';

import {
  connect
} from 'react-redux';

import styled, {

  css
} from 'styled-components';

const mapStateToProps = state => ({
  theme: state.theme,
});

const NavbarContainer = styled.nav`
  overflow: hidden;
  position: relative;

  a {
    float: left;
    display: block;
    color: ${props =>
    props.color || (props.theme && props.theme.anchor)};
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 20px;
    text-transform: uppercase;
  }

  a:hover ${'svg'} {
    color: ${props =>
    props && props.theme && props.theme.anchorHover};
  }

  a.active {
    color: ${props =>
    props && props.theme && props.theme.activeAnchor};
  }

  svg {
    margin-right: 3px;
  }

  .icon {
    display: none;
  }

  .logo {
    width: 70px;
    height: 70px;
    border-radius: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props =>
    props && props.theme && props.theme.backgroundColor};
    box-shadow: 5px 5px 10px
        ${props =>
    props && props.theme && props.theme.primaryShadowColor},
      -5px -5px 10px
        ${props =>
    props && props.theme && props.theme.secondaryShadowColor};

    img {
      height: 40px;
    }
  }

  a:not(:first-child) {
    margin-top: 15px;
  }

  .login {
    a {
      text-decoration: none;
    }

    nav {
      font-family: monospace;
    }

    ul {
      background: darkorange;
      list-style: none;
      margin: 0;
      padding-left: 0;
    }

    li {
      color: #fff;
      display: block;
      float: left;
      padding: 1rem;
      position: relative;
      text-decoration: none;
      transition-duration: 0.5s;
    }

    li a {
      color: #fff;
    }

    li:hover,
    li:focus-within {
      background: red;
      cursor: pointer;
    }

    li:focus-within a {
      outline: none;
    }

    ul li ul {
      background: orange;
      visibility: hidden;
      opacity: 0;
      min-width: 5rem;
      position: absolute;
      transition: all 0.5s ease;
      margin-top: 1rem;
      left: 0;
      display: none;
    }

    ul li:hover > ul,
    ul li:focus-within > ul,
    ul li ul:hover,
    ul li ul:focus {
      visibility: visible;
      opacity: 1;
      display: block;
    }

    ul li ul li {
      clear: both;
      width: 100%;
    }
  }

  @media screen and (max-width: 480px) {
    a:not(:first-child) {
      display: none;
    }
    a.icon {
      float: right;
      display: block;
    }
  }

  ${props =>
    props.active &&
    css`
      a:not(:first-child) {
        display: block;
      }
      a.icon {
        position: absolute;
        right: 0;
        top: 0;
      }
      a {
        float: none;
        display: block;
        text-align: left;
      }
    `}
`;

NavbarContainer.propTypes = {
  color: PropTypes.string,
  theme: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
};

export const NavBar = connect(mapStateToProps)(NavbarContainer);
