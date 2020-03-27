import PropTypes from "prop-types";

import React from "react";

import {
  Link 
} from 'react-router-dom';

import {
  Button 
} from 'app/elements/button/button';

import {
  Lost 
} from 'app/elements/pageNotFound/lost';

import {
  withLogger 
} from "app/hoc/withLogger";

const PageNotFound = ({ logger, }) => {

  logger.error("/404", "Page not found");

  return (
    <Lost>
      <h1>404</h1>
      <p>Looks like you got lost</p>
      <Link to='/'><Button round>Go back home</Button></Link>
    </Lost>
  );

};

PageNotFound.propTypes = {
  logger: PropTypes.object,
};

// eslint-disable-next-line import/no-default-export
export default withLogger(PageNotFound);
