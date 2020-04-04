import {
  faPencilAlt,
  faPlus,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React, {
  useEffect,
  useState
} from 'react';

import {
  connect
} from 'react-redux';

import {
  Link
} from 'react-router-dom';

import {
  TASK_TYPE
} from 'app/constants';

import {
  TaskContainer
} from 'app/elements/taskContainer/taskContainer';

import {
  removeTask
} from 'app/redux/actions';

import {
  Loader
} from '../loader/loader';

const mapStateToProps = state => ({
  isUpdatingTask: state.isUpdatingTask,
  updatedId: state.updatedId,
});

const mapDispatchToProps = dispatch => ({
  deleteTask: payload => dispatch(removeTask(payload)),
});

const Task = ({
  title,
  subTasks,
  deleteTask,
  addSubTask,
  taskId,
  isUpdatingTask,
  root,
  updatedId,
}) => {

  const [isRemovingTask, setIsRemovingTask] = useState(false);

  useEffect(() => {

    setIsRemovingTask((isUpdatingTask && isRemovingTask) || false);

  }, [isUpdatingTask, isRemovingTask]);

  const remove = () => {

    setIsRemovingTask(true);

    deleteTask({
      id: taskId,
    });

  };

  return (
    <TaskContainer wasRemoved={taskId === updatedId} isDeleting={isRemovingTask && isUpdatingTask}>
      <div className='container'>
        <h1>{title}</h1>
        <p>{subTasks} Tasks</p>
        <hr />
        <div className='buttons'>
          {isRemovingTask && isUpdatingTask ? (
            <div className='loader'><Loader size='3x' /></div>
          ) : (
            <React.Fragment>
              <FontAwesomeIcon
                role='img'
                data-testid='add'
                size='lg'
                onClick={addSubTask}
                icon={faPlus}
              />
              <Link to={`/edit/${taskId}/${root ? TASK_TYPE.task : TASK_TYPE.subtask}`}>
                <FontAwesomeIcon size='lg' icon={faPencilAlt} />
              </Link>
              <FontAwesomeIcon
                data-testid='remove'
                size='lg'
                onClick={remove}
                icon={faTrash}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </TaskContainer>
  );

};

Task.propTypes = {
  title: PropTypes.string.isRequired,
  subTasks: PropTypes.number.isRequired,
  deleteTask: PropTypes.func.isRequired,
  addSubTask: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired,
  isUpdatingTask: PropTypes.bool,
  root: PropTypes.bool,
  updatedId: PropTypes.string,
};

Task.defaultProps = {
  title: 'No Title',
  subTasks: 0,
  addSubTask: () => {},
  isUpdatingTask: false,
  root: false,
  updatedId: '',
};

export const TaskItem = connect(mapStateToProps, mapDispatchToProps)(Task);
