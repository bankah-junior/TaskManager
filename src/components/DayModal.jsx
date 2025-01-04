import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import EditableDescription from './EditableDescription';
import { getDailyTasks, saveDailyTasks } from '../utils/storage';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid';

function DayModal({ date, todo, onClose }) {
  const [dailyTasks, setDailyTasks] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const stored = getDailyTasks(todo.id, format(date, 'yyyy-MM-dd'));
    setDailyTasks(
      stored || {
        items: todo.items.map((item) => ({ ...item, completed: false })),
        description: todo.description,
      }
    );
    setDescription(stored?.description || todo.description);
  }, [todo, date]);

  const handleToggleItem = (itemId) => {
    const newTasks = {
      ...dailyTasks,
      items: dailyTasks.items.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
      date: format(date, 'yyyy-MM-dd'),
    };
    setDailyTasks(newTasks);
    saveDailyTasks(todo.id, format(date, 'yyyy-MM-dd'), newTasks);
  };

  const handleDescriptionSave = (newDescription) => {
    const newTasks = {
      ...dailyTasks,
      description: newDescription,
    };
    setDailyTasks(newTasks);
    setDescription(newDescription);
    saveDailyTasks(todo.id, format(date, 'yyyy-MM-dd'), newTasks);
  };

  if (!dailyTasks) return null;

  const progress =
    (dailyTasks.items.filter((item) => item.completed).length / dailyTasks.items.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 m-4 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {format(date, 'MMMM d, yyyy')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 transition rounded-full hover:bg-gray-200"
            aria-label="Close"
          >
            <XMarkIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Task and Description */}
        <div className="space-y-4">
          <div>
            <h3 className="flex items-center mb-2 font-medium text-gray-700">
              <CheckIcon className="w-5 h-5 mr-2 text-blue-500" />
              Task: {todo.title}
            </h3>
            <EditableDescription
              initialValue={description}
              onSave={handleDescriptionSave}
            />
          </div>

          {/* Checklist */}
          <div>
            <h3 className="mb-2 font-medium text-gray-700">Daily Checklist</h3>
            <ul className="space-y-2">
              {dailyTasks.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center pb-2 space-x-3 border-b last:border-none"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggleItem(item.id)}
                    className="w-5 h-5 text-blue-500 rounded focus:ring-blue-400"
                  />
                  <span
                    className={`${
                      item.completed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Progress Bar */}
          <div>
            <h3 className="mb-2 font-medium text-gray-700">Daily Progress</h3>
            <div className="relative w-full h-3 bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-3 transition-all bg-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {progress.toFixed(0)}% completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DayModal;
