import { useState } from 'react';
import TodoDetails from './TodoDetails';
import 'react-quill/dist/quill.snow.css';

function TodoItem({ todo, onToggleItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDetails = () => setIsOpen(true);
  const handleCloseDetails = () => setIsOpen(false);

  return (
    <>
      {/* Todo Preview */}
      <div
        onClick={handleOpenDetails}
        onKeyPress={(e) => (e.key === 'Enter' ? handleOpenDetails() : null)}
        className="p-4 transition-shadow bg-white rounded-lg shadow cursor-pointer hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        role="button"
        tabIndex={0}
      >
        {/* Title */}
        <h3 className="mb-2 text-xl font-semibold text-gray-800">{todo.title}</h3>

        {/* Description */}
        <div
          className="text-sm prose-sm prose text-gray-600 max-w-none line-clamp-3"
          dangerouslySetInnerHTML={{ __html: todo.description }}
        />
      </div>

      {/* Todo Details Modal */}
      {isOpen && (
        <TodoDetails
          todo={todo}
          onClose={handleCloseDetails}
          onToggleItem={onToggleItem}
        />
      )}
    </>
  );
}

export default TodoItem;
