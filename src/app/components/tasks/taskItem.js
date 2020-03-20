import {
  faPencilAlt,
  faPlus,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React from 'react';

import {
  Link 
} from 'react-router-dom';

import {
  TaskContainer 
} from 'app/elements/taskContainer/taskContainer';

export const TaskItem = ({
  title,
  subTasks,
  deleteTask,
  addSubTask,
  taskId,
  rootId,
}) => (
  <TaskContainer>
    <div>
      <h1>{title}</h1>
      <p>{subTasks} Tasks</p>
      <hr />
      <div className="buttons">
        <FontAwesomeIcon
          size="lg"
          onClick={addSubTask}
          icon={faPlus}
        />
        <Link to={`/edit/${taskId}/${rootId ? rootId : 'task' }`}>
          <FontAwesomeIcon size="lg" icon={faPencilAlt} />
        </Link>
        <FontAwesomeIcon
          size="lg"
          onClick={deleteTask}
          icon={faTrash}
        />
      </div>
    </div>
  </TaskContainer>
);

TaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  subTasks: PropTypes.number.isRequired,
  deleteTask: PropTypes.func.isRequired,
  addSubTask: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired,
  rootId: PropTypes.any,
};

TaskItem.defaultProps = {
  title: 'No Title',
  subTasks: 0,
  deleteTask: () => {},
  addSubTask: () => {},
};
