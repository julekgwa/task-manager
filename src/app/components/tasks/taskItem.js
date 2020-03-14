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

export const TaskItem = ({ title, subTasks, }) => (
  <TaskContainer>
    <div>
      <h1>{title}</h1>
      <p>{subTasks} Tasks</p>
      <hr />
      <div className="buttons">
        <FontAwesomeIcon size="lg" icon={faPlus} />
        <FontAwesomeIcon size="lg" icon={faPencilAlt} />
        <FontAwesomeIcon size="lg" icon={faTrash} />
      </div>
    </div>
  </TaskContainer>
);

TaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  subTasks: PropTypes.number.isRequired,
};

TaskItem.defaultProps = {
  title: 'No Title',
  subTasks: 0,
};
