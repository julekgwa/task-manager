import { connect } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

const mapStateToProps = state => ({
  theme: state.theme
});

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props =>
      props && props.theme && props.theme.backgroundColor}
  }

  h1 {
    color: ${props => props && props.theme && props.theme.heading}
  }
  p {
    color: ${props => props && props.theme && props.theme.paragraph}
  }
`;

export default connect(mapStateToProps)(GlobalStyle);
