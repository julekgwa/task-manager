import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

const mapStateToProps = state => ({
  theme: state.theme
});

const NavbarContainer = styled.nav`
  overflow: hidden;
  position: relative;

  a {
    float: left;
    display: block;
    color: ${props => props.color || (props.theme && props.theme.anchor)};
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 20px;
    text-transform: uppercase;
  }

  a:hover ${`svg`} {
    color: ${props => props && props.theme && props.theme.anchorHover};
  }

  a.active {
    color: ${props => props && props.theme && props.theme.activeAnchor};
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
    background: ${props => props && props.theme && props.theme.backgroundColor};
    box-shadow: 5px 5px 10px
        ${props => props && props.theme && props.theme.boxShadowPrimaryColor},
      -5px -5px 10px
        ${props => props && props.theme && props.theme.boxShadowSecondaryColor};

    img {
      height: 40px;
    }
  }

  a:not(:first-child) {
    margin-top: 15px;
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
  active: PropTypes.bool.isRequired
};

export const NavBar = connect(mapStateToProps)(NavbarContainer);
