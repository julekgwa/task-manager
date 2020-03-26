import {
  findFirst 
} from 'obj-traverse/lib/obj-traverse';

export function getTask(id, isRoot, tasks) {

  if (isRoot) {

    const rootTask = tasks.filter(t => t && t.id === id);

    return rootTask.length > 0 ? rootTask[0] : {};
  
  }

  for (let i = 0; i < tasks.length; i++) {

    const currentTask = tasks[i];

    const subTask = findFirst(currentTask, 'tasks', {
      id: id
    });

    if (subTask) {

      return subTask;
    
    }
    
  }

}

export function updateSubTask(tasks, subTaskId) {

  const copyOfTasks = JSON.parse(JSON.stringify(tasks));
  let updatedTask;

  for (let i = 0; i < copyOfTasks.length; i++) {

    const currentTask = copyOfTasks[i];

    const subTask = findFirst(currentTask, 'tasks', {
      id: subTaskId
    });

    if (subTask) {

      subTask.status = !subTask.status;
      updatedTask = currentTask;

      break;
    
    }

  }

  return {
    tasks: copyOfTasks,
    updatedTask
  };

}

export function updateNestedArrayObject(arrayOfNestedArrayObjects, newTask) {

  // spread operator doesn't deep copy
  const copyArrayOfNestedArrayObjects = JSON.parse(JSON.stringify(arrayOfNestedArrayObjects));
  let currentTask;

  for (let i = 0; i < copyArrayOfNestedArrayObjects.length; i++) {

    currentTask = copyArrayOfNestedArrayObjects[i];

    if (currentTask && currentTask.id === newTask.rootId) {

      currentTask.tasks.push(newTask);

      break;
    
    }

    const rootTask = findFirst(currentTask, 'tasks', {
      id: newTask.rootId 
    });

    if (rootTask) {

      rootTask.tasks.push(newTask);

      currentTask = rootTask;

      break;
    
    }

  }

  if (copyArrayOfNestedArrayObjects.length === 0 || newTask.rootId === null) {

    copyArrayOfNestedArrayObjects.push(newTask);
  
  }

  return {
    tasks: copyArrayOfNestedArrayObjects,
    task: currentTask
  };

}