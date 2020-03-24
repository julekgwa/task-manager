import moment from 'moment';

export function getDueDate(dueDate) {

  if (!parseInt(dueDate, 10)) {

    return '00:00';
  
  }

  const startDate = moment(Date.now());
  const timeEnd = moment(parseInt(dueDate, 10));
  const diff = timeEnd.diff(startDate);
  const diffDuration = moment.duration(diff);

  if (diffDuration.days() === 0 && diffDuration.hours() <= 23 && diffDuration.minutes() <= 59) {

    return 'today'
  
  }

  if (diffDuration.days() > 0) {

    return `in ${diffDuration.days()} days`
  
  }

  return 'overdue';

}

export function flatten(items) {

  const flat = [];

  items.forEach(item => {

    flat.push(item);
    if (Array.isArray(item.tasks) && item.tasks.length > 0) {

      flat.push(...flatten(item.tasks));
      delete item.tasks;
    
    }
    delete item.tasks;
  
  });

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