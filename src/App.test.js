import {
  render
} from '@testing-library/react';

import React from 'react';

import {
  App
} from './App';

// eslint-disable-next-line no-undef
test('renders without crashing', () => {

  const { queryByTestId, } = render(<App />);

  expect(queryByTestId('home-header')).toBeTruthy();

});
