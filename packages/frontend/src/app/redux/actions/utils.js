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

import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const dispatcher = (dispatch, type, payload) => dispatch({
  type,
  payload,
});

export const fetchItem = (dispatch, requestOptions, isLoading, action) => {

  dispatcher(dispatch, action.loaderType, isLoading);

  return fetchAPI(requestOptions)
    .then(res => {

      dispatcher(dispatch, action.loaderType, !isLoading);

      if (action.notify) {

        requestOptions.method === REQUEST_METHOD.delete
          ? toast.error(NOTIFICATION_MESSAGE.deleted, toastConfig)
          : toast.success(NOTIFICATION_MESSAGE.updated, toastConfig);

      }

      dispatcher(dispatch, action.type, res.result);

      dispatcher(dispatch, action.success || 'default', true);

    })
    .catch(error => {

      dispatch(setError(action.error, {
        error: true,
        message: error.message,
      }));
      dispatcher(dispatch, action.loaderType, !isLoading);

    });

};