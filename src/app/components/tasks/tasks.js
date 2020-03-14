import PropTypes from 'prop-types';

import React from 'react';

import {
  TaskContainer 
} from 'app/elements/taskContainer/taskContainer';

import {
  TaskItem 
} from './taskItem';

export const Tasks = ({ tasks, }) => {

  return (
    <>
      {tasks.length <= 0 
      
        ? (
          <TaskContainer noTasks>
            <p>No tasks</p>
          </TaskContainer>
        )

        : (
          tasks.map(task => (
            <TaskItem
              key={task.title}
              title={task.title}
              subTasks={task.taskCount}
            />
          ))
        )}
    </>
  );

};

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
};
