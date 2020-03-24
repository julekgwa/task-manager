import PropTypes from 'prop-types';

import React, {

  Component 
} from 'react';

import {
  connect 
} from 'react-redux';

import {
  v4 as uuid 
} from 'uuid';

import {
  Form 
} from 'app/components/form/form';

import {
  EditTask 
} from 'app/components/tasks/editTask';

import {
  Header 
} from 'app/elements/header/header';

import {
  withLogger 
} from 'app/hoc/withLogger';

import {
  addTask,
  getTask, 
  updateSubTask
} from 'app/redux/actions';

const mapStateToProps = state => ({
  task: state.app.task,
  isLoading: state.edit.isLoading,
  isSubmittingTask: state.edit.isSubmittingTask,
  addTaskStatus: state.edit.addTaskStatus,
  addTaskMessage: state.edit.addTaskMessage,
});

const mapDispatchToProps = dispatch => ({
  getTask: payload => dispatch(getTask(payload)),
  updateSubTask: payload => dispatch(updateSubTask(payload)),
  addTask: payload => dispatch(addTask(payload)),
});

class TodoEdit extends Component {

  static propTypes = {
    logger: PropTypes.object,
    match: PropTypes.object,
    getTask: PropTypes.func,
    updateSubTask: PropTypes.func,
    task: PropTypes.object,
    isSubmittingTask: PropTypes.bool,
    addTaskStatus: PropTypes.string,
    addTaskMessage: PropTypes.string,
    addTask: PropTypes.func,
  };

  static defaultProps = {
    task: {},
    getTask: () => {},
    updateSubTask: () => {},
    logger: {},
    match: {},
    addTaskStatus: '',
    addTaskMessage: '',
    isSubmittingTask: false,
  };

  state = {
    showForm: false,
    rootId: null,
  };

  showAddTaskForm = () => {

    this.setState({
      showForm: true,
    });
  
  };

  onCloseButton = () => {

    this.setState({
      showForm: false,
    })
  
  }

  addTask = (task, dueDate) => {

    this.props.addTask({
      title: task,
      status: false,
      dueDate: dueDate,
      rootId: this.state.rootId,
      tasks: [],
      id: uuid(),
    });
  
  };

  // eslint-disable-next-line
  static getDerivedStateFromProps(nextProps, prevState) {

    return nextProps.match.params.taskId !== prevState.rootId ? {
      rootId : nextProps.match.params.taskId,
    } : null;
  
  }

  componentDidMount = () => {

    const { taskId, } = this.props.match.params;

    this.setState({
      rootId: taskId,
    });

    this.props.logger.info('/edit', 'edit page: => ' + taskId);
  
  };

  render = () => {

    const task = this.props.task;
    const updateSubTask = this.props.updateSubTask;
    const showForm = this.state.showForm;
    const isSubmittingTask = this.props.isSubmittingTask;
    const addTaskStatus = this.props.addTaskStatus;
    const addTaskMessage = this.props.addTaskMessage;
    const { type, } = this.props.match.params; 

    return (
      <>
        <Header>Edit</Header>

        <EditTask
          task={task}
          taskId={this.state.rootId}
          type={type}
          getTask={this.props.getTask}
          updateSubTask={updateSubTask}
          showAddTaskForm={this.showAddTaskForm}
        />

        <Form
          show={showForm}
          onCloseButton={this.onCloseButton}
          onOkButton={this.addTask}
          isLoading={isSubmittingTask}
          requestStatus={addTaskStatus}
          message={addTaskMessage}
        />

      </>
    );
  
  };

}

export const Edit = connect(
  mapStateToProps,
  mapDispatchToProps
)(withLogger(TodoEdit));
