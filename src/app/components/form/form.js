import {
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import {
  Button 
} from 'app/elements/button/button';

import {
  FormContainer 
} from 'app/elements/form/formContainer';

import {
  PopupContainer 
} from 'app/elements/popup/popupContainer';

import {
  IconColors,
  Icons 
} from '../constants';

import {
  Loader 
} from '../loader/loader';

export const Form = ({
  isSubmittingTask,
  show,
  taskStartDate,
  onDateChange,
  closeButtonText,
  okButtonText,
  onConfirm,
  onCloseForm,
  addTaskStatus,
  addTaskMessage,
  onTaskInputChange,
  taskInputValue,
  isInputEmpty,
}) => (
  <>
    {show ? (
      <PopupContainer>
        <FormContainer inputEmpty={isInputEmpty} isSubmitting={isSubmittingTask}>
          <div className="container">
            {isSubmittingTask ? (
              <Loader size="5x" />
            ) : addTaskStatus ? (
              <>
                <div className="message">
                  <FontAwesomeIcon
                    color={IconColors[addTaskStatus]}
                    size="5x"
                    icon={Icons[addTaskStatus]}
                  />
                  <p>{addTaskMessage}</p>
                </div>
                <div className="buttons">
                  <Button onClick={onCloseForm} round>
                    {closeButtonText}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <label htmlFor="task">Task</label>
                <input
                  className="task-input"
                  id="task"
                  placeholder={
                    isInputEmpty
                      ? 'This field is required'
                      : 'Add task'
                  }
                  autoFocus
                  type="text"
                  value={taskInputValue}
                  onChange={onTaskInputChange}
                />
                <label htmlFor="date">Due date</label>
                <DatePicker
                  id="date"
                  selected={taskStartDate}
                  onChange={onDateChange}
                />

                <div className="buttons">
                  <Button onClick={onCloseForm} round>
                    {closeButtonText}
                  </Button>
                  <Button onClick={() => onConfirm()} round>
                    {okButtonText}
                  </Button>
                </div>
              </>
            )}
          </div>
        </FormContainer>
      </PopupContainer>
    ) : (
      <></>
    )}
  </>
);

Form.propTypes = {
  taskStartDate: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  closeButtonText: PropTypes.string,
  okButtonText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCloseForm: PropTypes.func,
  isSubmittingTask: PropTypes.bool,
  addTaskStatus: PropTypes.string,
  addTaskMessage: PropTypes.string,
  onTaskInputChange: PropTypes.func.isRequired,
  taskInputValue: PropTypes.string,
  isInputEmpty: PropTypes.bool,
};

Form.defaultProps = {
  closeButtonText: 'Close',
  okButtonText: 'Add task',
  isSubmittingTask: false,
  onConfirm: () => {},
  onCloseForm: () => {},
  onTaskInputChange: () => {},
  addTaskStatus: '',
  addTaskMessage: '',
  isInputEmpty: false,
};
