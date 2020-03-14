import PropTypes from "prop-types";

import React, {
  Component 
} from "react";

import {
  Header 
} from "app/elements/header/header";

import {
  withLogger 
} from "app/hoc/withLogger";

class TodoEdit extends Component {

  static propTypes = {
    logger: PropTypes.object,
  };

  componentDidMount = () => {

    this.props.logger.info('/edit', 'edit page');
  
  }

  render = () => {

    return (
      <>
        <Header>Edit</Header>
      </>
    );
  
  };

}

export const Edit = withLogger(TodoEdit);
