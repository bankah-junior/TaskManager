import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import EditableDescription from './EditableDescription';
import { getDailyTasks, saveDailyTasks } from '../utils/storage';

function DayModal({ date, todo, onClose }) {
  const [dailyTasks, setDailyTasks] = useState(null);
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    const stored = getDailyTasks(todo.id, format(date, 'yyyy-MM-dd'));
    setDailyTasks(stored || {
      items: todo.items.map(item => ({ ...item, completed: false })),
      description: todo.description
    });
    setDescription(stored?.description || todo.description);
  }, [todo, date]);

  const handleToggleItem = (itemId) => {
    const newTasks = {
      ...dailyTasks,
      items: dailyTasks.items.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    };
    setDailyTasks(newTasks);
    saveDailyTasks(todo.id, format(date, 'yyyy-MM-dd'), newTasks);
  };

  const handleDescriptionSave = (newDescription) => {
    const newTasks = {
      ...dailyTasks,
      description: newDescription
    };
    setDailyTasks(newTasks);
    setDescription(newDescription);
    saveDailyTasks(todo.id, format(date, 'yyyy-MM-dd'), newTasks);
  };

  if (!dailyTasks) return null;

  const progress = (dailyTasks.items.filter(item => item.completed).length / dailyTasks.items.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {format(date, 'MMMM d, yyyy')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Task: {todo.title}</h3>
            <EditableDescription
              initialValue={description}
              onSave={handleDescriptionSave}
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Daily Checklist</h3>
            {dailyTasks.items.map(item => (
              <div key={item.id} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggleItem(item.id)}
                  className="h-5 w-5"
                />
                <span className={item.completed ? 'line-through text-gray-500' : ''}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-medium mb-2">Daily Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DayModal;