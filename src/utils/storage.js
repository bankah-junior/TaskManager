// Utility functions for localStorage management
export const getDailyTasks = (todoId, date) => {
  const key = `todo_${todoId}`;
  const stored = localStorage.getItem(key);

  if (!stored) {
    return null;
  }

  if (date) {
    const tasks = JSON.parse(stored);
    return tasks.find(task => task.date === date);
  }
  
};

export const saveDailyTasks = (todoId, date, tasks) => {
  const key = `todo_${todoId}`;

  if (!tasks || todoId === undefined) {
    return null;
  }

  // if key if found in localStorage, check if the date is already present update the task
  // else push the new task
  const stored = localStorage.getItem(key);
  if (stored) {
    const existingTasks = JSON.parse(stored);
    const taskIndex = existingTasks.findIndex(task => task.date === date);
    if (taskIndex !== -1) {
      existingTasks[taskIndex] = tasks;
    } else {
      existingTasks.push(tasks);
    }
    localStorage.setItem(key, JSON.stringify(existingTasks));
    return;
  } else {
    localStorage.setItem(key, JSON.stringify([tasks]));
    return;
  }
  
};

export const taskPercentComplete = (todoId, numberOfTasks, daysOfTheYear) => {
  const key = `todo_${todoId}`;
  const stored = localStorage.getItem(key);
  if (!stored) {
    return 0;
  }

  const tasks = JSON.parse(stored);
  const overallTasks = numberOfTasks * daysOfTheYear;
  const completedTasks = tasks.reduce((acc, curr) => acc + curr.items.filter(item => item.completed).length, 0);
  return ((completedTasks / overallTasks) * 100).toFixed(2);
};

export const completedTasks = (todoId) => {
  const key = `todo_${todoId}`;
  const stored = localStorage.getItem(key);
  if (!stored) {
    return 0;
  }

  const tasks = JSON.parse(stored);
  return tasks.reduce((acc, curr) => acc + curr.items.filter(item => item.completed).length, 0);
};