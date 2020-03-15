import { Button } from 'app/elements/button/button';
import { PopupContainer } from 'app/elements/popup/popupContainer';
import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faExclamation, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const icons = {
  error: faExclamation,
  success: faCheckCircle
}

export const Popup = ({
  show,
  onCancelButtonPress,
  onOkButtonPress,
  message,
  cancelButtonText,
  okButtonText,
  iconType
}) => (
  <>
    {show ? (
      <PopupContainer>
        <div className="container">
          <div className="message">
            <FontAwesomeIcon size='5x' icon={icons[iconType]} />
            <p>{message}</p>
          </div>
          <div className="buttons">
            <Button onClick={onCancelButtonPress} round>
              {cancelButtonText}
            </Button>
            <Button onClick={onOkButtonPress} round>{okButtonText}</Button>
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
};

Popup.defaultProps = {
  onCancelButtonPress: () => {},
  onOkButtonPress: () => {},
  show: false,
  message: '',
  cancelButtonText: 'Cancel',
  okButtonText: 'Ok',
};
