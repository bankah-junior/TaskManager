import React, { useState } from 'react';
import {
  format,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  getDaysInMonth,
  startOfMonth,
  getDay,
  isToday,
} from 'date-fns';
import DayCell from './DayCell';

function Calendar({ todo, onDayClick, createdAt }) {
  const today = new Date();

  // Generate months for the current year
  const months = eachMonthOfInterval({
    start: startOfYear(today),
    end: endOfYear(today),
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const monthsPerPage = 3; // Number of months to display per page
  const totalPages = Math.ceil(months.length / monthsPerPage);

  // Handle pagination
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));

  // Slice the months for the current page
  const currentMonths = months.slice(
    currentPage * monthsPerPage,
    (currentPage + 1) * monthsPerPage
  );

  // Render individual month
  const renderMonth = (month) => {
    const daysInMonth = getDaysInMonth(month);
    const startDay = getDay(startOfMonth(month));
    const days = [];

    // Empty placeholders for days before the start of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${month}-${i}`} className="w-8 h-8" />);
    }

    // Generate day cells for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(month.getFullYear(), month.getMonth(), day);
      const isCurrentDay = isToday(date);

      days.push(
        <DayCell
          key={date.toString()}
          date={date}
          todo={todo}
          isToday={isCurrentDay}
          onClick={onDayClick}
        />
      );
    }

    return (
      <div
        key={month.toString()}
        className="p-4 mb-6 transition-shadow rounded-lg shadow-md bg-gray-50 hover:shadow-lg"
      >
        <h4 className="mb-3 font-semibold text-gray-800">{format(month, 'MMMM yyyy')}</h4>
        <div className="grid grid-cols-7 gap-2">
          {/* Weekday Headers */}
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div
              key={`header-${day}`}
              className="flex items-center justify-center w-8 h-8 text-xs font-medium text-gray-600"
            >
              {day}
            </div>
          ))}
          {/* Days */}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8">
      <h3 className="mb-6 text-lg font-bold text-gray-800">Calendar View</h3>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600">
            Created at: {createdAt}
          </p>
        </div>
      </div>

      {/* Month Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentMonths.map(renderMonth)}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg transition-opacity ${
            currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg transition-opacity ${
            currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Calendar;
