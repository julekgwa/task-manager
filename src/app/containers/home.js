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
  connect 
} from 'react-redux';

import {
  Form 
} from 'app/components/form/form';

import {
  Greeting 
} from 'app/components/greeting';

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
  addTask,
  closePopup,
  getTasks,
  removeTask
} from 'app/redux/actions';

import {
  CLOSE_HOME_POPUP 
} from 'app/redux/constants';

import {
  Colors 
} from 'app/styles/colors';

const mapStateToProps = state => ({
  isLoading: state.home.isLoading,
  tasks: state.app.tasks,
  isSubmittingTask: state.home.isSubmittingTask,
  addTaskStatus: state.home.addTaskStatus,
  addTaskMessage: state.home.addTaskMessage,
  isError: state.home.isError,
  message: state.home.message,
  showPopup: state.home.showPopup
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(getTasks()),
  addTask: (payload, type) => dispatch(addTask(payload, type)),
  removeTask: payload => dispatch(removeTask(payload)),
  closePopup: (type, payload) => dispatch(closePopup(type, payload))
});

class TodoHome extends Component {

  state = {
    showForm: false,
    rootId: null
  };

  static propTypes = {
    isLoading: PropTypes.bool,
    tasks: PropTypes.array,
    getTasks: PropTypes.func,
    isSubmittingTask: PropTypes.bool,
    addTaskStatus: PropTypes.string,
    addTaskMessage: PropTypes.string,
    addTask: PropTypes.func,
    isError: PropTypes.bool,
    showPopup: PropTypes.bool,
    message: PropTypes.string,
    closePopup: PropTypes.func
  };

  static defaultProps = {
    addTaskStatus: '',
    addTaskMessage: '',
    isSubmittingTask: false,
    tasks: [],
    isLoading: false,
    showPopup: false,
    isError: false,
    message: '',
    getTasks: () => {},
    addTask: () => {},
    closePopup: () => {}
  };

  togglePopup = () => {

    this.props.closePopup(CLOSE_HOME_POPUP, false);
  
  };

  showAddTaskForm = rootId => {

    this.setState({
      showForm: true,
      rootId: rootId || null
    });
  
  };

  closeForm = () => {

    this.setState({
      showForm: false
    });
  
  };

  addTask = (task, dueDate) => {

    this.props.addTask(
      {
        title: task,
        status: false,
        dueDate: dueDate,
        rootId: this.state.rootId,
        tasks: []
      },
      this.state.rootId ? 'subtask' : 'task'
    );
  
  };

  componentDidMount = () => {

    this.props.getTasks();
  
  };

  render = () => {

    const tasks = this.props.tasks || [];
    const isLoading = this.props.isLoading;
    const isSubmittingTask = this.props.isSubmittingTask;
    const addTaskStatus = this.props.addTaskStatus;
    const addTaskMessage = this.props.addTaskMessage;
    const showPopup = this.props.showPopup;
    const message = this.props.message;
    const isError = this.props.isError;
    const showForm = this.state.showForm;

    return (
      <React.Fragment>
        <Greeting />
        <Header color={Colors.softOrange}>Home</Header>
        {isLoading ? (
          <Loader size='7x' />
        ) : (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            <ListHeader>
              <Header>Tasks</Header>
              <Button onClick={() => this.showAddTaskForm()} circle>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </ListHeader>

            <Form
              show={showForm}
              isLoading={isSubmittingTask}
              requestStatus={addTaskStatus}
              message={addTaskMessage}
              onCloseButton={this.closeForm}
              onOkButton={this.addTask}
            />

            <Popup
              onButtonPress={this.togglePopup}
              isError={isError}
              show={showPopup}
              message={message}
            />

            <Tasks
              onAddSubTask={this.showAddTaskForm}
              tasks={tasks}
            />
          </div>
        )}
      </React.Fragment>
    );
  
  };

}

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(withLogger(TodoHome));
