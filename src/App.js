import Navbar from 'components/navigation/navbar';
import Container from 'containers/container';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import GlobalStyle from 'styles/globalStyle';

function App() {
  return (
    <Provider store={store}>
      <>
        <GlobalStyle />
        <Container>
          <Navbar>
            
          </Navbar>
        </Container>
      </>
    </Provider>
  );
}

export default App;
