import {
  faAngleDoubleRight,
  faClipboardList,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React from 'react';

import {
  TaskContainer 
} from 'app/elements/taskContainer/taskContainer';

import {
  EditItem 
} from './editItem';

export const EditTask = ({ dueDate, title, subTasks, updateSubTask, }) => (
  <TaskContainer edit>
    <div className="add-task">
      <div className="todo">
        <FontAwesomeIcon size="2x" icon={faClipboardList} />
      </div>
      <div className="add-todo">
        <FontAwesomeIcon size="2x" icon={faPlus} />
      </div>
    </div>
    <div className="task-status">
      <p>{`You have ${subTasks.length} tasks to finish today`}</p>
    </div>
    <div className="task-title">
      <EditItem
        icon={faAngleDoubleRight}
        rootTask
        title={title}
        dueDate={dueDate}
        incomplete={false}
      />
    </div>
    {subTasks.map(task => (
      <EditItem
        updateSubTask={() => updateSubTask(task.id)}
        key={task.id}
        title={task.title}
        dueDate={task.dueDate}
        incomplete={!task.status}
      />
    ))}
  </TaskContainer>
);

EditTask.propTypes = {
  title: PropTypes.string,
  subTasks: PropTypes.array.isRequired,
  updateSubTask: PropTypes.func.isRequired,
  dueDate: PropTypes.instanceOf(Date).isRequired,
};

EditTask.defaultProps = {
  subTasks: [],
  title: '',
  dueDate: new Date(),
};
