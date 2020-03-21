import {
  faCheck,
  faClock,
  faPencilAlt,
  faPlus,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React from 'react';

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
  getDueDate 
} from 'app/utils';

import {
  IconColors 
} from '../constants';

export const EditItem = ({
  title,
  rootTask,
  icon,
  incomplete,
  showDueDate,
  updateSubTask,
  dueDate,
  taskId,
}) => {

  const endDate = getDueDate(dueDate);

  return (
    <EditItemContainer
      color={incomplete ? '' : IconColors.complete}
      incomplete={incomplete}
      rootTask={rootTask}
    >
      <div className='container'>
        <div className='task-info'>
          <div className='icon'>
            <FontAwesomeIcon
              className='check'
              size='lg'
              onClick={updateSubTask}
              icon={icon}
            />
            {!rootTask && (
              <div className='edit-sub'>
                <Link to={`/edit/${taskId}/sub`}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Link>
                <FontAwesomeIcon
                  onClick={updateSubTask}
                  icon={faPlus}
                />
              </div>
            )}
          </div>
          <Header>{title}</Header>
          {showDueDate && (
            <div className='due-date'>
              <FontAwesomeIcon size='1x' icon={faClock} />{' '}
              <p>{endDate}</p>
              {!rootTask && (
                <div className='delete-task'>
                  <FontAwesomeIcon
                    onClick={updateSubTask}
                    icon={faTrash}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </EditItemContainer>
  );

};

EditItem.propTypes = {
  title: PropTypes.string.isRequired,
  rootTask: PropTypes.bool,
  icon: PropTypes.any,
  incomplete: PropTypes.bool,
  showDueDate: PropTypes.bool,
  updateSubTask: PropTypes.func,
  dueDate: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
};

EditItem.defaultProps = {
  rootTask: false,
  icon: faCheck,
  incomplete: true,
  showDueDate: true,
  dueDate: '',
};
