import {
  ADD_TASK,
  ERROR,
  GET_TASK,
  GET_TASKS,
  IS_ADDING_TASK,
  IS_UPDATING_TASK,
  NOTIFY,
  REMOVE_TASK,
  REQUEST_METHOD,
  SET_LOADER,
  SET_THEME,
  TASK_ADDED,
  TASK_FAILED,
  TASK_TYPE,
  UPDATE_TASK
} from 'app/constants';

import {
  fetchItem
} from './utils';

const BASE_URL = process.env.REACT_APP_API_URL;
const GET_ALL_TASKS = BASE_URL + process.env.REACT_APP_GET_TASKS;
const GET_TASK_BY_ID = BASE_URL + process.env.REACT_APP_GET_TASK_BY_ID;
const ADD_NEW_TASK = BASE_URL + process.env.REACT_APP_ADD_NEW_TASK;
const DELETE_TASK = BASE_URL + process.env.REACT_APP_DELETE_TASK;
const ADD_SUB_TASK = BASE_URL + process.env.REACT_APP_ADD_SUB_TASK;
const UPDATE_TASK_BY_ID = BASE_URL + process.env.REACT_APP_UPDATE_TASK;

export function setTheme() {

  return {
    type: SET_THEME,
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
  };

}

export function addTask(payload, type) {

  return dispatch => {

    const requestOptions = {
      url: type === TASK_TYPE.subtask ? ADD_SUB_TASK : ADD_NEW_TASK,
      method: REQUEST_METHOD.post,
      body: JSON.stringify(payload),
    };

    const action = {
      type: ADD_TASK,
      loaderType: IS_ADDING_TASK,
      error: TASK_FAILED,
      success: TASK_ADDED,
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}

export function updateTask(payload, type = UPDATE_TASK) {

  return dispatch => {

    const requestOptions = {
      url: UPDATE_TASK_BY_ID,
      method: REQUEST_METHOD.put,
      body: JSON.stringify(payload),
    };

    const action = {
      type: type,
      loaderType: type === ADD_TASK ? IS_ADDING_TASK : IS_UPDATING_TASK,
      error: ERROR,
      notify: {
        type: NOTIFY,
        id: payload.id,
      },
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}

export function removeTask(payload) {

  return dispatch => {

    const requestOptions = {
      url: DELETE_TASK + payload.id,
      method: REQUEST_METHOD.delete,
    };

    const action = {
      type: REMOVE_TASK,
      loaderType: IS_UPDATING_TASK,
      error: ERROR,
      notify: {
        type: NOTIFY,
        id: payload.id,
      },
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}

export function getTask(payload) {

  return dispatch => {

    const requestOptions = {
      url: GET_TASK_BY_ID + payload.id,
      method: REQUEST_METHOD.get,
    };

    const action = {
      type: GET_TASK,
      loaderType: SET_LOADER,
      error: ERROR,
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}

export function getTasks(type = GET_TASKS) {

  return dispatch => {

    const requestOptions = {
      url: GET_ALL_TASKS,
      method: REQUEST_METHOD.get,
    };

    const action = {
      type: type,
      loaderType: SET_LOADER,
      error: ERROR,
    };

    return fetchItem(dispatch, requestOptions, true, action);

  };

}