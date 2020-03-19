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
  Icons 
} from '../constants';

export const Popup = ({
  show,
  onCancelButtonPress,
  onOkButtonPress,
  message,
  cancelButtonText,
  okButtonText,
  iconType,
  notification,
}) => (
  <>
    {show ? (
      <PopupContainer>
        <div className="container">

          {notification && (
            <div className="message">
              <FontAwesomeIcon size="5x" icon={Icons[iconType]} />
              <p>{message}</p>
            </div>
          )}

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
};

Popup.defaultProps = {
  onCancelButtonPress: () => {},
  onOkButtonPress: () => {},
  show: false,
  message: '',
  cancelButtonText: 'Cancel',
  okButtonText: 'Ok',
};
