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
  Form
} from 'app/components/form/form';

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

import {
  Colors
} from 'app/styles/colors';

class TodoHome extends Component {

  static propTypes = {
    isLoading: PropTypes.bool,
    tasks: PropTypes.array,
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
    } = this.props;

    return (
      <React.Fragment>
        <Greeting />
        <Header data-testid='home-header' color={Colors.softOrange}>Home</Header>
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
          </div>
        )}
      </React.Fragment>
    );

  };

}

export const Home = withReduxState(withLogger(TodoHome));
