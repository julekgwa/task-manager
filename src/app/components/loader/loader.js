import {
  faSpinner 
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React from 'react';

import {
  LoaderContainer 
} from 'app/elements/loader/loaderContainer';

export const Loader = ({ size, ...props }) => (
  <LoaderContainer {...props}>
    <FontAwesomeIcon size={size} icon={faSpinner} spin />
  </LoaderContainer>
);

Loader.propTypes = {
  size: PropTypes.string,
}
