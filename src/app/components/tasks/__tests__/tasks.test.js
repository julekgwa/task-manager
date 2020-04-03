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
  PRIMARY
} from 'app/constants';

import {
  Themes
} from 'app/theme/theme';

import {
  Tasks
} from '../tasks';

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

describe('Tasks', ()=> {

  it('should display no tasks when tasks is not provided', () => {

    const { queryByText, } = render(<Provider store={store}><Router><Tasks onAddSubTask={()=>{}} /></Router></Provider>);

    expect(queryByText(/no tasks/i)).toBeTruthy();

  });

  it('should display tasks', () => {

    const { queryByText, queryAllByTestId, } = render(<Provider store={store}><Router><Tasks tasks={tasks} onAddSubTask={()=>{}} /></Router></Provider>);

    expect(queryAllByTestId('add')).toBeTruthy();
    expect(queryAllByTestId('remove')).toBeTruthy();
    expect(queryByText(/edittask/i)).toBeTruthy();
    expect(queryByText(/task2/i)).toBeTruthy();

  });

  it('should call default function', () => {

    const { getAllByTestId, } = render(<Provider store={store}><Router><Tasks tasks={tasks} /></Router></Provider>);

    const firstAdd = getAllByTestId('add')[0];

    fireEvent.click(firstAdd);

  });

});
