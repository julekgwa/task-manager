import {
  faCheck,
  faClock 
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';

import React from 'react';

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
}) => {

  const endDate = getDueDate(dueDate);

  return (
    <EditItemContainer
      color={incomplete ? '' : IconColors.complete}
      incomplete={incomplete}
      rootTask={rootTask}
    >
      <div className="container">
        <div className="task-info">
          <div className="icon">
            <FontAwesomeIcon onClick={updateSubTask} icon={icon} />
          </div>
          <Header>{title}</Header>
          {showDueDate && (
            <div className="due-date">
              <FontAwesomeIcon size="1x" icon={faClock} />{' '}
              <p>{endDate}</p>
            </div>
          )}
        </div>
      </div>
    </EditItemContainer>
  );

}

EditItem.propTypes = {
  title: PropTypes.string.isRequired,
  rootTask: PropTypes.bool,
  icon: PropTypes.any,
  incomplete: PropTypes.bool,
  showDueDate: PropTypes.bool,
  updateSubTask: PropTypes.func,
  dueDate: PropTypes.instanceOf(Date).isRequired,
};

EditItem.defaultProps = {
  rootTask: false,
  icon: faCheck,
  incomplete: true,
  showDueDate: true,
  dueDate: new Date(),
};
