import {
  act,
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
  Edit
} from '../edit';

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

const initState = {
  theme: Themes.primary,
  currentTheme: PRIMARY,
  tasks: tasks,
  task: {},
  isUpdatingTask: true,
  isLoading: false,
  showPopup: false,
  isError: false,
  isSubmittingTask: false,
  reminderTasks: [],
  updatedId: 'subId',
};

const mockStore = configureStore(middleware);
const store = mockStore(initState);

describe('Edit', () => {

  it('should render without crashing', () => {

    const match = {
      params: {
        taskId: 'test',
      },
    };

    render(<Provider store={store}><Router><Edit match={match} /></Router></Provider>);

  });

  it('should display no tasks when the provided task is doesn\'t exists', () => {

    const match = {
      params: {
        taskId: 'tests',
      },
    };

    const { queryByText, } =render(<Provider store={store}><Router><Edit match={match} /></Router></Provider>);

    expect(queryByText(/no task/i)).toBeTruthy();

  });

  it('should display add task form', () => {

    const match = {
      params: {
        taskId: 'test',
      },
    };
    const { getByTestId, getByLabelText, queryByPlaceholderText,queryByTestId,getByText, } =render(<Provider store={store}><Router><Edit match={match} /></Router></Provider>);

    const addButton = getByTestId('show-form');

    fireEvent.click(addButton);

    expect(getByLabelText(/task/i)).toBeTruthy();
    expect(queryByPlaceholderText(/add task/i)).toBeTruthy();

    expect(getByLabelText(/due date/i)).toBeTruthy();

    expect(queryByTestId('close-button')).toBeTruthy();
    expect(queryByTestId('add-button')).toBeTruthy();
    expect(getByText(/close/i)).toBeTruthy();
    expect(getByText(/add task/i)).toBeTruthy();

  });

  it('should add a task and close form', () => {

    const match = {
      params: {
        taskId: 'test',
      },
    };

    const { getByTestId, getByPlaceholderText, } =render(<Provider store={store}><Router><Edit match={match} /></Router></Provider>);

    const addButton = getByTestId('show-form');

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