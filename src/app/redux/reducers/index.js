import { Themes } from 'app/theme/theme';

const initState = {
  theme: Themes.primary
};

export function rootReducer(state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
