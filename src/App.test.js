import {
  act,
  fireEvent,
  render
} from '@testing-library/react';

import React from 'react';

import {
  NEON
} from 'app/constants';

import {
  store
} from 'app/redux/store';

import {
  App
} from './App';

fetch.mockResponseOnce(JSON.stringify({
  result: [],
}, {
  status: 200,
}));

describe('App', () => {

  it('renders without crashing', () => {

    const { queryByTestId, } = render(<App />);

    expect(queryByTestId('home-header')).toBeTruthy();

  });

  it('should change the theme of the page', () => {

    const { getByTestId, } = render(<App />);

    const switcher = getByTestId('switch-theme');

    act(() => {

      fireEvent.click(switcher);

    });

    expect(store.getState().currentTheme).toBe(NEON);

  });

});
