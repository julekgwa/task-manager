import {
  toast
} from 'react-toastify';

import {
  NOTIFICATION_MESSAGE,
  REQUEST_METHOD
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

        toast(requestOptions.method === REQUEST_METHOD.delete ? NOTIFICATION_MESSAGE.deleted: NOTIFICATION_MESSAGE.updated);

      }

      dispatcher(dispatch, action.type, res.result);

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