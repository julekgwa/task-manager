import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import {
  CLOSE_POPUP,
  ERROR,
  SET_THEME
} from 'app/constants';

import {
  addTask,
  closePopup,
  getTask,
  getTasks,
  removeTask,
  setError,
  setTheme,
  updateTask
} from '../actions';

const middleware = [thunk];

const mockStore = configureStore(middleware);

describe('actions', () => {

  afterEach(() => {

    fetch.resetMocks();

  });

  it('should create an action for setting theme', () => {

    const expectedAction = {
      type: SET_THEME,
    };

    expect(setTheme()).toEqual(expectedAction);

  });

  it('should create an action for setting error', () => {

    const expectedAction = {
      type: ERROR,
      payload: {
        error: true,
        message: 'Something went wrong',
      },
    };

    expect(setError(ERROR,expectedAction.payload)).toEqual(expectedAction);

  });

  it('should create an action for closing popup', () => {

    const expectedAction = {
      type: CLOSE_POPUP,
      payload: true,
    };

    expect(closePopup(CLOSE_POPUP, true)).toEqual(expectedAction);

  });

  it('should create GET_TASKS action', () => {

    const result = [
      {
        title: 'Test',
        id: '6767',
        status: false,
        dueDate: '989898988',
      }
    ];

    fetch.mockResponseOnce(
      JSON.stringify({
        result,
      }),
      {
        status: 200,
      }
    );

    const expectedActions = [
      {
        type: 'SET_LOADER',
        payload: true,
      },
      {
        type: 'SET_LOADER',
        payload: false,
      },
      {
        type: 'GET_TASKS',
        payload: result,
      },
      {
        type: 'default',
        payload: true,
      }
    ];

    const store = mockStore({
      tasks: [],
    });

    return store.dispatch(getTasks()).then(() => {

      expect(store.getActions()).toEqual(expectedActions);

    });

  });

  it('should create GET_TASK action', () => {

    const result = {
      title: 'Test',
      id: '6767',
      status: false,
      dueDate: '989898988',
    };

    fetch.mockResponseOnce(
      JSON.stringify({
        result,
      }),
      {
        status: 200,
      }
    );

    const store = mockStore({
      task: {},
    });

    const expectedActions = [
      {
        type: 'SET_LOADER',
        payload: true,
      },
      {
        type: 'SET_LOADER',
        payload: false,
      },
      {
        type: 'GET_TASK',
        payload: result,
      },
      {
        type: 'default',
        payload: true,
      }
    ];

    return store
      .dispatch(
        getTask({
          id: '6767',
        })
      )
      .then(() => {

        expect(store.getActions()).toEqual(expectedActions);

      });

  });

  it('should create ADD_TASK action', () => {

    const result = [
      {
        title: 'Test',
        id: '6767',
        status: false,
        dueDate: '989898988',
      }
    ];

    fetch.mockResponseOnce(
      JSON.stringify({
        result,
      }),
      {
        status: 200,
      }
    );

    const store = mockStore({
      tasks: [],
    });

    const expectedActions = [
      {
        type: 'IS_ADDING_TASK',
        payload: true,
      },
      {
        type: 'IS_ADDING_TASK',
        payload: false,
      },
      {
        type: 'ADD_TASK',
        payload: result,
      },
      {
        type: 'TASK_ADDED',
        payload: true,
      }
    ];

    return store
      .dispatch(
        addTask({
          title: 'Test',
          id: '6767',
          status: false,
          dueDate: '989898988',
        })
      )
      .then(() => {

        expect(store.getActions()).toEqual(expectedActions);

      });

  });

  it('should create UPDATE_TASK action', () => {

    const result = [
      {
        title: 'Updated',
        id: '6767',
        status: false,
        dueDate: '989898988',
      }
    ];

    fetch.mockResponseOnce(
      JSON.stringify({
        result,
      }),
      {
        status: 200,
      }
    );

    const store = mockStore({
      tasks: result,
    });

    const expectedActions = [
      {
        type: 'IS_UPDATING_TASK',
        payload: true,
      },
      {
        type: 'IS_UPDATING_TASK',
        payload: false,
      },
      {
        type: 'UPDATE_TASK',
        payload: result,
      },
      {
        type: 'default',
        payload: true,
      }
    ];

    return store
      .dispatch(
        updateTask({
          title: 'Updated',
          id: '6767',
          status: false,
          dueDate: '989898988',
        })
      )
      .then(() => {

        expect(store.getActions()).toEqual(expectedActions);

      });

  });

  it('should create REMOVE_TASK action', () => {

    const result = [];

    fetch.mockResponseOnce(
      JSON.stringify({
        result,
      }),
      {
        status: 200,
      }
    );

    const store = mockStore({
      tasks: result,
    });

    const expectedActions = [
      {
        type: 'IS_UPDATING_TASK',
        payload: true,
      },
      {
        type: 'IS_UPDATING_TASK',
        payload: false,
      },
      {
        type: 'REMOVE_TASK',
        payload: result,
      },
      {
        type: 'default',
        payload: true,
      }
    ];

    return store
      .dispatch(
        removeTask({
          title: 'Updated',
          id: '6767',
          status: false,
          dueDate: '989898988',
        })
      )
      .then(() => {

        expect(store.getActions()).toEqual(expectedActions);

      });

  });

});
