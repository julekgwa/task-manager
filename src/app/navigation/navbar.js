import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

const mapStateToProps = state => ({
  theme: state.theme
});

const Navbar = styled.nav`
  overflow: hidden;
  position: relative;

  a {
    float: left;
    display: block;
    color: ${props => props.color || props.theme && props.theme.anchor};
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

Navbar.propTypes = {
  color: PropTypes.string,
  theme: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired
}

export const Header = connect(mapStateToProps)(Navbar);
