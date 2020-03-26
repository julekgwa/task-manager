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
  Popup 
} from 'app/components/popup/popup';

import {
  EditTask 
} from 'app/components/tasks/editTask';

import {
  CLOSE_POPUP,
  TASK_TYPE 
} from 'app/constants';

import {
  Header 
} from 'app/elements/header/header';

import {
  withLogger 
} from 'app/hoc/withLogger';

import {
  addTask,
  closePopup, 
  getTasks,
  updateSubTask
} from 'app/redux/actions';

const mapStateToProps = state => ({
  tasks: state.tasks,
  isLoading: state.isLoading,
  isSubmittingTask: state.isSubmittingTask,
  addTaskStatus: state.addTaskStatus,
  addTaskMessage: state.addTaskMessage,
  isError: state.isError,
  message: state.message,
  showPopup: state.showPopup
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(getTasks()),
  updateSubTask: payload => dispatch(updateSubTask(payload)),
  addTask: (payload, type) => dispatch(addTask(payload, type)),
  closePopup: (type, payload) => dispatch(closePopup(type, payload))
});

class TodoEdit extends Component {

  static propTypes = {
    logger: PropTypes.object,
    match: PropTypes.object,
    getTasks: PropTypes.func,
    updateSubTask: PropTypes.func,
    tasks: PropTypes.array,
    isSubmittingTask: PropTypes.bool,
    addTaskStatus: PropTypes.string,
    addTaskMessage: PropTypes.string,
    addTask: PropTypes.func,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    showPopup: PropTypes.bool,
    message: PropTypes.string,
    closePopup: PropTypes.func
  };

  static defaultProps = {
    tasks: [],
    getTasks: () => {},
    updateSubTask: () => {},
    closePopup: () => {},
    logger: {},
    match: {},
    addTaskStatus: '',
    addTaskMessage: '',
    isSubmittingTask: false,
    isLoading: false,
    isError: false,
    message: '',
    showPopup: false
  };

  state = {
    showForm: false,
    rootId: null
  };

  showAddTaskForm = () => {

    this.setState({
      showForm: true
    });
  
  };

  onCloseButton = () => {

    this.setState({
      showForm: false
    });
  
  }

  togglePopup = () => {

    this.props.closePopup(CLOSE_POPUP, false);
  
  };

  addTask = (task, dueDate) => {

    this.props.addTask({
      title: task,
      status: false,
      dueDate: dueDate,
      rootId: this.state.rootId,
      tasks: [],
      id: uuid()
    }, TASK_TYPE.subtask);
  
  };

  // eslint-disable-next-line
  static getDerivedStateFromProps(nextProps, prevState) {

    return nextProps.match.params.taskId !== prevState.rootId ? {
      rootId : nextProps.match.params.taskId
    } : null;
  
  }

  componentDidMount = () => {

    const { taskId } = this.props.match.params;

    this.setState({
      rootId: taskId
    });

    this.props.getTasks();

    this.props.logger.info('/edit', 'edit page: => ' + taskId);
  
  };

  render = () => {

    const tasks = this.props.tasks;
    const updateSubTask = this.props.updateSubTask;
    const showForm = this.state.showForm;
    const isSubmittingTask = this.props.isSubmittingTask;
    const addTaskStatus = this.props.addTaskStatus;
    const addTaskMessage = this.props.addTaskMessage;
    const isLoading =this.props.isLoading;
    const { type } = this.props.match.params;
    const showPopup = this.props.showPopup;
    const message = this.props.message;
    const isError = this.props.isError;

    return (
      <React.Fragment>
        <Header>Edit</Header>
        
        <EditTask
          tasks={tasks}
          taskId={this.state.rootId}
          type={type}
          isLoading={isLoading}
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

        <Popup
          onButtonPress={this.togglePopup}
          isError={isError}
          show={showPopup}
          message={message}
        />

      </React.Fragment>
    );
  
  };

}

export const Edit = connect(
  mapStateToProps,
  mapDispatchToProps
)(withLogger(TodoEdit));
