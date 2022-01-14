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
  ToastContainer
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {
  Form
} from 'app/components/form/form';

import {
  LoginForm
} from 'app/components/form/loginForm';

import {
  Greeting
} from 'app/components/greeting/greeting';

import {
  Loader
} from 'app/components/loader/loader';

import {
  Popup
} from 'app/components/popup/popup';

import {
  Tasks
} from 'app/components/tasks/tasks';

import {
  Button
} from 'app/elements/button/button';

import {
  Header
} from 'app/elements/header/header';

import {
  ListHeader
} from 'app/elements/listHeader/listHeader';

import {
  withLogger
} from 'app/hoc/withLogger';

import {
  withReduxState
} from 'app/hoc/withReduxState';

class TodoHome extends Component {

  static propTypes = {
    isLoading: PropTypes.bool,
    tasks: PropTypes.array,
    getTasks: PropTypes.func.isRequired,
    showForm: PropTypes.bool,
    addNewTask: PropTypes.func,
    isError: PropTypes.bool,
    showPopup: PropTypes.bool,
    showLogin: PropTypes.bool,
    message: PropTypes.string,
    togglePopup: PropTypes.func,
    closeForm: PropTypes.func,
    closeLoginForm: PropTypes.func,
    loginUser: PropTypes.func,
    showAddTaskForm: PropTypes.func,
    isSubmittingTask: PropTypes.bool,
  };

  static defaultProps = {
    tasks: [],
    isLoading: false,
    showForm: false,
  };

  componentDidMount = () => {

    const { getTasks, } = this.props;

    getTasks();

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
      showLogin,
      closeLoginForm,
      loginUser,
    } = this.props;

    return (
      <React.Fragment>
        <Greeting />
        {isLoading ? (
          <Loader size='7x' />
        ) : (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <ListHeader>
              <Header>Tasks</Header>
              <Button data-testid='show-task-form' onClick={() => showAddTaskForm()} circle>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </ListHeader>

            <Form
              show={showForm}
              isLoading={isSubmittingTask}
              onCloseButton={closeForm}
              onOkButton={addNewTask}
            />

            <LoginForm
              show={showLogin}
              isLoading={isSubmittingTask}
              onCloseButton={closeLoginForm}
              onOkButton={loginUser}
            />

            <Popup
              onButtonPress={togglePopup}
              isError={isError}
              show={showPopup}
              message={message}
            />

            <Tasks
              onAddSubTask={showAddTaskForm}
              tasks={tasks}
              root={true}
            />

            <ToastContainer autoClose={2000} />
          </div>
        )}
      </React.Fragment>
    );

  };

}

export const Home = withReduxState(withLogger(TodoHome));
