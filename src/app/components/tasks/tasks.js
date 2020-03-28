import PropTypes from 'prop-types';

import React from 'react';

import {
  TaskContainer
} from 'app/elements/taskContainer/taskContainer';

import {
  TaskItem
} from './taskItem';

export const Tasks = ({ tasks, onAddSubTask, root, }) => {

  return (
    <React.Fragment>
      {tasks.length <= 0 || tasks[0] === null ? (
        <TaskContainer noTasks>
          <p>No tasks</p>
        </TaskContainer>
      ) : (
        tasks.map(task => task && (
          <TaskItem
            addSubTask={() => onAddSubTask(task.id)}
            key={task.id}
            taskId={task.id}
            title={task.title}
            root={root}
            subTasks={task.tasks.length}
          />
        ))
      )}
    </React.Fragment>
  );

};

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  onAddSubTask: PropTypes.func.isRequired,
  root: PropTypes.bool,
};

Tasks.defaultProps = {
  root: false,
};
