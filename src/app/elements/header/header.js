import {
  connect 
} from 'react-redux';

import styled, {
  css 
} from 'styled-components';

const HeaderContainer = styled.h1`
${props =>
    props &&
  props.vertical &&
  css`
    writing-mode: vertical-rl;
    margin-left: -30px;
    margin-bottom: 20px;
  `}
  color: ${props =>
    (props && props.color) ||
    (props.theme && props.theme.headerColor)};
`;

const mapStateToProps = state => ({
  theme: state.app.theme
});

export const Header = connect(mapStateToProps)(HeaderContainer);
