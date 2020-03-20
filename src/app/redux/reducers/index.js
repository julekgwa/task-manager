import {
  Themes 
} from 'app/theme/theme';

import {
  ADD_TASK,
  GET_TASK,
  GET_TASKS,
  NEON,
  PRIMARY,
  REMOVE_TASK,
  SET_LOADER,
  SET_THEME,
  UPDATE_SUBTASK
} from '../constants';

import {
  getTask,
  updateNestedArrayObject, 
  updateSubTask
} from '../utils';

const initState = {
  theme: Themes.primary,
  currentTheme: PRIMARY,
  tasks: [],
  task: {},
  home: {
    isLoading: false,
    isError: false,
  },
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
      ...action.payload,
    };

  case ADD_TASK: {

    const tasks = updateNestedArrayObject([...state.tasks], action.payload);

    return {
      ...state,
      tasks: tasks,
    };

  }

  case UPDATE_SUBTASK: {

    const { tasks, updatedTask, } = updateSubTask(state.tasks, action.payload);

    return {
      ...state,
      tasks: tasks,
      task: updatedTask,
      
    }
  
  }

  case GET_TASK: {

    const { taskId, isRoot, } = action.payload;

    const task = getTask(taskId, isRoot, state.tasks);

    return {
      ...state,
      task: task,
    }
  
  }

  case REMOVE_TASK:

    return {
      ...state,
      tasks: [...state.tasks.slice(0, action.index), ...state.tasks.slice(action.index + 1)],
    }

  case GET_TASKS:
    return {
      ...state,
      tasks: action.payload,
    };

  default:
    return state;
  
  }

}
