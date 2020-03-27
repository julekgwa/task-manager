import React from 'react';

import {
  Provider 
} from 'react-redux';

import {
  Container 
} from 'app/containers/container';

import {
  Navigation 
} from 'app/navigation/navigation';

import {
  store 
} from 'app/redux/store';

import {
  GlobalStyle 
} from 'app/styles/globalStyle';

function App() {

  return (
    <Provider store={store}>
      <React.Fragment>
        <GlobalStyle />
        <Container>
          <Navigation />
        </Container>
      </React.Fragment>
    </Provider>
  );

}

// eslint-disable-next-line import/no-default-export
export default App;
