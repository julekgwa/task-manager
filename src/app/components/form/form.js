import {
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import moment from 'moment';

import PropTypes from 'prop-types';

import React, {
  useState 
} from 'react';

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
  requestStatus,
  message,
}) => {

  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [taskValue, TaskInput, resetValue] = useInput();
  const [taskStartDate, setTaskStartDate] = useState(new Date());

  const addTask = () => {

    if (!taskValue) {

      setIsInputEmpty(true);

      return;
    
    }

    onOkButton(taskValue, moment(taskStartDate).endOf('day')
      .valueOf()
      .toString());

    resetValue('');
  
  };

  const closeForm = () => {

    resetValue('');
    onCloseButton();
  
  }

  return (
    <>
      {show ? (
        <PopupContainer>
          <FormContainer
            inputEmpty={isInputEmpty}
            isSubmitting={isLoading}
          >
            <div className='container'>
              {isLoading ? (
                <Loader size='5x' />
              ) : requestStatus ? (
                <>
                  <div className='message'>
                    <FontAwesomeIcon
                      color={IconColors[requestStatus]}
                      size='5x'
                      icon={Icons[requestStatus]}
                    />
                    <p>{message}</p>
                  </div>
                  <div className='buttons'>
                    <Button onClick={onCloseButton} round>
                      {closeButtonText}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <label htmlFor='task'>Task</label>
                  {TaskInput}
                  <label htmlFor='date'>Due date</label>
                  <DatePicker
                    id='date'
                    selected={taskStartDate}
                    onChange={setTaskStartDate}
                    dateFormat='d MMMM yyyy'
                  />

                  <div className='buttons'>
                    <Button onClick={closeForm} round>
                      {closeButtonText}
                    </Button>
                    <Button onClick={addTask} round>
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

};

Form.propTypes = {
  show: PropTypes.bool.isRequired,
  closeButtonText: PropTypes.string,
  okButtonText: PropTypes.string,
  onCloseButton: PropTypes.func,
  isLoading: PropTypes.bool,
  onOkButton: PropTypes.func.isRequired,
  message: PropTypes.string,
  requestStatus: PropTypes.string,
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
};
