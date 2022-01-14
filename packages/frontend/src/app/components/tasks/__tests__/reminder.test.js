import {
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
  TaskReminder
} from '../reminder';

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

const tasks = [{
  title: 'EditTask',
  _id: 'test',
  dueDate: '899090',
  status: false,
  tasks: [
    {
      _id: '78u',
      status: false,
      title: 'hello',
      dueDate: '789899',
    }
  ],
},
{
  title: 'EditTask2',
  _id: 'test2',
  dueDate: '899090',
  status: false,

}];

describe('Reminders', () => {

  it('should display no tasks when there are no tasks', () => {

    const { queryByText, } = render(<Provider store={store}><TaskReminder /></Provider>);

    expect(queryByText(/no tasks/i)).toBeTruthy();

  });

  it('should display number of tasks due in the next 24 hours',() => {

    const { queryByText, } = render(<Provider store={store}><Router><TaskReminder tasks={tasks} /></Router></Provider>);

    expect(queryByText(/you have 2 tasks/i)).toBeTruthy();

  });

});

