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
  Form
} from '../form';

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

jest.mock('react-datepicker', () => props => (
  <input
    id='date'
    data-testid='mockedDateField'
    onChange={e => {

      props.onChange(e);

    }}
  />
));

const mockStore = configureStore();

describe('Add Task form', () => {

  let getByPlaceholderText;

  let queryByTestId;

  let  queryByPlaceholderText;

  let getByLabelText;

  let getByText;

  let getByTestId;

  let onCloseButton = jest.fn();

  let onOkButton = jest.fn();

  const store = mockStore(initState);

  beforeEach(() => {

    ({
      getByPlaceholderText,
      queryByTestId,
      queryByPlaceholderText,
      getByLabelText,
      getByText,
      getByTestId,
    } = render(
      <Provider store={store}>
        <Form
          onOkButton={onOkButton}
          onCloseButton={onCloseButton}
          show={true}
        />
      </Provider>
    ));

  });

  it('renders correctly', () => {

    const { container, } = render(<Form />);

    expect(container.firstChild).toBeNull();

  });

  describe('Add new task form', () => {

    it('should render the form', () => {

      expect(getByLabelText(/task/i)).toBeTruthy();
      expect(queryByPlaceholderText(/add task/i)).toBeTruthy();

      expect(getByLabelText(/due date/i)).toBeTruthy();
      expect(queryByTestId('mockedDateField')).toBeTruthy();

      expect(queryByTestId('close-button')).toBeTruthy();
      expect(queryByTestId('add-button')).toBeTruthy();
      expect(getByText(/close/i)).toBeTruthy();
      expect(getByText(/add task/i)).toBeTruthy();

    });

  });

  describe('Add new task input field', () => {

    it('should update text value on change', () => {

      const addTaskInput = getByPlaceholderText(/add task/i);

      fireEvent.change(addTaskInput, {
        target: {
          value: 'todo',
        },
      });

      expect(addTaskInput.value).toBe('todo');

    });

  });

  describe('Close button', () => {

    it('should close the form', () => {

      const closeButton = getByTestId('close-button');

      fireEvent.click(closeButton);

      expect(onCloseButton).toHaveBeenCalled();

    });

  });

  describe('Add task button', () => {

    it('should not add task when input is empty', () => {

      fireEvent.click(getByTestId('add-button'));
      expect(onOkButton).not.toHaveBeenCalled();

    });

    it('should add task when input is not empty', () => {

      const addTaskInput = getByPlaceholderText(/add task/i);

      fireEvent.change(addTaskInput, {
        target: {
          value: 'todo',
        },
      });

      fireEvent.click(getByTestId('add-button'));

      expect(onOkButton).toHaveBeenCalled();

    });

  });

});
