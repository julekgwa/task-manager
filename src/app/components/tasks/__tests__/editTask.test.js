import {
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
  PRIMARY,
  TASK_TYPE
} from 'app/constants';

import {
  Themes
} from 'app/theme/theme';

import {
  EditTask
} from '../editTask';

const middleware = [thunk];

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
  updatedId: 'subId',
};

const mockStore = configureStore(middleware);
const store = mockStore(initState);

describe('EditTask', () => {

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
    title: 'EditTask2',
    id: 'test2',
    dueDate: '899090',
    status: false,

  }];

  it('should show loading spinner', () => {

    const { getByTestId, } = render(<Provider store={store}><EditTask isLoading={true} /></Provider>);

    // no expect, will throw an error if id doesn't exists
    getByTestId('loader');

  });

  it('should show no tasks', () => {

    const { queryByText, } = render(<Provider store={store}><EditTask isLoading={false} /></Provider>);

    expect(queryByText(/no task/i)).toBeTruthy();

  });

  it('should show incomplete tasks', () => {

    const { queryByText, } = render(<Provider store={store}><Router><EditTask tasks={tasks} taskId='test' type={TASK_TYPE.task} isLoading={false} /></Router></Provider>);

    expect(queryByText(/editTask/i)).toBeTruthy();
    expect(queryByText(/hello/i)).toBeTruthy();

  });

  it('should call default showAddTaskForm function', () => {

    const { getByTestId, } = render(<Provider store={store}><Router><EditTask tasks={tasks} taskId='test' type={TASK_TYPE.task} isLoading={false} /></Router></Provider>);

    const showForm = getByTestId(/show-form/i);

    // will fail if the default showAddTaskForm is not a function
    fireEvent.click(showForm);

  });

});
