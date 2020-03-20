import PropTypes from 'prop-types';

import React from 'react';

import {
  TaskContainer 
} from 'app/elements/taskContainer/taskContainer';

import {
  TaskItem 
} from './taskItem';

export const Tasks = ({ tasks, onDeleteTask, onAddSubTask, }) => {

  return (
    <>
      {tasks.length <= 0 
      
        ? (
          <TaskContainer noTasks>
            <p>No tasks</p>
          </TaskContainer>
        )

        : (
          tasks.map((task, index) => (
            <TaskItem
              deleteTask={() => onDeleteTask(index)}
              addSubTask={() => onAddSubTask(task.id)}
              key={task.id}
              taskId={task.id}
              rootId={task.rootId}
              title={task.title}
              subTasks={task.tasks.length}
            />
          ))
        )}
    </>
  );

};

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onAddSubTask: PropTypes.func.isRequired,
};
