import { useState } from 'react';
import TodoDetails from './TodoDetails';
import 'react-quill/dist/quill.snow.css';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

function TodoItem({ todo, onToggleItem, todos, setTodos }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDetails = () => setIsOpen(true);
  const handleCloseDetails = () => setIsOpen(false);

  const completedItems = todo.items.filter((item) => item.completed).length;
  const totalItems = todo.items.length;

  const handleUpdateTodo = (todo) => {
    const updatedTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = () => {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    handleCloseDetails();
  };

  return (
    <>
      {/* Todo Preview */}
      <div
        onClick={handleOpenDetails}
        onKeyPress={(e) => (e.key === 'Enter' ? handleOpenDetails() : null)}
        className="flex items-center p-4 space-x-4 transition-all transform bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:scale-105"
        role="button"
        tabIndex={0}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
          <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-500" />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Title */}
          <h3 className="mb-1 text-lg font-semibold text-gray-800">{todo.title}</h3>

          {/* Progress */}
          <p className="text-sm text-gray-600">
            {completedItems}/{totalItems} items completed
          </p>
        </div>

        {/* Chevron Icon */}
        <ChevronRightIcon className="w-6 h-6 text-gray-400" />
      </div>

      {/* Todo Details Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg animate-fade-in"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseDetails}
              className="absolute text-gray-400 top-4 right-4 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Todo Details */}
            {/* <TodoDetails todo={todo} onClose={handleCloseDetails} onToggleItem={onToggleItem} /> */}
            <TodoDetails
              todo={todo}
              onClose={handleCloseDetails}
              onToggleItem={onToggleItem}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
            />

          </div>
        </div>
      )}
    </>
  );
}

export default TodoItem;
