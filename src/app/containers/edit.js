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
  Header 
} from 'app/elements/header/header';

import {
  withLogger 
} from 'app/hoc/withLogger';

import {
  addTask,
  closePopup, 
  getTask,
  updateSubTask
} from 'app/redux/actions';

import {
  CLOSE_EDIT_POPUP 
} from 'app/redux/constants';

const mapStateToProps = state => ({
  task: state.app.task,
  isLoading: state.edit.isLoading,
  isSubmittingTask: state.edit.isSubmittingTask,
  addTaskStatus: state.edit.addTaskStatus,
  addTaskMessage: state.edit.addTaskMessage,
  isError: state.edit.isError,
  message: state.edit.message,
  showPopup: state.edit.showPopup
});

const mapDispatchToProps = dispatch => ({
  getTask: payload => dispatch(getTask(payload)),
  updateSubTask: payload => dispatch(updateSubTask(payload)),
  addTask: payload => dispatch(addTask(payload)),
  closePopup: (type, payload) => dispatch(closePopup(type, payload))
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
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    showPopup: PropTypes.bool,
    message: PropTypes.string,
    closePopup: PropTypes.func
  };

  static defaultProps = {
    task: {},
    getTask: () => {},
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

    this.props.closePopup(CLOSE_EDIT_POPUP, false);
  
  };

  addTask = (task, dueDate) => {

    this.props.addTask({
      title: task,
      status: false,
      dueDate: dueDate,
      rootId: this.state.rootId,
      tasks: [],
      id: uuid()
    });
  
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

    this.props.logger.info('/edit', 'edit page: => ' + taskId);
  
  };

  render = () => {

    const task = this.props.task;
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
    const getTask = this.props.getTask;

    return (
      <React.Fragment>
        <Header>Edit</Header>
        
        <EditTask
          task={task}
          taskId={this.state.rootId}
          type={type}
          getTask={getTask}
          isLoading={isLoading}
          updateSubTask={updateSubTask}
          showAddTaskForm={this.showAddTaskForm}
        />

        <Popup
          onButtonPress={this.togglePopup}
          isError={isError}
          show={showPopup}
          message={message}
        />

        <Form
          show={showForm}
          onCloseButton={this.onCloseButton}
          onOkButton={this.addTask}
          isLoading={isSubmittingTask}
          requestStatus={addTaskStatus}
          message={addTaskMessage}
        />

      </React.Fragment>
    );
  
  };

}

export const Edit = connect(
  mapStateToProps,
  mapDispatchToProps
)(withLogger(TodoEdit));
