import {
  cleanup,
  render
} from '@testing-library/react';

import React from 'react';

import {
  Provider
} from 'react-redux';

import configureStore from 'redux-mock-store';

import {
  PRIMARY
} from 'app/constants';

import {
  Themes
} from 'app/theme/theme';

import {
  Loader
} from '../loader';

const initState = {
  theme: Themes.primary,
  currentTheme: PRIMARY,
  tasks: [],
  task: {},
  isUpdatingTask: false,
  isLoading: false,
  showPopup: false,
  isError: false,
  isSubmittingTask: false,
  reminderTasks: [],
  updatedId: '',
};

const mockStore = configureStore();

afterEach(cleanup);

describe('Loader', () => {

  const store = mockStore(initState);

  it('render without crashing',() => {

    const { queryByTestId, } = render(<Provider store={store}><Loader /></Provider>);

    expect(queryByTestId('loader')).toBeTruthy();

  });

});

