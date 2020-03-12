import {Themes} from "app/theme/theme";

import {SET_THEME, PRIMARY, NEON} from "../constants";

const initState = {
  theme: Themes.primary,
  currentTheme: PRIMARY,
};

export function rootReducer(state = initState, action) {

  switch (action.type) {

    case SET_THEME:
      return {
        ...state,
        theme: state.currentTheme === PRIMARY ? Themes.neon : Themes.primary,
        currentTheme: state.currentTheme === PRIMARY ? NEON : PRIMARY,
      };
    default:
      return state;
  
}

}
