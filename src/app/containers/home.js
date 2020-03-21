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
  v4 as uuid 
} from 'uuid';

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
  getTasks,
  removeTask 
} from 'app/redux/actions';

import {
  Colors 
} from 'app/styles/colors';

const mapStateToProps = state => ({
  isLoading: state.home.isLoading,
  tasks: state.tasks,
  isSubmittingTask: state.home.isSubmittingTask,
  addTaskStatus: state.home.addTaskStatus,
  addTaskMessage: state.home.addTaskMessage,
});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(getTasks()),
  addTask: payload => dispatch(addTask(payload)),
  removeTask: payload => dispatch(removeTask(payload)),
});

class TodoHome extends Component {

  state = {
    showPopup: false,
    showForm: false,
    rootId: null,
  };

  static propTypes = {
    isLoading: PropTypes.bool,
    tasks: PropTypes.array,
    getTasks: PropTypes.func,
    isSubmittingTask: PropTypes.bool,
    addTaskStatus: PropTypes.string,
    addTaskMessage: PropTypes.string,
    addTask: PropTypes.func,
    removeTask: PropTypes.func,
  };

  static defaultProps = {
    addTaskStatus: '',
    addTaskMessage: '',
    isSubmittingTask: false,
    tasks: [],
    isLoading: false,
    getTasks: () => {},
    addTask: () => {},
    removeTask: () => {},
  };

  togglePopup = () => {

    this.setState(prevState => ({
      showPopup: !prevState.showPopup,
    }));
  
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

  deleteTask = index => {

    this.props.removeTask(index);
  
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
    const showPopup = this.state.showPopup;
    const showForm = this.state.showForm;

    return (
      <>
        <Greeting />
        <Header color={Colors.softOrange}>Home</Header>
        {isLoading ? (
          <Loader size='7x' />
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
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
                onCancelButtonPress={this.togglePopup}
                iconType='success'
                show={showPopup}
                message='There was an error making a request.'
              />

              <Tasks
                onAddSubTask={this.showAddTaskForm}
                onDeleteTask={this.deleteTask}
                tasks={tasks}
              />
            </div>
          </>
        )}
      </>
    );
  
  };

}

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(withLogger(TodoHome));
