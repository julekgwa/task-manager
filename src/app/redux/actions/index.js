import { fetchAPI } from 'app/fetch/fetch';
import { GET_TASKS, SET_LOADER, SET_THEME } from '../constants';


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
      .then(res => {

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
          payload: res,
        });
      
      })
      .catch(error => {

        // TODO: check error message
        console.error('ERROR', error);
      
      });
  
  };

}
