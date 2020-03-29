import {
  RESET_UPDATED_ID
} from 'app/constants';

import {
  fetchAPI
} from 'app/fetch/fetch';

import {
  setError
} from './index';

const dispatcher = (dispatch, type, payload) => dispatch({
  type,
  payload,
});

export const fetchItem = (dispatch, requestOptions, isLoading, action) => {

  dispatcher(dispatch, action.loaderType, isLoading);

  fetchAPI(requestOptions)
    .then(res => {

      dispatcher(dispatch, action.loaderType, !isLoading);

      if (action.notify) {

        dispatch({
          type: action.notify.type,
          payload: action.notify.id,
        });

        const timeout= setTimeout(() => {

          dispatcher(dispatch, action.type, res.result);
          dispatch({
            type: RESET_UPDATED_ID,
            payload: '',
          });

          if (timeout !== null) {

            clearTimeout(timeout);

          }

        }, 1600);

      } else {

        dispatcher(dispatch, action.type, res.result);

      }

      dispatcher(dispatch, action.success || 'default', !isLoading);

    })
    .catch(error => {

      dispatch(setError(action.error, {
        error: true,
        message: error.message,
      }));
      dispatcher(dispatch, action.loaderType, !isLoading);

    });

};