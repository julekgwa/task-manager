import {
  faFrown,
  faSmile
} from '@fortawesome/free-regular-svg-icons';

import {
  faTimes 
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React from 'react';

import {
  PopupContainer 
} from 'app/elements/popup/popupContainer';

export const Popup = ({
  show,
  message,
  isError,
  onButtonPress
}) => (
  <React.Fragment>
    {show ? (
      <PopupContainer isError={isError}>
        <div className='container'>
          <FontAwesomeIcon onClick={onButtonPress} className='icon' icon={faTimes} />
          <div className='message-area'>
            <FontAwesomeIcon size='6x' icon={isError ? faFrown : faSmile} />
            <p className='status'>{isError ? 'Error': 'Success'}</p>
            <p className='message'>{message}</p>
          </div>
          <div onClick={onButtonPress} className='button'>
            <p>{isError ? 'OK!' : 'Cool beans!'}</p>
          </div>
        </div>
      </PopupContainer>
    ) : (
      <div />
    )}
  </React.Fragment>
);

Popup.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  isError: PropTypes.bool,
  onButtonPress: PropTypes.func
};

Popup.defaultProps = {
  show: false,
  message: '',
  onButtonPress: () => {},
  isError: false
};
