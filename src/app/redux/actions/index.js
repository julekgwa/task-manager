import {
  fetchAPI 
} from 'app/fetch/fetch';

import {
  ADD_TASK,
  GET_TASK,
  GET_TASKS, 
  REMOVE_TASK,
  SET_LOADER,
  SET_THEME,
  UPDATE_SUBTASK
} from '../constants';

export function setTheme(payload) {

  return {
    type: SET_THEME,
    payload,
  };

}

export function setLoader(payload) {

  return {
    type: SET_LOADER,
    payload,
  };

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

  return {
    type: GET_TASK,
    payload,
  }
  
}

export function getTasks() {

  return dispatch => {

    dispatch(
      setLoader({
        home: {
          isLoading: true, 
        }, 
      })
    );

    fetchAPI({
      url: `${process.env.REACT_APP_API}`,
      method: 'get',
    })
      .then(() => {

        dispatch(
          setLoader({
            home: {
              isLoading: false, 
            }, 
          })
        );

        // TODO: check for ok status

        dispatch({
          type: GET_TASKS,
          payload: [],
        });
      
      })
      .catch(error => {

        // TODO: check error message
        console.error('ERROR', error);
      
      });
  
  };

}
