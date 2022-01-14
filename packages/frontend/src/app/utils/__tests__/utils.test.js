import moment from 'moment';

import {
  flatten,
  getDueDate,
  getObjectTasksDepth,
  getTask,
  handleKeyDown,
  isTaskDueIn24Hours
} from '../index';

describe('getDueDate', () => {

  it('should return "00:00" when invalid date is provided', () => {

    const dueDate = getDueDate('Y600');

    expect(dueDate).toBe('00:00');

  });

  it('should return "today" when task is due today', () => {

    const taskStartDate = new Date();
    const dueDate = moment(taskStartDate).endOf('day')
      .valueOf()
      .toString();

    expect(getDueDate(dueDate)).toBe('today');

  });

  it('should return "in xx days"', () => {

    const startDate = moment(new Date()).add(2, 'days')
      .toDate();
    const dueDate = moment(startDate).endOf('day')
      .valueOf()
      .toString();

    expect(getDueDate(dueDate)).toBe('in 2 days');

  });

});

describe('isTaskDueIn24Hours', () => {

  it('should return false when invalid date is provided', () => {

    const task = {};

    expect(isTaskDueIn24Hours(task)).toBeFalsy();

  });

  it('should return true when task is due in the next 24 hours', () => {

    const taskStartDate = new Date();
    const dueDate = moment(taskStartDate).endOf('day')
      .valueOf()
      .toString();

    const task = {
      status: false,
      dueDate: dueDate,
    };

    expect(isTaskDueIn24Hours(task)).toBeTruthy();

  });

  it('should return false when task is not due in the next 24', () => {

    const startDate = moment(new Date()).add(2, 'days')
      .toDate();
    const dueDate = moment(startDate).endOf('day')
      .valueOf()
      .toString();

    const task = {
      status: false,
      dueDate: dueDate,
    };

    expect(isTaskDueIn24Hours(task)).toBeFalsy();

  });

});

describe('Flatten',() => {

  it('should return empty array when invalid type is provided', () => {

    expect(flatten({}).length).toBe(0);

  });

  it('should return flattened array', () => {

    const array = [
      {
        title: 'Root Task',
        tasks: [
          {
            title: 'Sub 1',
            tasks: [
              {
                title: 'Sub 3',
                tasks: [
                  {
                    title: 'Sub 4',
                    tasks: [],
                  }

                ],
              }
            ],
          }
        ],
      },
      {
        title: 'Root task 2',
        tasks: [
          {
            title: 'Sub 2',
            tasks: [],
          }
        ],
      }
    ];

    const arr1 = [
      {
        title: 'Sub 2',
        tasks: [],
      }
    ];

    expect(flatten(array).length).toBe(6);
    expect(flatten(arr1).length).toBe(1);

  });

});

describe('getObjectTasksDepth', () => {

  it('should return 0 when invalid obj is passed', () => {

    expect(getObjectTasksDepth({})).toBe(0);

  });

  it('should return the depth of an object', () => {

    const obj = {
      title: 'Root Task',
      test: undefined,
      arr: [],
      tasks: [
        {
          title: 'Sub 1',
          tasks: [
            {
              title: 'Sub 3',
              tasks: [
                {
                  title: 'Sub 4',
                  tasks: [],
                }

              ],
            }
          ],
        }
      ],
    };

    expect(getObjectTasksDepth(obj)).toBe(3);

  });

});

describe('getTask', () => {

  it('should return root task', () => {

    const tasks = [
      {
        title: 'Root Task',
        _id: '67',
        tasks: [
          {
            title: 'Sub 1',
            tasks: [
              {
                title: 'Sub 3',
                tasks: [
                  {
                    title: 'Sub 4',
                    tasks: [],
                  }

                ],
              }
            ],
          }
        ],
      },
      {
        title: 'Root task 2',
        _id: '7',
        tasks: [
          {
            title: 'Sub 2',
            tasks: [],
          }
        ],
      }
    ];

    const rootTask = getTask('67', true, tasks);

    expect(rootTask.title).toBe('Root Task');

  });

  it('should return empty object when task cannot be found', () => {

    const tasks = [
      {
        title: 'Root Task',
        _id: '67',
        tasks: [
          {
            title: 'Sub 1',
            tasks: [
              {
                title: 'Sub 3',
                tasks: [
                  {
                    title: 'Sub 4',
                    tasks: [],
                  }

                ],
              }
            ],
          }
        ],
      },
      {
        title: 'Root task 2',
        _id: '7',
        tasks: [
          {
            title: 'Sub 2',
            tasks: [],
          }
        ],
      }
    ];

    const rootTask = getTask('69', true, tasks);

    expect(rootTask).toEqual({});

  });

});

describe('handleKeyDown', () => {

  it('should run function when enter key is pressed', () => {

    const func = jest.fn();

    handleKeyDown({
      keyCode: 13,
    }, func);

    expect(func).toHaveBeenCalled();

  });

  it('should not run the function when pressed key is not an enter key', () => {

    const func = jest.fn();

    handleKeyDown({
      keyCode: 14,
    }, func);

    expect(func).not.toHaveBeenCalled();

  });

});