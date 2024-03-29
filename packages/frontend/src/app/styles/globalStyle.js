import {
  connect
} from 'react-redux';

import {
  createGlobalStyle
} from 'styled-components';

const mapStateToProps = state => ({
  theme: state.theme,
});

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Signika', sans-serif;
    background-color: ${props =>
    props && props.theme && props.theme.backgroundColor}
  }

  h1 {
    color: ${props => props && props.theme && props.theme.headerColor}
  }
  p {
    color: ${props => props && props.theme && props.theme.paragraph}
  }

  button {
    color: ${props => props && props.theme && props.theme.headerColor};
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    border-style: none;
    font-size: 16px;
    cursor: pointer;
    display: block;
  }
`;

export const GlobalStyle = connect(mapStateToProps)(GlobalStyles);
