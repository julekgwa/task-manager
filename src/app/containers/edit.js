import PropTypes from 'prop-types';

import React, {
  Component
} from 'react';

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
  withReduxState
} from 'app/hoc/withReduxState';

class TodoEdit extends Component {

  state = {
    rootId: null,
  }

  static propTypes = {
    logger: PropTypes.object,
    match: PropTypes.object,
    isLoading: PropTypes.bool,
    tasks: PropTypes.array,
    getTasks: PropTypes.func,
    showForm: PropTypes.bool,
    addNewTask: PropTypes.func,
    isError: PropTypes.bool,
    showPopup: PropTypes.bool,
    message: PropTypes.string,
    togglePopup: PropTypes.func,
    closeForm: PropTypes.func,
    showAddTaskForm: PropTypes.func,
    isSubmittingTask: PropTypes.bool,
    updateSubTask: PropTypes.func,
  };

  static defaultProps = {
    tasks: [],
    getTasks: () => {},
    updateSubTask: () => {},
    showForm: false,
    logger: {},
    match: {},
    isLoading: false,
  };

  // eslint-disable-next-line
  static getDerivedStateFromProps(nextProps, prevState) {

    return nextProps.match.params.taskId !== prevState.rootId ? {
      rootId : nextProps.match.params.taskId,
    } : null;

  }

  componentDidMount = () => {

    const { match: { params: { taskId, }, }, getTasks, logger, } = this.props;

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
      updateSubTask,
    } = this.props;

    const { rootId, } = this.state;
    const { match: { params: { type, }, }, } = this.props;

    return (
      <React.Fragment>
        <Header>Edit</Header>

        <EditTask
          tasks={tasks}
          taskId={rootId}
          type={type}
          isLoading={isLoading}
          updateSubTask={updateSubTask}
          showAddTaskForm={() => showAddTaskForm(rootId)}
        />

        <Form
          show={showForm}
          isLoading={isSubmittingTask}
          onCloseButton={closeForm}
          onOkButton={addNewTask}
        />

        <Popup
          onButtonPress={togglePopup}
          isError={isError}
          show={showPopup}
          message={message}
        />

      </React.Fragment>
    );

  };

}

export const Edit = withReduxState(withLogger(TodoEdit));
