import { Themes } from 'app/theme/theme';

import { SET_THEME } from '../constants';

const initState = {
  theme: Themes.primary,
  currentTheme: 'primary'
};

export function rootReducer(state = initState, action) {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: state.currentTheme === 'primary' ? Themes.neon : Themes.primary,
        currentTheme: state.currentTheme === 'primary' ? 'neon' : 'primary'
      };
    default:
      return state;
  }
}
