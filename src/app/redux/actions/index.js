import {
  ADD_TASK,
  GET_TASK,
  GET_TASKS, 
  HOME_ERROR,
  REMOVE_TASK,
  SET_HOME_LOADER,
  SET_THEME,
  UPDATE_SUBTASK
} from '../constants';

import {
  fetchItem 
} from './utils';

const BASE_URL = process.env.REACT_APP_API_URL;
const GET_ALL_TASKS = process.env.REACT_APP_GET_TASKS;
const GET_TASK_BY_ID = process.env.REACT_APP_GET_TASK_BY_ID;

export function setTheme(payload) {

  return {
    type: SET_THEME,
    payload,
  };

}

export function setError(type, payload) {

  return {
    type,
    payload,
  };

}

export function closePopup(type, payload) {

  return {
    type,
    payload,
  }

}

export function addTask(payload) {

  return {
    type: ADD_TASK,
    payload,
  }

}

export function updateSubTask(payload) {

  return {
    type: UPDATE_SUBTASK,
    payload,
  }

}

export function removeTask(payload) {

  return {
    type: REMOVE_TASK,
    index: payload,
  }

}

export function getTask(payload) {

  return dispatch => {

    const requestOptions = {
      url: `${BASE_URL}${GET_TASK_BY_ID}${payload.id}`,
      method: 'get',
    }

    const action = {
      type: GET_TASK,
      loaderType: SET_HOME_LOADER,
      error: HOME_ERROR,
    }

    fetchItem(dispatch, requestOptions, true, action);

  }
  
}

export function getTasks() {

  return dispatch => {

    const requestOptions = {
      url: `${BASE_URL}${GET_ALL_TASKS}`,
      method: 'get',
    }

    const action = {
      type: GET_TASKS,
      loaderType: SET_HOME_LOADER,
      error: HOME_ERROR,
    }

    fetchItem(dispatch, requestOptions, true, action);
  
  };

}
