import {
  render
} from '@testing-library/react';

import React from 'react';

import {
  Provider
} from 'react-redux';

import configureStore from 'redux-mock-store';

import {
  Themes
} from 'app/theme/theme';

import {
  Greeting
} from '../greeting';

const mockStore = configureStore();
const store = mockStore({
  theme: Themes.primary,
});

const now = new Date();

describe('Greeting', () => {

  it('should display good morning', () => {

    now.setHours(5);
    const { queryByText, } = render(<Provider store={store}><Greeting date={now} /></Provider>);

    expect(queryByText(/morning/i)).toBeTruthy();

  });

  it('should display it is high noon.', () => {

    now.setHours(12);
    const { queryByText, } = render(<Provider store={store}><Greeting date={now} /></Provider>);

    expect(queryByText(/high noon/i)).toBeTruthy();

  });

  it('should display Good afternoon', () => {

    now.setHours(14);
    const { queryByText, } = render(<Provider store={store}><Greeting date={now} /></Provider>);

    expect(queryByText(/afternoon/i)).toBeTruthy();

  });

  it('should display good evening', () => {

    now.setHours(19);
    const { queryByText, } = render(<Provider store={store}><Greeting date={now} /></Provider>);

    expect(queryByText(/evening/i)).toBeTruthy();

  });

  it('should display default time', () => {

    now.setHours(23);
    const { queryByText, } = render(<Provider store={store}><Greeting date={now} /></Provider>);

    expect(queryByText(/ZZZZZZzzzzzzZZZZ/i)).toBeTruthy();

  });

  it('should render without crashing using the default date', () => {

    render(<Provider store={store}><Greeting /></Provider>);

  });

});