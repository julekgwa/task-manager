import {
  CLOSE_HOME_POPUP,
  HOME_ERROR, 
  SET_HOME_LOADER
} from '../constants';

const initState = {
  isLoading: false,
  showPopup: false,
  isError: false,
  isSubmittingTask: false,
  addTaskStatus: '',
  addTaskMessage: '',
  message: '',
}

export function homeReducer(state = initState, action) {

  switch (action.type) {

  case SET_HOME_LOADER:
    return {
      ...state,
      isLoading: action.payload,
    }

  case HOME_ERROR:
    return {
      ...state,
      isError: action.payload.error,
      message: action.payload.message,
      showPopup: true,
    }

  case CLOSE_HOME_POPUP:
    return {
      ...state,
      showPopup: action.payload,
    }
  
  default:
    return state;
  
  }

}