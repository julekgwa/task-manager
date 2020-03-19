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
  TaskContainer 
} from 'app/elements/taskContainer/taskContainer';

export const TaskItem = ({ title, subTasks, deleteTask, addSubTask, }) => (
  <TaskContainer>
    <div>
      <h1>{title}</h1>
      <p>{subTasks} Tasks</p>
      <hr />
      <div className="buttons">
        <FontAwesomeIcon size="lg" onClick={addSubTask} icon={faPlus} />
        <FontAwesomeIcon size="lg" icon={faPencilAlt} />
        <FontAwesomeIcon size="lg" onClick={deleteTask} icon={faTrash} />
      </div>
    </div>
  </TaskContainer>
);

TaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  subTasks: PropTypes.number.isRequired,
  deleteTask: PropTypes.func.isRequired,
  addSubTask: PropTypes.func.isRequired,
};

TaskItem.defaultProps = {
  title: 'No Title',
  subTasks: 0,
  deleteTask: () => {},
  addSubTask: () => {},
};
