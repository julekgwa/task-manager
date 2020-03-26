import {
  faCheck,
  faClock,
  faPencilAlt,
  faTrash
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
  connect 
} from 'react-redux';

import {
  Link 
} from 'react-router-dom';

import {
  Header 
} from 'app/elements/header/header';

import {
  EditItemContainer 
} from 'app/elements/taskContainer/editItemContainer';

import {
  removeTask,
  updateSubTask
} from 'app/redux/actions';

import {
  getDueDate 
} from 'app/utils';

import {
  IconColors 
} from '../constants';

import {
  Loader 
} from '../loader/loader';

const mapStateToProps = state => ({
  isUpdatingTask: state.isUpdatingTask
});

const mapDispatchToProps = dispatch => ({
  deleteTask: payload => dispatch(removeTask(payload)),
  updateSubTask: payload => dispatch(updateSubTask(payload))
});

const Item = ({
  title,
  rootTask,
  icon,
  incomplete,
  showDueDate,
  updateSubTask,
  dueDate,
  taskId,
  isUpdatingTask,
  deleteTask,
  task
}) => {

  const endDate = getDueDate(dueDate);
  const [updatingTask, setUpdatingTask] = useState(false);

  useEffect(() => {

    setUpdatingTask((isUpdatingTask && updatingTask) || false);
  
  }, [isUpdatingTask]);

  const remove = () => {

    setUpdatingTask(true);

    deleteTask({
      id: taskId
    });
  
  };

  const update = () => {

    setUpdatingTask(true);

    task.status = !task.status;
    
    updateSubTask(task);

  }

  return (
    <EditItemContainer
      color={incomplete ? '' : IconColors.complete}
      incomplete={incomplete}
      rootTask={rootTask}
    >
      <div className='container'>
        <div className='task-info'>
          <div className='icon'>
            {updatingTask && isUpdatingTask ? (
              <div className='loader'>
                <Loader size='3x' />
              </div>
            ) : (
              <React.Fragment>
                <FontAwesomeIcon
                  className='check'
                  size='lg'
                  onClick={update}
                  icon={icon}
                />
                {!rootTask && (
                  <div className='edit-sub'>
                    <Link to={`/edit/${taskId}/subtask`}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </Link>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
          <Header>{title}</Header>
          {showDueDate && (
            <div className='due-date'>
              <FontAwesomeIcon size='1x' icon={faClock} />{' '}
              <p>{endDate}</p>
              {!rootTask && !updatingTask && (
                <div className='delete-task'>
                  <FontAwesomeIcon onClick={remove} icon={faTrash} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </EditItemContainer>
  );

};

Item.propTypes = {
  title: PropTypes.string.isRequired,
  rootTask: PropTypes.bool,
  icon: PropTypes.any,
  incomplete: PropTypes.bool,
  showDueDate: PropTypes.bool,
  updateSubTask: PropTypes.func,
  dueDate: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  isUpdatingTask: PropTypes.bool,
  deleteTask: PropTypes.func,
  task: PropTypes.object.isRequired
};

Item.defaultProps = {
  rootTask: false,
  icon: faCheck,
  incomplete: true,
  showDueDate: true,
  dueDate: '',
  title: '',
  taskId: '',
  isUpdatingTask: false,
  deleteTask: () => {}
};

export const EditItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);
