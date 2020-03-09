import styled, { css } from 'styled-components';

const Navbar = styled.nav`
  background-color: #333;
  overflow: hidden;
  position: relative;

  a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }

  a:hover {
    background-color: #ddd;
    color: black;
  }

  a.active {
    background-color: #4caf50;
    color: white;
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

export default Navbar;
