import {
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
  Themes
} from 'app/theme/theme';

import {
  Navigation
} from '../navigation';

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
};

const mockStore = configureStore([thunk]);
const store = mockStore(initState);

describe('Navigation', () => {

  it('should render navigation links and toggle mobile view', () => {

    const { getByTestId, } = render(<Provider store={store}><Navigation /></Provider>);

    const mobile = getByTestId('mobile');

    fireEvent.click(mobile);

  });

});