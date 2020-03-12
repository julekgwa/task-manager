import PropTypes from "prop-types";
import React from "react";

import {withLogger} from "app/hoc/withLogger";

const PageNotFound = ({logger}) => {

  logger.error("/404", "Page not found");

  return <h1>PageNotFound</h1>;

};

PageNotFound.propTypes = {
  logger: PropTypes.object,
};

// eslint-disable-next-line import/no-default-export
export default withLogger(PageNotFound);
