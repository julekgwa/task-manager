import PropTypes from 'prop-types';

import React, {
  Component
} from 'react';

import {
  connect
} from 'react-redux';

import {
  compose
} from 'redux';

import {
  CLOSE_POPUP,
  TASK_TYPE
} from 'app/constants';

import {
  addTask,
  closePopup,
  getTasks
} from 'app/redux/actions';

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  tasks: state.tasks,
  isSubmittingTask: state.isSubmittingTask,
  isError: state.isError,
  message: state.message,
  showPopup: state.showPopup,
  reminderTasks: state.reminderTasks,
});

const mapDispatchToProps = dispatch => ({
  getTasks: (payload) => dispatch(getTasks(payload)),
  addTask: (payload, type) => dispatch(addTask(payload, type)),
  closePopup: (type, payload) => dispatch(closePopup(type, payload)),
});

const withRedux = WrappedComponent => {

  return class WithRedux extends Component {

    static propTypes = {
      getTasks: PropTypes.func,
      updateTask: PropTypes.func,
      tasks: PropTypes.array,
      isSubmittingTask: PropTypes.bool,
      addTask: PropTypes.func,
      isLoading: PropTypes.bool,
      isError: PropTypes.bool,
      showPopup: PropTypes.bool,
      message: PropTypes.string,
      closePopup: PropTypes.func,
    };

    static defaultProps = {
      tasks: [],
      isSubmittingTask: false,
      isLoading: false,
      isError: false,
      message: '',
      showPopup: false,
    };

    state = {
      showForm: false,
      rootId: null,
    };

    togglePopup = () => {

      const { closePopup, } = this.props;

      closePopup(CLOSE_POPUP, false);

    };

    showAddTaskForm = rootId => {

      this.setState({
        showForm: true,
        rootId: rootId || null,
      });

    };

    closeForm = () => {

      this.setState({
        showForm: false,
      });

    };

    addNewTask = (task, dueDate) => {

      const { addTask, } = this.props;
      const { rootId, } = this.state;

      addTask(
        {
          title: task,
          status: false,
          dueDate: dueDate,
          rootId: rootId,
          tasks: [],
        },
        rootId ? TASK_TYPE.subtask : TASK_TYPE.task
      );

    };

    render = () => {

      const { showForm, } = this.state;

      return (
        <WrappedComponent
          closeForm={this.closeForm}
          addNewTask={this.addNewTask}
          showForm={showForm}
          togglePopup={this.togglePopup}
          showAddTaskForm={this.showAddTaskForm}
          {...this.props}
        />
      );

    };

  };

};

export const withReduxState = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRedux
);
