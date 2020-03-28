import {
  faClipboardList,
  faClock
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React from 'react';

import {
  GET_REMINDERS
} from 'app/constants';

import {
  TaskContainer
} from 'app/elements/taskContainer/taskContainer';

import {
  EditItem
} from './editItem';

export const TaskReminder = ({ tasks, }) => (
  <TaskContainer edit>
    <div className='add-task'>
      <div className='todo'>
        <FontAwesomeIcon size='2x' icon={faClipboardList} />
      </div>
      <div className='add-todo'>
        <FontAwesomeIcon size='2x' icon={faClock} />
      </div>
    </div>
    <div className='task-status'>
      <p>{`You have ${tasks && tasks.length} tasks to finish in next 24 hours`}</p>
    </div>
    <div className='task-title'>
      <h1>Tasks</h1>
    </div>
    {tasks && tasks.map(task => (
      <EditItem
        key={task.id}
        title={task.title}
        task={task}
        updateTaskAction={GET_REMINDERS}
        taskId={task.id}
        dueDate={task.dueDate}
        incomplete={!task.status}
      />
    ))}
  </TaskContainer>
);

TaskReminder.propTypes = {
  tasks: PropTypes.array,
};