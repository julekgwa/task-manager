import {
  connect 
} from "react-redux";

import styled from "styled-components";

const HeaderContainer = styled.h1`
  color: ${props =>
    (props && props.color) || (props.theme && props.theme.headerColor)};
`;

const mapStateToProps = state => ({
  theme: state.theme,
});

export const Header = connect(mapStateToProps)(HeaderContainer);
