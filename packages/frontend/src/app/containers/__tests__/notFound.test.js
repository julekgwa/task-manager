import {
  render
} from '@testing-library/react';

import React from 'react';

import {
  Provider
} from 'react-redux';

import {
  BrowserRouter as Router
} from 'react-router-dom';

import configureStore from 'redux-mock-store';

import {
  Themes
} from 'app/theme/theme';

import PageNotFound from '../pageNotFound';

const mockStore = configureStore();

const store = mockStore({
  theme: Themes.primary,
});

describe('Page not fount', () => {

  it('should show page not found', () => {

    const { queryByText, } = render(<Provider store={store}><Router><PageNotFound /></Router></Provider>);

    expect(queryByText(/looks like you got lost/i)).toBeTruthy();
    expect(queryByText(/go back home/i)).toBeTruthy();

  });

});
