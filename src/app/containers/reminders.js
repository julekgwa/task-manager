import PropTypes from 'prop-types';

import React, {

  Component
} from 'react';

import {
  connect
} from 'react-redux';

import {
  Loader
} from 'app/components/loader/loader';

import {
  TaskReminder
} from 'app/components/tasks/reminder';

import {
  GET_REMINDERS
} from 'app/constants';

import {
  Header
} from 'app/elements/header/header';

import {
  withLogger
} from 'app/hoc/withLogger';

import {
  getTasks
} from 'app/redux/actions';

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  reminderTasks: state.reminderTasks,
});

const mapDispatchToProps = dispatch => ({
  getTasks: payload => dispatch(getTasks(payload)),
});

class TodoReminders extends Component {

  static propTypes = {
    getTasks: PropTypes.func,
    reminderTasks: PropTypes.array,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    getTasks: () => {},
    reminderTasks: [],
    isLoading: false,
  };

  componentDidMount = () => {

    const { getTasks, } = this.props;

    getTasks(GET_REMINDERS);

  };

  render = () => {

    const { isLoading, reminderTasks: tasks, } = this.props;

    return (
      <React.Fragment>
        <Header>Reminders</Header>
        {isLoading
          ? <Loader size='5x' />
          : <TaskReminder tasks={tasks} />
        }
      </React.Fragment>
    );

  };

}

export const Reminders = connect(
  mapStateToProps,
  mapDispatchToProps
)(withLogger(TodoReminders));
