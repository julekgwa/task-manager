import {
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
  Form
} from './form';

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

it('renders correctly', () => {

  const { container, } = render(<Form />);

  expect(container.firstChild).toBeNull();

});

describe('Add new task form', () => {

  const mockStore = configureStore();

  let store;

  it('should render the form', () => {

    store = mockStore(initState);
    const show = true;

    const { queryByTestId, queryByPlaceholderText, } = render(<Provider store={store}><Form show={show} /></Provider>);

    expect(queryByTestId('close-button')).toBeTruthy();
    expect(queryByTestId('add-button')).toBeTruthy();
    expect(queryByPlaceholderText('Add task')).toBeTruthy();

  });

});