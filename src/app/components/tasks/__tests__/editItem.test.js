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
  NOTIFICATION_MESSAGE,
  PRIMARY
} from 'app/constants';

import {
  Themes
} from 'app/theme/theme';

import {
  EditItem
} from '../editItem';

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

describe('EditItem', () => {

  const task = {
    title: 'Test',
    status: false,
    id: 'subId',
  };

  describe('Tick arrow', () => {

    jest.useFakeTimers();
    it('should update task when clicked', () => {

      const { getByTestId, queryByText, } = render(<Provider store={store}><Router><EditItem incomplete={false} task={task} /></Router></Provider>);

      const checkButton = getByTestId('update');

      act(() => {

        jest.advanceTimersByTime(1500);
        fireEvent.click(checkButton);

      });

      // no expect, will throw an error if id doesn't exists
      getByTestId('loader');
      expect(queryByText(NOTIFICATION_MESSAGE.updated)).toBeTruthy();

    });

  });

  describe('Show due date', () => {

    it('should show due date', () => {

      const { queryByTestId, } = render(<Provider store={store}><Router><EditItem task={task} showDueDate={true} /></Router></Provider>);

      expect(queryByTestId('due-date-container')).toBeTruthy();
      expect(queryByTestId('due-date')).toBeTruthy();
      expect(queryByTestId('trash-button')).toBeTruthy();

    });

  });

  describe('Subtask edit link', () => {

    it('should show a link for subtask', () => {

      render(<Provider store={store}><Router><EditItem rootTask={false} task={task} showDueDate={true} /></Router></Provider>);

      expect(document.querySelector("a").getAttribute("href")).toBe('/edit/subId/subtask');

    });

  });

  describe('Delete task button', () => {

    it('should change notification message', () => {

      const { queryByText, getByTestId, } = render(<Provider store={store}><Router><EditItem rootTask={false} task={task} showDueDate={true} /></Router></Provider>);

      const trashButton = getByTestId('trash-button');

      fireEvent.click(trashButton);

      expect(queryByText(NOTIFICATION_MESSAGE.deleted)).toBeTruthy();

    });

  });

  describe('mapDispatchToProps', () => {

    it('should render without crashing', () => {

      const { getByTestId, } = render(<Provider store={store}><Router><EditItem task={task} showDueDate={true} /></Router></Provider>);

      const update = getByTestId('update');
      const remove = getByTestId('trash-button');

      //  will crash the app, if the functions are not defined in mapDispatchToProps
      fireEvent.click(update);
      fireEvent.click(remove);

    });

  });

});

