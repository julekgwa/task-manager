import PropTypes from 'prop-types';

import React, {

  Component 
} from 'react';

import {
  connect 
} from 'react-redux';

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
  getTask,
  updateSubTask 
} from 'app/redux/actions';

const mapStateToProps = state => ({
  task: state.task,
});

const mapDispatchToProps = dispatch => ({
  getTask: payload => dispatch(getTask(payload)),
  updateSubTask: payload => dispatch(updateSubTask(payload)),
});

class TodoEdit extends Component {

  static propTypes = {
    logger: PropTypes.object,
    match: PropTypes.object,
    getTask: PropTypes.func,
    updateSubTask: PropTypes.func,
    task: PropTypes.object,
  };

  static defaultProps = {
    task: {},
    getTask: () => {},
    updateSubTask: () => {},
    logger: {},
    match: {},
  };

  componentDidMount = () => {

    const { taskId, root, } = this.props.match.params;

    this.props.getTask({
      taskId: taskId,
      isRoot: root === 'task',
    });

    this.props.logger.info('/edit', 'edit page: => ' + taskId);
  
  };

  render = () => {

    const task = this.props.task;
    const updateSubTask = this.props.updateSubTask;

    return (
      <>
        <Header>Edit</Header>
        <EditTask dueDate={task.dueDate} updateSubTask={updateSubTask} title={task.title} subTasks={task.tasks}/>
      </>
    );
  
  };

}

export const Edit = connect(
  mapStateToProps,
  mapDispatchToProps
)(withLogger(TodoEdit));
