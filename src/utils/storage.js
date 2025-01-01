// Utility functions for localStorage management
export const getDailyTasks = (todoId, date) => {
  const key = `todo_${todoId}_${date}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
};

export const saveDailyTasks = (todoId, date, tasks) => {
  const key = `todo_${todoId}_${date}`;
  localStorage.setItem(key, JSON.stringify(tasks));
};