import React, { useState } from 'react';
import Calendar from './Calendar';
import DayModal from './DayModal';
import { format } from 'date-fns';

function TodoDetails({ todo, onClose, onToggleItem }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const createAt = format(new Date(todo.date), 'PPP');

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl p-4 pb-8 m-4 bg-white rounded-lg shadow-lg sm:p-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{todo.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>


        {/* Modal Body */}
        <div className="overflow-y-auto max-h-[75vh]">
          {/* Modal Description */}
          <div className="mt-4 prose prose-lg text-gray-600 max-w-none">
            <div
              className="p-5 prose-sm prose"
              dangerouslySetInnerHTML={{ __html: todo.description }}
            />
          </div>
          {/* Calendar */}
          <div className="mt-4">
            <Calendar todo={todo} onDayClick={handleDayClick} createdAt={createAt} />
          </div>
        </div>

        {/* Day Modal */}
        {selectedDate && (
          <DayModal
            date={selectedDate}
            todo={todo}
            onClose={() => setSelectedDate(null)}
            onToggleItem={onToggleItem}
          />
        )}
      </div>
    </div>
  );
}

export default TodoDetails;
