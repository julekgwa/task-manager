import {
  faPlus 
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React, {
  Component 
} from 'react';

import {
  connect 
} from 'react-redux';

import {
  Task 
} from 'app/components/task';

import {
  Button 
} from 'app/elements/button/button';

import {
  Header 
} from 'app/elements/header/header';

import {
  withLogger 
} from 'app/hoc/withLogger';

import {
  Colors 
} from 'app/styles/colors';

const mapStateToProps = state => ({
  isLoadingTasks: state.isLoadingTasks,
  tasks: state.tasks,
});

class TodoHome extends Component {

  static propTypes = {
    isLoadingTasks: PropTypes.bool,
  }

  render = () => {

    return (
      <>
        <Header color={Colors.softOrange}>Home</Header>
        {this.props.isLoadingTasks ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Task />
            <Button circle>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </>
        )}
      </>
    );
  
  };

}

export const Home = connect(mapStateToProps)(withLogger(TodoHome));
