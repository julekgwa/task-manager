import PropTypes from 'prop-types';

import React, {
  Component 
} from "react";

import {
  connect 
} from 'react-redux';

import {
  TaskReminder 
} from 'app/components/tasks/reminder';

import {
  Header 
} from "app/elements/header/header";

import {
  withLogger 
} from "app/hoc/withLogger";

import {
  getTasks 
} from 'app/redux/actions';

const mapStateToProps = state => ({
  isLoading: state.home.isLoading,
  tasks: state.tasks
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(getTasks())
});

class TodoReminders extends Component {

  static propTypes = {
    getTasks: PropTypes.func,
    tasks: PropTypes.array
  }

  static defaultProps = {
    getTasks: () => {},
    tasks: []
  } 

  componentDidMount = () => {

    this.props.getTasks();
  
  }

  render = () => {

    return (
      <React.Fragment>
        <Header>Reminders</Header>
        <TaskReminder tasks={this.props.tasks} />
      </React.Fragment>
    );
  
  };

}

export const Reminders = connect(mapStateToProps, mapDispatchToProps)(withLogger(TodoReminders));
