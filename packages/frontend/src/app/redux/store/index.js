import throttle from 'lodash/throttle';

import {
  applyMiddleware,
  createStore
} from 'redux';

import thunk from 'redux-thunk';

import {
  Themes
} from 'app/theme/theme';

import {
  rootReducer
} from '../reducers';

const loadState = (type = 'theme') => {

  try {

    const serializedState = localStorage.getItem(type);

    if (!serializedState) {

      return undefined;

    }

    return JSON.parse(serializedState);

  } catch (error) {

    return undefined;

  }

};

const saveState = (state) => {

  try {

    const serializedState = JSON.stringify(state);

    localStorage.setItem('theme', serializedState);

  } catch (error) {

    console.error(error);

  }

};

const persistedState = {
  ...loadState() || {
    theme: Themes.primary,
    currentTheme: 'PRIMARY',
  },
  user: loadState('login') || {},
};

export const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(throttle(() => {

  saveState({
    theme: store.getState().theme,
    currentTheme: store.getState().currentTheme,
  });

}, 1000));

window.store =store;
