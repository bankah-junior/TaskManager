import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TodoItem from "./TodoItem";
import { PlusIcon, ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function SortableTodo({ todo, index, toggleTodoItem, todos, setTodos }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center p-4 bg-white border border-gray-300 rounded shadow"
    >
      {/* Drag Handle Icon */}
      <div {...listeners} {...attributes} className="mr-4 cursor-grab">
        <ArrowsUpDownIcon className="w-6 h-6 text-gray-500" />
      </div>

      {/* Todo Content */}
      <div className="flex-1">
        <TodoItem key={todo.id} todo={todo} onToggleItem={toggleTodoItem} todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setTodosPerPage(12);
      } else {
        setTodosPerPage(6);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleTodoItem = (todoId, itemId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const newItems = todo.items.map((item) => {
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
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTodos((prevTodos) => {
        const oldIndex = prevTodos.findIndex((todo) => todo.id === active.id);
        const newIndex = prevTodos.findIndex((todo) => todo.id === over.id);

        const newTodos = arrayMove(prevTodos, oldIndex, newIndex);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return newTodos;
      });
    }
  };

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Task Master</h1>
        <Link
          to="/todo-form"
          className="p-2 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
        >
          <PlusIcon className="w-6 h-6" />
        </Link>
      </div>

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

      {/* Todo List with Drag-and-Drop */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={paginatedTodos.map((todo) => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paginatedTodos.map((todo, index) => (
              <SortableTodo
                key={todo.id}
                todo={todo}
                index={index}
                toggleTodoItem={toggleTodoItem}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

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
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TodoList;