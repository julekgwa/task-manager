import {
  CLOSE_HOME_POPUP,
  HOME_ERROR, 
  HOME_TASK_ADDED,
  HOME_TASK_FAILED,
  IS_HOME_ADDING_TASK,
  SET_HOME_LOADER
} from '../constants';

const initState = {
  isLoading: false,
  showPopup: false,
  isError: false,
  isSubmittingTask: false,
  addTaskStatus: '',
  addTaskMessage: '',
  message: ''
}

export function homeReducer(state = initState, action) {

  switch (action.type) {

  case SET_HOME_LOADER:
    return {
      ...state,
      isLoading: action.payload
    }

  case HOME_ERROR:
    return {
      ...state,
      isError: action.payload.error,
      message: action.payload.message,
      showPopup: true
    }

  case CLOSE_HOME_POPUP:
    return {
      ...state,
      showPopup: action.payload
    }

  case HOME_TASK_ADDED:
    return {
      ...state,
      message: "Yay, you've successfully added a new task",
      showPopup: true,
      isError: false
    }

  case HOME_TASK_FAILED:
    return {
      ...state,
      isError: action.payload.error,
      message: action.payload.message,
      showPopup: true
    }

  case IS_HOME_ADDING_TASK:
    return {
      ...state,
      isSubmittingTask: action.payload
    }
  
  default:
    return state;
  
  }

}