import {
  faPlus,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import { TaskContainer } from 'app/elements/taskContainer/taskContainer';

export const Task = ({ taskTittle, taskCount }) => (
  <TaskContainer>
    <div>
      <h1>{taskTittle}</h1>
      <p>{taskCount} Tasks</p>
      <hr />
      <div className="buttons">
        <FontAwesomeIcon size="lg" icon={faPlus} />
        <FontAwesomeIcon size="lg" icon={faEdit} />
        <FontAwesomeIcon size="lg" icon={faTrash} />
      </div>
    </div>
  </TaskContainer>
);

Task.propTypes = {
  taskTittle: PropTypes.string.isRequired,
  taskCount: PropTypes.number.isRequired
}

Task.defaultProps = {
  taskTittle: 'No Title',
  taskCount: 0
}
