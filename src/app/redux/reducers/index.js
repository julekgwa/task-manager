import {
  combineReducers 
} from 'redux';

import {
  Themes 
} from 'app/theme/theme';

import {
  ADD_TASK,
  GET_TASK,
  GET_TASKS,
  IS_DELETING,
  NEON,
  PRIMARY,
  REMOVE_TASK,
  SET_LOADER,
  SET_THEME,
  UPDATE_SUBTASK
} from '../constants';

import {
  updateSubTask 
} from '../utils';

import {
  editReducer 
} from './editReducer';

import {
  homeReducer 
} from './homeReducer';

const initState = {
  theme: Themes.primary,
  currentTheme: PRIMARY,
  tasks: [],
  task: {},
  isDeleting: false,
  isLoading: false,
  showPopup: false,
  isError: false,
  isSubmittingTask: false
};

function mainReducer(state = initState, action) {

  switch (action.type) {

  case SET_THEME:
    return {
      ...state,
      theme:
          state.currentTheme === PRIMARY
            ? Themes.neon
            : Themes.primary,
      currentTheme: state.currentTheme === PRIMARY ? NEON : PRIMARY
    };

  case SET_LOADER:
    return {
      ...state,
      ...action.payload
    };

  case ADD_TASK: {

    return {
      ...state,
      tasks: action.payload
    };
  
  }

  case UPDATE_SUBTASK: {

    const { tasks, updatedTask } = updateSubTask(
      state.tasks,
      action.payload
    );

    return {
      ...state,
      tasks: tasks,
      task: updatedTask
    };
  
  }

  case IS_DELETING:
    return {
      ...state,
      isDeleting: action.payload
    };

  case GET_TASK: {

    return {
      ...state,
      task: action.payload
    };
  
  }

  case REMOVE_TASK:
    return {
      ...state,
      tasks: action.payload
    };

  case GET_TASKS:
    return {
      ...state,
      tasks: action.payload
    };

  default:
    return state;
  
  }

}

export const rootReducer = combineReducers({
  home: homeReducer,
  app: mainReducer,
  edit: editReducer
});
