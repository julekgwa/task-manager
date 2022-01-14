import moment from 'moment';

import PropTypes from 'prop-types';

import React, {
  useEffect,
  useState
} from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import {
  FormContainer
} from 'app/elements/form/formContainer';

import {
  PopupContainer
} from 'app/elements/popup/popupContainer';

import {
  handleKeyDown
} from 'app/utils';

import {
  Loader
} from '../loader/loader';

import {
  useInput
} from './useInput';

export const Form = ({
  show,
  closeButtonText,
  okButtonText,
  onCloseButton,
  onOkButton,
  isLoading,
  taskTitle,
  taskDueDate,
}) => {

  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [taskValue, TaskInput, resetValue] = useInput({
    value: taskTitle,
  });
  const [taskStartDate, setTaskStartDate] = useState(taskDueDate);

  const addTask = () => {

    if (!taskValue) {

      setIsInputEmpty(true);

      return;

    }

    onOkButton(taskValue, moment(taskStartDate).endOf('day')
      .valueOf()
      .toString());

    resetValue('');
    setIsInputEmpty(false);

  };

  const closeForm = () => {

    resetValue('');
    onCloseButton();
    setIsInputEmpty(false);

  };

  useEffect(() => {

    setTaskStartDate(taskDueDate);
    resetValue(taskTitle);

  }, [taskDueDate, taskTitle, resetValue]);

  return (
    <React.Fragment>
      {show ? (
        <PopupContainer>
          <FormContainer
            inputEmpty={isInputEmpty}
            isSubmitting={isLoading}
          >
            <div className='container form'>
              {isLoading ? (
                <Loader size='5x' />
              ) : (
                <React.Fragment>
                  <div className='input-container'>
                    <label htmlFor='task'>Task</label>
                    {TaskInput}
                    <label htmlFor='date'>Due date</label>
                    <DatePicker
                      id='date'
                      role='dialog'
                      selected={taskStartDate}
                      onChange={setTaskStartDate}
                      dateFormat='d MMMM yyyy'
                    />
                  </div>

                  <div className='button'>
                    <div data-testid='close-button' onClick={closeForm} role='button' tabIndex='0' onKeyDown={(e) => handleKeyDown(e, closeForm)}><p>{closeButtonText}</p></div>
                    <div data-testid='add-button' role='button' tabIndex='0' onKeyDown={(e) => handleKeyDown(e, addTask)} onClick={addTask}><p>{okButtonText}</p></div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </FormContainer>
        </PopupContainer>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );

};

Form.propTypes = {
  show: PropTypes.bool.isRequired,
  closeButtonText: PropTypes.string,
  okButtonText: PropTypes.string,
  onCloseButton: PropTypes.func,
  isLoading: PropTypes.bool,
  onOkButton: PropTypes.func.isRequired,
  taskTitle: PropTypes.string,
  taskDueDate: PropTypes.instanceOf(Date),
};

Form.defaultProps = {
  closeButtonText: 'Close',
  okButtonText: 'Add task',
  onCloseButton: () => {},
  show: false,
  isLoading: false,
  requestStatus: '',
  message: '',
  onOkButton: () => {},
  taskTitle: '',
  taskDueDate: new Date(),
};
