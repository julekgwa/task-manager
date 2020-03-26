import {
  faAngleDoubleRight,
  faClipboardList,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React, {
  useEffect 
} from 'react';

import {
  TaskContainer 
} from 'app/elements/taskContainer/taskContainer';

import {
  Loader 
} from '../loader/loader';

import {
  EditItem 
} from './editItem';

export const EditTask = ({
  isLoading,
  taskId,
  getTask,
  task,
  updateSubTask,
  showAddTaskForm
}) => {

  useEffect(() => {

    getTask({
      id: taskId
    });
  
  }, [taskId, getTask]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader size='5x' />
      ) : Object.keys(task).length ? (
        <TaskContainer edit>
          <div className='add-task'>
            <div className='todo'>
              <FontAwesomeIcon size='2x' icon={faClipboardList} />
            </div>
            <div className='add-todo'>
              <FontAwesomeIcon
                onClick={showAddTaskForm}
                size='2x'
                icon={faPlus}
              />
            </div>
          </div>
          <div className='task-status'>
            <p>{`You have ${task &&
              task.tasks &&
              task.tasks.length} tasks to finish today`}</p>
          </div>
          <div className='task-title'>
            <EditItem
              icon={faAngleDoubleRight}
              rootTask={true}
              title={task.title}
              dueDate={task.dueDate}
              incomplete={false}
            />
          </div>
          {task &&
            task.tasks &&
            task.tasks.map(task => (
              <EditItem
                updateSubTask={() => updateSubTask(task.id)}
                key={task.id}
                title={task.title}
                taskId={task.id}
                dueDate={task.dueDate}
                incomplete={!task.status}
              />
            ))}
        </TaskContainer>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );

};

EditTask.propTypes = {
  title: PropTypes.string,
  task: PropTypes.object,
  updateSubTask: PropTypes.func.isRequired,
  showAddTaskForm: PropTypes.func.isRequired,
  taskId: PropTypes.string,
  getTask: PropTypes.func,
  isLoading: PropTypes.bool
};

EditTask.defaultProps = {
  showAddTaskForm: () => {},
  isLoading: false
};
