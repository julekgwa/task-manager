import {
  CLOSE_EDIT_POPUP,
  EDIT_ERROR, 
  SET_EDIT_LOADER
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

export function editReducer(state = initState, action) {

  switch (action.type) {

  case SET_EDIT_LOADER:
    return {
      ...state,
      isLoading: action.payload
    }

  case EDIT_ERROR:
    return {
      ...state,
      isError: action.payload.error,
      message: action.payload.message,
      showPopup: true
    }

  case CLOSE_EDIT_POPUP:
    return {
      ...state,
      showPopup: action.payload
    }
  
  default:
    return state;
  
  }

}