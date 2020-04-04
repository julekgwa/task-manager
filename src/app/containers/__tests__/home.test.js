import {
  act,
  cleanup,
  fireEvent,
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

import thunk from 'redux-thunk';

import {
  PRIMARY
} from 'app/constants';

import {
  Themes
} from 'app/theme/theme';

import {
  Home
} from '../home';

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

describe('Home', () => {

  it('should show spinning loader', () => {

    const initState = {
      theme: Themes.primary,
      currentTheme: PRIMARY,
      tasks: [],
      isLoading: true,
    };

    const store = mockStore(initState);

    const { getByTestId, } = render(<Provider store={store}><Router><Home /></Router></Provider>);

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

    const { queryByText, getByText, } = render(<Provider store={store}><Router><Home /></Router></Provider>);

    expect(queryByText(/something went wrong/i)).toBeTruthy();
    expect(queryByText(/ok/i)).toBeTruthy();

    fireEvent.click(getByText(/ok/i));

  });

  it('should show add task form', () => {

    const initState = {
      theme: Themes.primary,
      currentTheme: PRIMARY,
      tasks: tasks,
      showPopup: false,
      isError: false,
      isLoading: false,
      message: 'Something went wrong',
    };

    const store = mockStore(initState);

    const { getByTestId, getByText,queryByTestId,getByLabelText,queryByPlaceholderText, } = render(<Provider store={store}><Router><Home /></Router></Provider>);

    const button = getByTestId('show-task-form');

    fireEvent.click(button);

    const closeButton = getByTestId('close-button');

    expect(getByLabelText(/task/i)).toBeTruthy();
    expect(queryByPlaceholderText(/add task/i)).toBeTruthy();

    expect(getByLabelText(/due date/i)).toBeTruthy();

    expect(queryByTestId('close-button')).toBeTruthy();
    expect(queryByTestId('add-button')).toBeTruthy();
    expect(getByText(/close/i)).toBeTruthy();
    expect(getByText(/add task/i)).toBeTruthy();

    fireEvent.click(closeButton);

  });

  it('should add root task', () => {

    const initState = {
      theme: Themes.primary,
      currentTheme: PRIMARY,
      tasks: tasks,
      showPopup: false,
      isError: false,
      isLoading: false,
      message: 'Something went wrong',
    };

    const store = mockStore(initState);

    const { getByTestId, getByPlaceholderText, } = render(<Provider store={store}><Router><Home /></Router></Provider>);

    const addButton = getByTestId('show-task-form');

    fireEvent.click(addButton);
    const addTaskInput = getByPlaceholderText(/add task/i);

    act(() => {

      fireEvent.change(addTaskInput, {
        target: {
          value: 'todo',
        },
      });

    });

    fireEvent.click(getByTestId('add-button'));
    // after adding the task, input value is empty
    expect(addTaskInput.value).toBe('');

  });

});