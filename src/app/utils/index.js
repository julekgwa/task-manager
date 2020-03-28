import moment from 'moment';

import {
  findFirst
} from 'obj-traverse/lib/obj-traverse';

export function getDueDate(dueDate) {

  if (!parseInt(dueDate, 10)) {

    return '00:00';

  }

  const startDate = moment(Date.now());
  const timeEnd = moment(parseInt(dueDate, 10));
  const diff = timeEnd.diff(startDate);
  const diffDuration = moment.duration(diff);

  if (diffDuration.days() === 0 && diffDuration.hours() <= 23 && diffDuration.minutes() <= 59) {

    return 'today';

  }

  if (diffDuration.days() > 0) {

    return `in ${diffDuration.days()} days`;

  }

  return 'overdue';

}

export function isTaskDueIn24Hours(task) {

  if (!parseInt(task.dueDate, 10)) {

    return false;

  }

  const startDate = moment(Date.now());
  const timeEnd = moment(parseInt(task.dueDate, 10));
  const diff = timeEnd.diff(startDate);
  const diffDuration = moment.duration(diff);

  return diffDuration.asHours() <= 24 && task && !task.status;

}

export function flatten(items) {

  if (!Array.isArray(items)) {

    return [];

  }

  const flat = [];

  for (let i = 0; i < items.length; i++) {

    const item = items[i];

    flat.push(item);

    if (Array.isArray(item.tasks) && item.tasks.length > 0) {

      flat.push(...flatten(item.tasks));
      delete item.tasks;

    }

    delete item.tasks;

  }

  return flat;

}

export function getObjectTasksDepth(obj, level = 0) {

  if (!obj || obj.tasks.length === 0) {

    return level;

  }

  let nextObj;

  for (const key in obj) {

    if (obj[key]) {

      if (!Array.isArray(obj[key])) {

        continue;

      }

      if (Array.isArray(obj[key]) && obj[key].length !== 0) {

        nextObj = obj[key][0];
        break;

      }

    }

  }

  return getObjectTasksDepth(nextObj, level + 1);

}

export function getTask(id, isRoot, tasks) {

  if (isRoot) {

    const rootTask = tasks.filter(t => t && t.id === id);

    return rootTask.length > 0 ? rootTask[0] : {};

  }

  for (let i = 0; i < tasks.length; i++) {

    const currentTask = tasks[i];

    const subTask = findFirst(currentTask, 'tasks', {
      id: id,
    });

    if (subTask) {

      return subTask;

    }

  }

}

export function handleKeyDown(e,func) {

  if (e.keyCode === 13) {

    typeof func === 'function' && func();

  }

}