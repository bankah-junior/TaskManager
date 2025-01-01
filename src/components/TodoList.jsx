import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { PlusIcon } from '@heroicons/react/24/solid';

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(6); // Default for small devices

  // Update the number of todos per page based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setTodosPerPage(12); // 12 todos per page for large devices (desktop)
      } else {
        setTodosPerPage(6); // 6 todos per page for small devices (mobile/tablet)
      }
    };

    handleResize(); // Call initially
    window.addEventListener('resize', handleResize); // Add resize listener

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on component unmount
    };
  }, []);

  // Filter todos based on search query
  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addTodo = (todo) => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setIsFormOpen(false);
  };

  const toggleTodoItem = (todoId, itemId) => {
    const newTodos = todos.map(todo => {
      if (todo.id === todoId) {
        const newItems = todo.items.map(item => {
          if (item.id === itemId) {
            return { ...item, completed: !item.completed };
          }
          return item;
        });
        return { ...todo, items: newItems };
      }
      return todo;
    });
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Task Master</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="p-2 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {isFormOpen && (
        <TodoForm onSubmit={addTodo} onClose={() => setIsFormOpen(false)} />
      )}

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Todo List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleItem={toggleTodoItem}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TodoList;
