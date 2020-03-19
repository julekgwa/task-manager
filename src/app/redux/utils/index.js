import {
  findFirst 
} from 'obj-traverse/lib/obj-traverse';

export function updateNestedArrayObject(arrayOfNestedArrayObjects, newTask) {

  // spread operator doesn't deep copy
  const copyArrayOfNestedArrayObjects = JSON.parse(JSON.stringify(arrayOfNestedArrayObjects));

  for (let i = 0; i < copyArrayOfNestedArrayObjects.length; i++) {

    const currentTask = copyArrayOfNestedArrayObjects[i];

    if (currentTask && currentTask.id === newTask.rootId) {

      currentTask.tasks.push(newTask);

      break;
    
    }

    const rootTask = findFirst(currentTask, 'tasks', {
      id: newTask.rootId, 
    });

    if (rootTask) {

      rootTask.tasks.push(newTask);
    
    }

  }

  if (copyArrayOfNestedArrayObjects.length === 0) {

    copyArrayOfNestedArrayObjects.push(newTask);
  
  }

  return copyArrayOfNestedArrayObjects;

}