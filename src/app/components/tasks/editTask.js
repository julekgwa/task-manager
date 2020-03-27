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
}) => {

  const [task, setTask] = useState([]);

  useEffect(() => {

    setTask(getTask(taskId, type === TASK_TYPE.task, tasks));
  
  }, [tasks, taskId, type]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader size='5x' />
      ) : task && Object.keys(task).length ? (
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
            task.tasks.map(task => task && (
              <EditItem
                key={task.id}
                task={task}
                title={task.title}
                taskId={task.id}
                dueDate={task.dueDate}
                incomplete={!task.status}
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
};

EditTask.defaultProps = {
  showAddTaskForm: () => {},
  isLoading: false,
  tasks: [],
};
