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
  TaskItem
} from '../taskItem';

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

describe('TaskItem', () => {

  it('should render without crashing', () => {

    const { queryByText, } = render(<Provider store={store}><Router><TaskItem title='Testing' taskId='789' subTasks={44} /></Router></Provider>);

    expect(queryByText(/testing/i)).toBeTruthy();
    expect(queryByText(/44 Tasks/i)).toBeTruthy();

  });

  it('should call add subtask function',() => {

    const addSubTask = jest.fn();
    const { getByTestId, } = render(<Provider store={store}><Router><TaskItem addSubTask={addSubTask} title='Testing' taskId='789' subTasks={44} /></Router></Provider>);

    fireEvent.click(getByTestId('add'));

    expect(addSubTask).toHaveBeenCalled();

  });

  it('should show loader after clicking remove button', () => {

    const { getByTestId, } = render(<Provider store={store}><Router><TaskItem title='Testing' root={true} taskId='789' subTasks={44} /></Router></Provider>);

    act(() => {

      fireEvent.click(getByTestId('remove'));

    });

    // no expect, will throw an error if id doesn't exists
    getByTestId('loader');

  });

  it('should call default function addSubTask', () => {

    const { getByTestId, } = render(<Provider store={store}><Router><TaskItem title='Testing' root={true} taskId='789' subTasks={44} /></Router></Provider>);

    fireEvent.click(getByTestId('add'));

  });

});
