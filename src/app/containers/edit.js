import PropTypes from 'prop-types';

import React, {

  Component
} from 'react';

import {
  ToastContainer
} from 'react-toastify';

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
  ADD_TASK
} from 'app/constants';

import {
  Header
} from 'app/elements/header/header';

import {
  withLogger
} from 'app/hoc/withLogger';

import {
  withReduxState
} from 'app/hoc/withReduxState';

import 'react-toastify/dist/ReactToastify.css';

import {
  objectDepth
} from 'app/utils';

class TodoEdit extends Component {

  state = {
    rootId: null,
    title: '',
    dueDate: new Date(),
    isUpdateTask: false,
    task: {},
  };

  static propTypes = {
    logger: PropTypes.object,
    match: PropTypes.object,
    isLoading: PropTypes.bool,
    tasks: PropTypes.array.isRequired,
    getTasks: PropTypes.func.isRequired,
    showForm: PropTypes.bool,
    addNewTask: PropTypes.func,
    isError: PropTypes.bool,
    showPopup: PropTypes.bool,
    message: PropTypes.string,
    togglePopup: PropTypes.func,
    closeForm: PropTypes.func,
    showAddTaskForm: PropTypes.func,
    isSubmittingTask: PropTypes.bool,
    updateTask: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tasks: [],
    showForm: false,
    logger: {},
    match: {},
    isLoading: false,
  };

  updateInfo = (task) => {

    const { showAddTaskForm, } = this.props;
    const { rootId, } = this.state;

    this.setState({
      title: task.title,
      isUpdateTask: true,
      task: task,
      dueDate: parseInt(task.dueDate, 10) ? new Date(parseInt(task.dueDate, 10)) : new Date(),
    }, () => {

      showAddTaskForm(rootId);

    });

  };

  updateTaskInfo = (title, dueDate) => {

    const { task, } = this.state;
    const { updateTask, } = this.props;

    task.title = title;
    task.dueDate = dueDate;

    updateTask(task, ADD_TASK);

    this.setState({
      isUpdateTask: false,
      title: '',
      dueDate: new Date(),
    });

  }

  updateTaskCloseForm = () => {

    const { closeForm, } = this.props;

    this.setState({
      isUpdateTask: false,
    });

    closeForm();

  }

  getObjectDepth = tasks => {

    const { rootId, } = this.state;

    return objectDepth(rootId, tasks);

  };

  // eslint-disable-next-line
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.match.params.taskId !== prevState.rootId
      ? {
        rootId: nextProps.match.params.taskId,
      }
      : null;

  }

  componentDidMount = () => {

    const {
      match: { params: { taskId, }, },
      getTasks,
      logger,
    } = this.props;

    this.setState({
      rootId: taskId,
    });

    getTasks();

    logger.info('/edit', 'edit page: => ' + taskId);

  };

  render = () => {

    const {
      tasks,
      addNewTask,
      isError,
      showPopup,
      message,
      togglePopup,
      closeForm,
      isLoading,
      showForm,
      showAddTaskForm,
      isSubmittingTask,
    } = this.props;

    const { rootId, title, dueDate, isUpdateTask, } = this.state;
    const { match: { params: { type, }, }, } = this.props;
    const taskDepth = this.getObjectDepth(tasks);

    return (
      <React.Fragment>
        <Header>Edit</Header>

        <EditTask
          tasks={tasks}
          taskId={rootId}
          type={type}
          updateTaskInfo={this.updateInfo}
          disableAddButton={taskDepth >= 5}
          isLoading={isLoading}
          showAddTaskForm={() => showAddTaskForm(rootId)}
        />

        <Form
          show={showForm}
          isLoading={isSubmittingTask}
          onCloseButton={isUpdateTask ? this.updateTaskCloseForm : closeForm}
          taskTitle={title}
          taskDueDate={dueDate}
          okButtonText={isUpdateTask ? 'update' : 'add task'}
          onOkButton={isUpdateTask ? this.updateTaskInfo : addNewTask}
        />

        <Popup
          onButtonPress={togglePopup}
          isError={isError}
          show={showPopup}
          message={message}
        />
        <ToastContainer />
      </React.Fragment>
    );

  };

}

export const Edit = withReduxState(withLogger(TodoEdit));
