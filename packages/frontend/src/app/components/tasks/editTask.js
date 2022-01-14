import {
  faAngleDoubleRight,
  faPencilAlt,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React, {
  useEffect,
  useState
} from 'react';

import {
  TASK_TYPE
} from 'app/constants';

import {
  TaskContainer
} from 'app/elements/taskContainer/taskContainer';

import {
  getTask
} from 'app/utils';

import {
  Loader
} from '../loader/loader';

import {
  EditItem
} from './editItem';

export const EditTask = ({
  isLoading,
  taskId,
  tasks,
  showAddTaskForm,
  type,
  disableAddButton,
  updateTaskInfo,
}) => {

  const [task, setTask] = useState([]);
  const [tasksToComplete, setTasksToComplete] = useState(0);

  useEffect(() => {

    const currentTask = getTask(taskId, type === TASK_TYPE.task, tasks);
    const toComplete = (currentTask && currentTask.tasks && currentTask.tasks.filter(item => item && !item.status)) || [];

    setTask(currentTask);
    setTasksToComplete(toComplete.length);

  }, [tasks, taskId, type]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader size='5x' />
      ) : task && Object.keys(task).length ? (
        <TaskContainer edit>
          <div className='add-task'>
            <div className='todo'>
              <FontAwesomeIcon onClick={() => updateTaskInfo(task)} size='2x' icon={faPencilAlt} />
            </div>
            <div className={`${ disableAddButton ? 'disable-button' : 'add-todo'}`}>
              <FontAwesomeIcon
                data-testid='show-form'
                onClick={disableAddButton ? () => {} : showAddTaskForm}
                size='2x'
                icon={faPlus}
              />
            </div>
          </div>
          <div className='task-status'>
            <p>{`You have ${tasksToComplete} tasks to finish today`}</p>
          </div>
          <div className='task-title'>
            <EditItem
              icon={faAngleDoubleRight}
              rootTask={true}
              title={task.title}
              task={task}
              dueDate={task.dueDate}
              incomplete={false}
            />
          </div>
          {task &&
            task.tasks &&
            task.tasks.map(t => t && (
              <EditItem
                key={t._id}
                task={t}
                title={t.title}
                taskId={t._id}
                dueDate={t.dueDate}
                incomplete={!t.status}
              />
            ))}
        </TaskContainer>
      ) : (
        <React.Fragment><p>No Task</p></React.Fragment>
      )}
    </React.Fragment>
  );

};

EditTask.propTypes = {
  type: PropTypes.string,
  tasks: PropTypes.array,
  showAddTaskForm: PropTypes.func.isRequired,
  taskId: PropTypes.string,
  isLoading: PropTypes.bool,
  disableAddButton: PropTypes.bool,
  updateTaskInfo: PropTypes.func.isRequired,
};

EditTask.defaultProps = {
  showAddTaskForm: () => {},
  isLoading: false,
  tasks: [],
};
