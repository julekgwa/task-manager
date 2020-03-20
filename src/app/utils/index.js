import moment from 'moment';

export function getDueDate(dueDate) {

  if (!dueDate) {

    return '00:00';
  
  }
 
  const endDate = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;

  const startDate = moment(Date.now());
  const timeEnd = moment(endDate.getTime());
  const diff = timeEnd.diff(startDate);
  const diffDuration = moment.duration(diff);

  if (diffDuration.days() === 0 && diffDuration.hours() <= 23 && diffDuration.minutes() <= 59) {

    return 'today'
  
  }

  if (diffDuration.days() > 0) {

    return `in ${diffDuration.days()} days`
  
  }

}