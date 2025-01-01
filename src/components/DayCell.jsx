import React from 'react';
import { format } from 'date-fns';
import { getDailyTasks } from '../utils/storage';

function DayCell({ date, todo, isToday, onClick }) {
  const dailyTasks = getDailyTasks(todo?.id, format(date, 'yyyy-MM-dd'));
  const progress = dailyTasks 
    ? (dailyTasks.items.filter(item => item.completed).length / dailyTasks.items.length) * 100
    : 0;
  
  return (
    <div
      onClick={() => onClick(date)}
      className={`
        h-8 w-8 flex items-center justify-center text-sm cursor-pointer
        relative group hover:bg-gray-100 rounded-full transition-colors
        ${isToday ? 'bg-blue-100' : ''}
      `}
    >
      {date.getDate()}
      {dailyTasks && (
        <div 
          className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-full overflow-hidden"
        >
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default DayCell;