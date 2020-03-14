import {
  SET_THEME 
} from "../constants";

export function setTheme(payload) {

  return {
    type: SET_THEME,
    payload,
  };

}
