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
  TaskContainer 
} from 'app/elements/taskContainer/taskContainer';

import {
  removeTask 
} from 'app/redux/actions';

import {
  Loader 
} from '../loader/loader';

const mapStateToProps = state => ({
  isDeleting: state.app.isDeleting
});

const mapDispatchToProps = dispatch => ({
  deleteTask: payload => dispatch(removeTask(payload))
});

const Task = ({
  title,
  subTasks,
  deleteTask,
  addSubTask,
  taskId,
  isDeleting
}) => {

  const [isRemovingTask, setIsRemovingTask] = useState(false);

  useEffect(() => {

    setIsRemovingTask(isDeleting && isRemovingTask || false);
  
  }, [isDeleting]);

  const remove = () => {

    setIsRemovingTask(true);

    deleteTask({
      id: taskId
    });
  
  }

  return (
    <TaskContainer>
      <div>
        <h1>{title}</h1>
        <p>{subTasks} Tasks</p>
        <hr />
        <div className='buttons'>
          {isRemovingTask && isDeleting ? (
            <div className='loader'><Loader size='3x' /></div>
          ) : (
            <React.Fragment>
              <FontAwesomeIcon
                size='lg'
                onClick={addSubTask}
                icon={faPlus}
              />
              <Link to={`/edit/${taskId}`}>
                <FontAwesomeIcon size='lg' icon={faPencilAlt} />
              </Link>
              <FontAwesomeIcon
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
  isDeleting: PropTypes.bool
};

Task.defaultProps = {
  title: 'No Title',
  subTasks: 0,
  deleteTask: () => {},
  addSubTask: () => {},
  isDeleting: false
};

export const TaskItem = connect(mapStateToProps, mapDispatchToProps)(Task);
