import {
  act,
  fireEvent,
  render
} from '@testing-library/react';

import React from 'react';

import {
  Provider
} from 'react-redux';

import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import {
  PRIMARY
} from 'app/constants';

import {
  store
} from 'app/redux/store';

import {
  Themes
} from 'app/theme/theme';

import {
  App
} from './App';

fetch.mockResponseOnce(JSON.stringify({
  result: [],
}, {
  status: 200,
}));

const initState = {
  theme: Themes.primary,
  currentTheme: PRIMARY,
  tasks: [],
  task: {},
  isUpdatingTask: true,
  isLoading: false,
  showPopup: false,
  isError: false,
  isSubmittingTask: false,
  reminderTasks: [],
  user: {},
};

const mockStore = configureStore([thunk]);
const stores = mockStore(initState);

describe('App', () => {

  it('renders without crashing', () => {

    const { queryByTestId, } = render(<Provider store={stores}><App /></Provider>);

    expect(queryByTestId('switch-theme')).toBeTruthy();

  });

  it('should change the theme of the page', () => {

    const { getByTestId, } = render(<Provider store={stores}><App /></Provider>);

    const switcher = getByTestId('switch-theme');

    act(() => {

      fireEvent.click(switcher);

    });

    expect(store.getState().currentTheme).toBe(PRIMARY);

  });

});
