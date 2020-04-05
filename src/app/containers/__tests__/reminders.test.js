import {
  cleanup,
  fireEvent,
  render
} from '@testing-library/react';

// eslint-disable-next-line no-unused-vars
import enableMocks from 'jest-fetch-mock';

import React from 'react';

import {
  Provider
} from 'react-redux';

import {
  BrowserRouter as Router
} from 'react-router-dom';

import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import {
  PRIMARY
} from 'app/constants';

import {
  Themes
} from 'app/theme/theme';

import {
  Reminders
} from '../reminders';

const middleware = [thunk];

const tasks = [{
  title: 'EditTask',
  id: 'test',
  dueDate: '899090',
  status: false,
  tasks: [
    {
      id: '78u',
      status: false,
      title: 'hello',
      dueDate: '789899',
    }
  ],
},
{
  title: 'Task2',
  id: 'test2',
  dueDate: '899090',
  status: false,
  tasks: [],

}];

afterEach(cleanup);

const mockStore = configureStore(middleware);

describe('Reminders', () => {

  it('should show spinning loader', () => {

    const initState = {
      theme: Themes.primary,
      currentTheme: PRIMARY,
      tasks: [],
      isLoading: true,
    };

    const store = mockStore(initState);

    const { getByTestId, } = render(<Provider store={store}><Router><Reminders /></Router></Provider>);

    getByTestId('loader');

  });

  it('should show error popup', () => {

    const initState = {
      theme: Themes.primary,
      currentTheme: PRIMARY,
      tasks: tasks,
      showPopup: true,
      isError: true,
      isLoading: false,
      message: 'Something went wrong',
    };

    const store = mockStore(initState);

    const { queryByText, getByText, } = render(<Provider store={store}><Router><Reminders /></Router></Provider>);

    expect(queryByText(/something went wrong/i)).toBeTruthy();
    expect(queryByText(/ok/i)).toBeTruthy();

    fireEvent.click(getByText(/ok/i));

  });

});