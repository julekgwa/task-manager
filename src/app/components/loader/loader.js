import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoaderContainer } from 'app/elements/loader/loaderContainer';
import React from 'react';

export const Loader = ({ size, ...props }) => (
  <LoaderContainer {...props}>
    <FontAwesomeIcon size={size} icon={faSpinner} spin />
  </LoaderContainer>
);
