import PropTypes from 'prop-types';

import React, {

  Component
} from 'react';

import {
  ToastContainer
} from 'react-toastify';

import {
  LoginForm
} from 'app/components/form/loginForm';

import {
  Loader
} from 'app/components/loader/loader';

import {
  Popup
} from 'app/components/popup/popup';

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
  withReduxState
} from 'app/hoc/withReduxState';

import 'react-toastify/dist/ReactToastify.css';

class TodoReminders extends Component {

  static propTypes = {
    getTasks: PropTypes.func.isRequired,
    reminderTasks: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    togglePopup: PropTypes.func,
    isError: PropTypes.bool,
    showPopup: PropTypes.bool,
    message: PropTypes.string,
    showLogin: PropTypes.bool,
    closeLoginForm: PropTypes.func,
    loginUser: PropTypes.func,
    isSubmittingTask: PropTypes.bool,
  };

  static defaultProps = {
    reminderTasks: [],
    isLoading: false,
  };

  componentDidMount = () => {

    const { getTasks, } = this.props;

    getTasks(GET_REMINDERS);

  };

  render = () => {

    const {
      isLoading,
      reminderTasks: tasks,
      togglePopup,
      isError,
      showPopup,
      message,
      showLogin,
      closeLoginForm,
      loginUser,
      isSubmittingTask,
    } = this.props;

    return (
      <React.Fragment>
        <Header>Reminders</Header>
        {isLoading ? (
          <Loader size='5x' />
        ) : (
          <TaskReminder tasks={tasks} />
        )}

        <Popup
          onButtonPress={togglePopup}
          isError={isError}
          show={showPopup}
          message={message}
        />

        <LoginForm
          show={showLogin}
          isLoading={isSubmittingTask}
          onCloseButton={closeLoginForm}
          onOkButton={loginUser}
        />
        <ToastContainer autoClose={2000} />
      </React.Fragment>
    );

  };

}

export const Reminders = withReduxState(withLogger(TodoReminders));
