import {
  ADD_TASK,
  CLOSE_POPUP,
  GET_REMINDERS,
  GET_TASK,
  IS_ADDING_TASK,
  IS_UPDATING_TASK,
  NEON,
  PRIMARY,
  REMOVE_TASK,
  SET_THEME,
  TASK_ADDED,
  TASK_FAILED,
  UPDATE_TASK
} from 'app/constants';

import {
  Themes
} from 'app/theme/theme';

import {
  rootReducer
} from '../reducers';

const initState = {
  theme: Themes.primary,
  currentTheme: PRIMARY,
  tasks: [],
  task: {},
  isUpdatingTask: false,
  isLoading: false,
  showPopup: false,
  isError: false,
  isSubmittingTask: false,
  reminderTasks: [],
};

describe('todos reducers', () => {

  it('should return the initial state', () => {

    expect(rootReducer(undefined, {})).toEqual(initState);

  });

  it('should handle ADD_TASK', () => {

    const todo = {
      title: 'todo',
      id: '45454',
    };

    expect(
      rootReducer(
        {
          tasks: [],
        },
        {
          type: ADD_TASK,
          payload: [todo],
        }
      )
    ).toEqual({
      tasks: [todo],
    });

  });

  it('should handle UPDATE_TASK', () => {

    const todo = [
      {
        title: 'todo',
        id: '45454',
      }
    ];

    expect(
      rootReducer(
        {
          tasks: [],
        },
        {
          type: UPDATE_TASK,
          payload: todo,
        }
      )
    ).toEqual({
      tasks: todo,
    });

  });

  it('should handle CLOSE_POPUP', () => {

    expect(
      rootReducer(
        {
          showPopup: false,
        },
        {
          type: CLOSE_POPUP,
          payload: true,
        }
      )
    ).toEqual({
      showPopup: true,
    });

  });

  it('should handle TASK_ADDED', () => {

    expect(
      rootReducer(
        {},
        {
          type: TASK_ADDED,
        }
      )
    ).toEqual({
      message: 'Yay, you\'ve successfully added a new task',
      showPopup: true,
      isError: false,
    });

  });

  it('should handle TASK_FAILED', () => {

    expect(
      rootReducer(
        {},
        {
          type: TASK_FAILED,
          payload: {
            error: true,
            message: 'Failed to fetch',
          },
        }
      )
    ).toEqual({
      isError: true,
      message: 'Failed to fetch',
      showPopup: true,
    });

  });

  it('should handle IS_ADDING_TASK', () => {

    expect(
      rootReducer(
        {},
        {
          type: IS_ADDING_TASK,
          payload: true,
        }
      )
    ).toEqual({
      isSubmittingTask: true,
    });

  });

  it('should handle IS_UPDATING_TASK', () => {

    expect(
      rootReducer(
        {},
        {
          type: IS_UPDATING_TASK,
          payload: true,
        }
      )
    ).toEqual({
      isUpdatingTask: true,
    });

  });

  it('should handle GET_TASK', () => {

    const todo = {
      title: 'todo',
      id: '45454',
    };

    expect(
      rootReducer(
        {
          task: {},
        },
        {
          type: GET_TASK,
          payload: todo,
        }
      )
    ).toEqual({
      task: todo,
    });

  });

  it('should handle ADD_TASK', () => {

    const todo = {
      title: 'todo',
      id: '45454',
    };

    expect(
      rootReducer(
        {
          tasks: [],
        },
        {
          type: ADD_TASK,
          payload: [todo],
        }
      )
    ).toEqual({
      tasks: [todo],
    });

  });

  it('should handle REMOVE_TASK', () => {

    const todo = {
      title: 'todo',
      id: '45454',
    };

    expect(
      rootReducer(
        {
          tasks: [],
        },
        {
          type: REMOVE_TASK,
          payload: [todo],
        }
      )
    ).toEqual({
      tasks: [todo],
    });

  });

  it('should handle SET_THEME change from PRIMARY TO NEON', () => {

    expect(
      rootReducer(
        {
          currentTheme: PRIMARY,
        },
        {
          type: SET_THEME,
        }
      )
    ).toEqual({
      theme: Themes.neon,
      currentTheme: NEON,
    });

  });

  it('should handle SET_THEME change from NEON TO PRIMARY', () => {

    expect(
      rootReducer(
        {
          currentTheme: NEON,
        },
        {
          type: SET_THEME,
        }
      )
    ).toEqual({
      theme: Themes.primary,
      currentTheme: PRIMARY,
    });

  });

  it('should handle GET_REMINDERS', () => {

    const tasks = [
      {
        title: 'Root Task',
        tasks: [
          {
            title: 'Sub 1',
            tasks: [
              {
                title: 'Sub 3',
                tasks: [
                  {
                    title: 'Sub 4',
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
        tasks: [
          {
            title: 'Sub 2',
            tasks: [],
          }
        ],
      }
    ];

    expect(
      rootReducer(
        {
          reminderTasks: [],
        },
        {
          type: GET_REMINDERS,
          payload: tasks,
        }
      )
    ).toEqual({
      reminderTasks: [],
    });

  });

});
