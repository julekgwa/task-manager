import React from 'react';
import { Provider } from 'react-redux';

import Navbar from 'app/components/navigation/navbar';
import Container from 'app/containers/container';
import { store } from 'app/redux/store';
import GlobalStyle from 'app/styles/globalStyle';

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
