import { SET_THEME } from 'redux/constants';

export function setTheme(payload) {
  return {
    type: SET_THEME,
    payload
  };
}
