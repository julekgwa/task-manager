import throttle from 'lodash/throttle';

import {
  applyMiddleware,
  createStore
} from 'redux';

import thunk from 'redux-thunk';

import {
  rootReducer
} from '../reducers';

const loadState = () => {

  try {

    const serializedState = localStorage.getItem('theme');

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

const persistedState = loadState();

export const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(throttle(() => {

  saveState({
    theme: store.getState().theme,
    currentTheme: store.getState().currentTheme,
  });

}, 1000));

window.store =store;
