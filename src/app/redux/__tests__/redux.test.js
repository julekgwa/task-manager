import {
  fireEvent,
  render,
  waitFor
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
  Edit
} from 'app/containers/edit';

import {
  Themes
} from 'app/theme/theme';

const match = {
  params: {
    taskId: 'test',
  },
};

const middleware = [thunk];

const initialTasks = [
  {
    title: 'Root Task',
    id: 'test',
    status: false,
    tasks: [
      {
        title: 'Sub 1',
        id: 'test1',
        status: false,
        tasks: [
          {
            title: 'Sub 3',
            id: 'test2',
            status: false,
            tasks: [
              {
                title: 'Sub 4',
                id: 'test3',
                status: false,
                tasks: [],
              }

            ],
          }
        ],
      }
    ],
  },
  {
    title: 'Root task 2',
    status: false,
    id: 'test4',
    tasks: [
      {
        title: 'Sub 2',
        status: false,
        id: 'test5',
        tasks: [],
      }
    ],
  }
];

const initState = {
  theme: Themes.primary,
  currentTheme: PRIMARY,
  tasks: initialTasks,
  task: {},
  isUpdatingTask: true,
  isLoading: false,
  showPopup: false,
  isError: false,
  isSubmittingTask: false,
  reminderTasks: [],
};

const mockStore = configureStore(middleware);
const store = mockStore(initState);

describe('redux store and action creators', () => {

  beforeEach(() => {

    fetch.resetMocks();

  });

  it('should get tasks from store', async () => {

    fetch.mockResponseOnce(JSON.stringify([{
      title: 'Test',
      id: '6767',
      status: false,
      dueDate: '989898988',
    }]));

    const { getByText, } = render(<Provider store={store}><Router><Edit match={match} /></Router></Provider>);

    await waitFor(() => {

      getByText(/root task/i);

    });

  });

  it.only('should update task to done', async() => {

    fetch.mockResponseOnce(JSON.stringify([{
      title: 'Test',
      id: '6767',
      status: false,
      dueDate: '989898988',
    }]));

    const { getAllByTestId,  } = render(<Provider store={store}><Router><Edit match={match} /></Router></Provider>);

    await waitFor(() => {});

    const update = getAllByTestId('update');

    fireEvent.click(update[1]);

  });

});