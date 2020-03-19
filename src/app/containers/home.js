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
  getTasks 
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
});

class TodoHome extends Component {

  state = {
    showPopup: false,
    taskStartDate: new Date(),
    taskValue: '',
    showForm: false,
    isInputEmpty: false,
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
  };

  static defaultProps = {
    addTaskStatus: '',
    addTaskMessage: '',
    isSubmittingTask: false,
    tasks: [],
    isLoading: false,
    getTasks: () => {},
    addTask: () => {},
  };

  togglePopup = () => {

    this.setState(prevState => ({
      showPopup: !prevState.showPopup,
    }));
  
  };

  showAddTaskForm = (rootId) => {
    
    this.setState({
      showForm: true,
      rootId: rootId || null,
    });
  
  };

  closeForm = () => {

    this.setState({
      showForm: false,
      taskValue: '',
      isInputEmpty: false,
    });
  
  };

  addTask = () => {

    if (!this.state.taskValue) {

      this.setState({
        isInputEmpty: true,
      });

      return;
    
    }

    this.props.addTask({
      title: this.state.taskValue,
      status: false,
      dueDate: this.state.taskStartDate,
      rootId: this.state.rootId,
      tasks: [],
      id: uuid(),
    });

    this.setState({
      taskValue: '',
    });
  
  };

  handleTaskValueChange = e => {

    this.setState({
      taskValue: e.target.value,
      isInputEmpty: false,
    });
  
  };

  handleDateChange = date => {

    this.setState({
      taskStartDate: date,
    });
  
  };

  deleteTask = () => {
  
  }

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
    const taskStartDate = this.state.taskStartDate;
    const showForm = this.state.showForm;
    const taskValue = this.state.taskValue;
    const isInputEmpty = this.state.isInputEmpty;

    return (
      <>
        <Header color={Colors.softOrange}>Home</Header>
        <Greeting />
        {isLoading ? (
          <Loader size="7x" />
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
                taskStartDate={taskStartDate}
                isSubmittingTask={isSubmittingTask}
                addTaskStatus={addTaskStatus}
                addTaskMessage={addTaskMessage}
                onDateChange={this.handleDateChange}
                onCloseForm={this.closeForm}
                onConfirm={this.addTask}
                onTaskInputChange={this.handleTaskValueChange}
                taskInputValue={taskValue}
                isInputEmpty={isInputEmpty}
              />

              <Popup
                onCancelButtonPress={this.togglePopup}
                iconType="success"
                show={showPopup}
                message="There was an error making a request."
              />

              <Tasks onAddSubTask={this.showAddTaskForm} onDeleteTask={this.deleteTask} tasks={tasks} />
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
