import {
  cleanup,
  fireEvent,
  render
} from '@testing-library/react';

import React from 'react';

import {
  Provider
} from 'react-redux';

import configureStore from 'redux-mock-store';

import {
  PRIMARY
} from 'app/constants';

import {
  Themes
} from 'app/theme/theme';

import {
  Popup
} from '../popup';

const initState = {
  theme: Themes.primary,
  currentTheme: PRIMARY,
  tasks: [],
  task: {},
  isUpdatingTask: false,
  isLoading: false,
  showPopup: false,
  isError: false,
  isSubmittingTask: false,
  reminderTasks: [],
  updatedId: '',
};

afterEach(cleanup);

const mockStore = configureStore();

describe('Popup Component', () => {

  const store = mockStore(initState);

  it('should not render popup',() => {

    const { container, } = render(<Popup />);

    expect(container.firstChild).toBeNull();

  });

  it('should render a success popup', () => {

    const onButtonPress = jest.fn();

    const { queryByText, queryByRole, getByRole, } = render(<Provider store={store}><Popup onButtonPress={onButtonPress} show={true} isError={false} message='testing popup' /></Provider>);

    expect(queryByText(/testing popup/i)).toBeTruthy();
    expect(queryByText(/cool beans/i)).toBeTruthy();
    expect(queryByRole('button')).toBeTruthy();

    const button = getByRole('button');

    fireEvent.click(button);

    expect(onButtonPress).toHaveBeenCalled();

  });

  it('should render a error popup', () => {

    const onButtonPress = jest.fn();

    const { queryByText, queryByRole, getByRole, } = render(<Provider store={store}><Popup onButtonPress={onButtonPress} show={true} isError={true} message='something went wrong' /></Provider>);

    expect(queryByText(/something went wrong/i)).toBeTruthy();
    expect(queryByText(/ok/i)).toBeTruthy();
    expect(queryByRole('button')).toBeTruthy();

    const button = getByRole('button');

    fireEvent.click(button);

    expect(onButtonPress).toHaveBeenCalled();

  });

});
