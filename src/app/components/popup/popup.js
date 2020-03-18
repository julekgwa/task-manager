import {
  faCheckCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React from 'react';

import {
  Button 
} from 'app/elements/button/button';

import {
  PopupContainer 
} from 'app/elements/popup/popupContainer';

import {
  Form 
} from '../form/form';

const icons = {
  error: faExclamationCircle,
  success: faCheckCircle,
};

export const Popup = ({
  show,
  onCancelButtonPress,
  onOkButtonPress,
  message,
  cancelButtonText,
  okButtonText,
  iconType,
  notification,
  startDate,
  onDateChange,
}) => (
  <>
    {show ? (
      <PopupContainer>
        <div className="container">

          {notification && (
            <div className="message">
              <FontAwesomeIcon size="5x" icon={icons[iconType]} />
              <p>{message}</p>
            </div>
          )}

          <div className="form">
            <Form startDate={startDate} onDateChange={onDateChange} />
          </div>

          <div className="buttons">
            <Button onClick={onCancelButtonPress} round>
              {cancelButtonText}
            </Button>
            <Button onClick={onOkButtonPress} round>
              {okButtonText}
            </Button>
          </div>
        </div>
      </PopupContainer>
    ) : (
      <div />
    )}
  </>
);

Popup.propTypes = {
  cancelButtonText: PropTypes.string,
  okButtonText: PropTypes.string,
  show: PropTypes.bool,
  onCancelButtonPress: PropTypes.func,
  onOkButtonPress: PropTypes.func,
  message: PropTypes.string,
  iconType: PropTypes.string,
  notification: PropTypes.bool,
  startDate: PropTypes.object,
  onDateChange: PropTypes.func,
};

Popup.defaultProps = {
  onCancelButtonPress: () => {},
  onOkButtonPress: () => {},
  show: false,
  message: '',
  cancelButtonText: 'Cancel',
  okButtonText: 'Ok',
};
