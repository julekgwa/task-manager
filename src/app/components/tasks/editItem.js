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
  useRef,
  useState
} from 'react';

import {
  connect
} from 'react-redux';

import {
  Link
} from 'react-router-dom';

import {
  NOTIFICATION_MESSAGE,
  NOTIFICATION_TYPE,
  UPDATE_TASK
} from 'app/constants';

import {
  Header
} from 'app/elements/header/header';

import {
  EditItemContainer
} from 'app/elements/taskContainer/editItemContainer';

import {
  removeTask,
  resetUpdatedId,
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
  isUpdatingTask: state.isUpdatingTask,
  updatedId: state.updatedId,
});

const mapDispatchToProps = dispatch => ({
  deleteTask: payload => dispatch(removeTask(payload)),
  updateSubTask: (payload, type) =>
    dispatch(updateSubTask(payload, type)),
  resetUpdatedId: () => dispatch(resetUpdatedId()),
});

const Item = ({
  rootTask,
  icon,
  incomplete,
  showDueDate,
  updateSubTask,
  isUpdatingTask,
  deleteTask,
  task,
  updateTaskAction,
  updatedId,
  resetUpdatedId,
}) => {

  const endDate = getDueDate(task.dueDate);
  const [updatingTask, setUpdatingTask] = useState(false);
  const [notifyClass, setNotifyClass] = useState('');
  const timeoutRef = useRef(null);
  const [notificationType, setNotificationType] = useState(
    NOTIFICATION_TYPE.updated
  );

  useEffect(() => {

    setUpdatingTask((isUpdatingTask && updatingTask) || false);

  }, [isUpdatingTask, updatingTask]);

  useEffect(() => {

    if (updatedId === task.id) {

      setNotifyClass('notify');

      timeoutRef.current = setTimeout(() => {

        setNotifyClass('');

        timeoutRef.current && clearTimeout(timeoutRef.current);

      }, 1500);

    }

  }, [updatedId, task.id]);

  const remove = () => {

    resetUpdatedId();
    setUpdatingTask(true);
    setNotificationType(NOTIFICATION_TYPE.deleted);

    deleteTask({
      id: task.id,
    });

  };

  const update = () => {

    resetUpdatedId();
    setUpdatingTask(true);
    setNotificationType(NOTIFICATION_TYPE.updated);

    task.status = !task.status;

    updateSubTask(task, updateTaskAction);

  };

  return (
    <EditItemContainer
      color={incomplete ? '' : IconColors.complete}
      incomplete={incomplete}
      rootTask={rootTask}
      wasUpdated={updatedId === task.id}
      notifyType={notificationType}
    >
      <div className='container'>
        <div className='task-info'>
          <div className='info'>
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
                    data-testid='update'
                    onClick={update}
                    icon={icon}
                  />
                  {!rootTask && (
                    <div className='edit-sub'>
                      <Link to={`/edit/${task.id}/subtask`}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </Link>
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
            <Header>{task.title}</Header>
            {showDueDate && (
              <div data-testid='due-date-container' className='due-date'>
                <FontAwesomeIcon size='1x' icon={faClock} />{' '}
                <p data-testid='due-date'>{endDate}</p>
                {!rootTask && !updatingTask && (
                  <div className='delete-task'>
                    <FontAwesomeIcon
                      data-testid='trash-button'
                      onClick={remove}
                      icon={faTrash}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={`notify-container ${notifyClass}`}>
            <p>
              {notificationType === NOTIFICATION_TYPE.deleted
                ? NOTIFICATION_MESSAGE.deleted
                : incomplete
                  ? NOTIFICATION_MESSAGE.incomplete
                  : NOTIFICATION_MESSAGE.updated}
            </p>
          </div>
        </div>
      </div>
    </EditItemContainer>
  );

};

Item.propTypes = {
  rootTask: PropTypes.bool,
  icon: PropTypes.any,
  incomplete: PropTypes.bool,
  showDueDate: PropTypes.bool,
  updateSubTask: PropTypes.func,
  dueDate: PropTypes.string.isRequired,
  isUpdatingTask: PropTypes.bool,
  deleteTask: PropTypes.func,
  task: PropTypes.object.isRequired,
  updateTaskAction: PropTypes.string,
  updatedId: PropTypes.string,
  resetUpdatedId: PropTypes.func,
};

Item.defaultProps = {
  rootTask: false,
  icon: faCheck,
  incomplete: true,
  showDueDate: true,
  dueDate: '',
  isUpdatingTask: false,
  task: {},
  updateTaskAction: UPDATE_TASK,
  updatedId: '',
};

export const EditItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);
