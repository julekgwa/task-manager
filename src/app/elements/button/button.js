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

const ButtonContainer = styled.button`
  font-family: 'Playfair Display', serif;
  outline:none;
  background: ${props =>
    props && props.theme && props.theme.backgroundColor};
  box-shadow: 10px 10px 20px
      ${props =>
    props && props.theme && props.theme.primaryShadowColor},
    -10px -10px 20px
      ${props =>
    props && props.theme && props.theme.secondaryShadowColor};

  &:hover {
    box-shadow: inset 10px 10px 20px
      ${props =>
    props && props.theme && props.theme.primaryShadowColor},
   inset -10px -10px 20px
      ${props =>
    props && props.theme && props.theme.secondaryShadowColor};
  }

  ${props =>
    props.circle &&
    css`
      border-radius: 100%;
      width: 50px;
      height: 50px;
      border-style: none;
      padding: 0;
      background: ${props =>
    props && props.theme && props.theme.backgroundColor};
      box-shadow: 5px 5px 10px
          ${props =>
    props &&
            props.theme &&
            props.theme.primaryShadowColor},
        -5px -5px 10px
          ${props =>
    props &&
            props.theme &&
            props.theme.secondaryShadowColor};

      &:hover {

        box-shadow: inset 5px 5px 10px
          ${props =>
    props &&
            props.theme &&
            props.theme.primaryShadowColor},
        inset -5px -5px 10px
          ${props =>
    props &&
            props.theme &&
            props.theme.secondaryShadowColor};

      }
    `}

  ${props =>
    props.round &&
    css`
      border-radius: 180px;
      width: 200px;
      text-transform: uppercase;
    `}
`;

ButtonContainer.propTypes = {
  circle: PropTypes.bool,
  theme: PropTypes.object.isRequired,
};

export const Button = connect(mapStateToProps)(ButtonContainer);
