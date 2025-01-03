import React, { useState } from 'react';
import Calendar from './Calendar';
import DayModal from './DayModal';
import { format } from 'date-fns';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TodoDetails({ todo, onClose, onToggleItem, onUpdateTodo, onDeleteTodo }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };

  const createAt = format(new Date(todo.date), 'PPP');

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handleSaveEdit = () => {
    const updatedTodo = { ...todo, title: editedTitle, description: editedDescription };
    onUpdateTodo(updatedTodo); // Pass the updated todo to the parent
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteTodo(todo.id); // Pass the todo ID to the parent
    onClose(); // Close the modal after deletion
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl p-4 pb-8 m-4 bg-white rounded-lg shadow-lg sm:p-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 text-2xl font-bold text-gray-800 border rounded"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800">{todo.title}</h2>
          )}
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
            {isEditing ? (
              <div className="h-24">
                <ReactQuill
                  value={editedDescription}
                  onChange={setEditedDescription}
                  modules={modules}
                  theme="snow"
                />
              </div>
            ) : (
              <div
                className="p-5 prose-sm prose"
                dangerouslySetInnerHTML={{ __html: todo.description }}
              />
            )}
          </div>
          {/* Calendar */}
          <div className="mt-4">
            <Calendar todo={todo} onDayClick={handleDayClick} createdAt={createAt} />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between mt-4">
          {isEditing ? (
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Delete
          </button>
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
