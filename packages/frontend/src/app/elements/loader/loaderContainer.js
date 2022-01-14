import {
  connect
} from 'react-redux';

import styled from 'styled-components';

const mapStateToProps = state => ({
  theme: state.theme,
});

const Container = styled.div`
  display: flex;
  justify-content: center;
  
  ${'svg'} {
      color: ${props => props && props.theme && props.theme.defaultColor}
  }
`;

export const LoaderContainer = connect(mapStateToProps)(Container);

