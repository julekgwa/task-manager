import {
  ADD_TASK,
  CLOSE_POPUP,
  ERROR,
  GET_REMINDERS,
  GET_TASK,
  GET_TASKS,
  IS_ADDING_TASK,
  IS_UPDATING_TASK,
  NEON,
  PRIMARY,
  REMOVE_TASK,
  SET_LOADER,
  SET_THEME,
  TASK_ADDED,
  TASK_FAILED,
  UPDATE_TASK
} from 'app/constants';

import {
  Themes
} from 'app/theme/theme';

import {
  flatten,
  isTaskDueIn24Hours
} from 'app/utils';

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

export function rootReducer(state = initState, action) {

  switch (action.type) {

  case SET_THEME:
    return {
      ...state,
      theme:
          state.currentTheme === PRIMARY
            ? Themes.neon
            : Themes.primary,
      currentTheme: state.currentTheme === PRIMARY ? NEON : PRIMARY,
    };

  case SET_LOADER:
    return {
      ...state,
      isLoading: action.payload,
    };

  case ADD_TASK: {

    return {
      ...state,
      tasks: action.payload,
    };

  }

  case UPDATE_TASK: {

    return {
      ...state,
      tasks: action.payload,
    };

  }

  case CLOSE_POPUP:
    return {
      ...state,
      showPopup: action.payload,
    };

  case TASK_ADDED:
    return {
      ...state,
      message: 'Yay, you\'ve successfully added a new task',
      showPopup: true,
      isError: false,
    };

  case TASK_FAILED:
    return {
      ...state,
      isError: action.payload.error,
      message: action.payload.message,
      showPopup: true,
    };

  case IS_ADDING_TASK:
    return {
      ...state,
      isSubmittingTask: action.payload,
    };

  case IS_UPDATING_TASK:
    return {
      ...state,
      isUpdatingTask: action.payload,
    };

  case GET_TASK: {

    return {
      ...state,
      task: action.payload,
    };

  }

  case ERROR:
    return {
      ...state,
      isError: action.payload.error,
      message: action.payload.message,
      showPopup: true,
    };

  case REMOVE_TASK: {

    const tasks = action.payload;
    const flattenedTasks = flatten(tasks);

    return {
      ...state,
      tasks: tasks.filter(task => task),
      reminderTasks: flattenedTasks.filter(isTaskDueIn24Hours),
    };

  }

  case GET_TASKS:
    return {
      ...state,
      tasks: action.payload,
    };

  case GET_REMINDERS: {

    const tasks = action.payload;

    const flattenedTasks = flatten(tasks);

    return {
      ...state,
      reminderTasks: flattenedTasks.filter(isTaskDueIn24Hours),
    };

  }

  default:
    return state;

  }

}
