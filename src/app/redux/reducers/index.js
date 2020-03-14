import {
  Themes 
} from 'app/theme/theme';

import {
  GET_TASKS,
  NEON,
  PRIMARY, 
  SET_LOADER,
  SET_THEME
} from '../constants';

const initState = {
  theme: Themes.primary,
  currentTheme: PRIMARY,
  tasks: [],
  home: {
    isLoading: false,
    isError: false,
  },
};

export function rootReducer(state = initState, action) {

  switch (action.type) {

  case SET_THEME:
    return {
      ...state,
      theme: state.currentTheme === PRIMARY
        ? Themes.neon
        : Themes.primary,
      currentTheme: state.currentTheme === PRIMARY ? NEON : PRIMARY,
    };

  case SET_LOADER: 
    return {
      ...state,
      ...action.payload,
    }

  case GET_TASKS:
    return {
      ...state,
      tasks: action.payload,
    }
    
  default:
    return state;
  
  }

}
