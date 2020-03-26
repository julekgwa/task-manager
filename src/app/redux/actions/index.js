import {
  ADD_TASK,
  EDIT_ERROR,
  GET_TASK, 
  GET_TASKS,
  HOME_ERROR,
  HOME_TASK_ADDED,
  HOME_TASK_FAILED,
  IS_DELETING,
  IS_HOME_ADDING_TASK,
  REMOVE_TASK,
  SET_EDIT_LOADER,
  SET_HOME_LOADER,
  SET_THEME,
  UPDATE_SUBTASK
} from '../constants';

import {
  fetchItem 
} from './utils';

const BASE_URL = process.env.REACT_APP_API_URL;
const GET_ALL_TASKS = BASE_URL + process.env.REACT_APP_GET_TASKS;
const GET_TASK_BY_ID = BASE_URL + process.env.REACT_APP_GET_TASK_BY_ID;
const ADD_NEW_TASK = BASE_URL + process.env.REACT_APP_ADD_NEW_TASK;
const DELETE_TASK = BASE_URL + process.env.REACT_APP_DELETE_TASK;
const ADD_SUB_TASK = BASE_URL + process.env.REACT_APP_ADD_SUB_TASK;

export function setTheme(payload) {

  return {
    type: SET_THEME,
    payload
  };

}

export function setError(type, payload) {

  return {
    type,
    payload
  };

}

export function closePopup(type, payload) {

  return {
    type,
    payload
  }

}

export function addTask(payload, type = 'task') {

  return dispatch => {

    const requestOptions = {
      url: type === 'subtask' ? ADD_SUB_TASK : ADD_NEW_TASK,
      method: 'post',
      body: JSON.stringify(payload)
    }

    const action  = {
      type: ADD_TASK,
      loaderType: IS_HOME_ADDING_TASK,
      error: HOME_TASK_FAILED,
      success: HOME_TASK_ADDED
    }

    fetchItem(dispatch, requestOptions, true, action);
  
  }

}

export function updateSubTask(payload) {

  return {
    type: UPDATE_SUBTASK,
    payload
  }

}

export function removeTask(payload) {

  return dispatch => {

    const requestOptions = {
      url: DELETE_TASK + payload.id,
      method: 'delete'
    };

    const action = {
      type: REMOVE_TASK,
      loaderType: IS_DELETING,
      error: HOME_ERROR
    }

    fetchItem(dispatch, requestOptions, true, action);
    
  }

}

export function getTask(payload) {

  return dispatch => {

    const requestOptions = {
      url: GET_TASK_BY_ID + payload.id,
      method: 'get'
    }

    const action = {
      type: GET_TASK,
      loaderType: SET_EDIT_LOADER,
      error: EDIT_ERROR
    }

    fetchItem(dispatch, requestOptions, true, action);

  }
  
}

export function getTasks() {

  return dispatch => {

    const requestOptions = {
      url: GET_ALL_TASKS,
      method: 'get'
    }

    const action = {
      type: GET_TASKS,
      loaderType: SET_HOME_LOADER,
      error: HOME_ERROR
    }

    fetchItem(dispatch, requestOptions, true, action);
  
  };

}