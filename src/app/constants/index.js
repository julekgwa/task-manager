export const PAUSE_PLAY = 'PAUSE_PLAY';
export const SET_THEME = 'SET_THEME';
export const PRIMARY = 'PRIMARY';
export const NEON = 'NEON';
export const SET_LOADER = 'SET_LOADER';
export const GET_TASKS = 'GET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const GET_TASK = 'GET_TASK';
export const UPDATE_SUBTASK = 'UPDATE_SUBTASK';
export const ERROR = 'ERROR';
export const UPDATE_TASK = 'UPDATE_TASK';
export const CLOSE_POPUP = 'CLOSE_POPUP';
export const IS_ADDING_TASK = 'IS_ADDING_TASK';
export const TASK_ADDED = 'TASK_ADDED';
export const TASK_FAILED = 'TASK_FAILED';
export const IS_UPDATING_TASK = 'IS_UPDATING_TASK';
export const GET_REMINDERS = 'GET_REMINDERS';
export const NOTIFY = 'NOTIFY';
export const RESET_UPDATED_ID = 'RESET_UPDATED_ID';

export const TASK_TYPE = {
  task: 'task',
  subtask: 'subtask',
};
export const REQUEST_METHOD = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
};

export const NOTIFICATION_TYPE = {
  deleted: 'DELETE',
  updated: 'UPDATED',
};

export const NOTIFICATION_MESSAGE = {
  deleted: 'Task successfully removed',
  updated: 'Task successfully updated',
  incomplete: 'Task successfully marked as incomplete',
};
