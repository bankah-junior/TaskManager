import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TodoForm() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([{ id: Date.now(), text: '', completed: false }]);
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };

  const addTodo = (todo) => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    if (items.some((item) => !item.text.trim())) {
      alert('Checklist items cannot be empty');
      return;
    }
    const todo = {
      id: Date.now(),
      title,
      description,
      items,
      date: new Date().toISOString(),
    };
    addTodo(todo);
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), text: '', completed: false }]);
  };

  const updateItem = (id, text) => {
    setItems(items.map((item) => (item.id === id ? { ...item, text } : item)));
  };

  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Create a New Task</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block mb-2 text-lg font-semibold text-gray-700">
              Task Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block mb-2 text-lg font-semibold text-gray-700">
              Task Description
            </label>
            <ReactQuill
              id="description"
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
              placeholder="Describe your task..."
              className="border border-gray-300 rounded-lg"
            />
          </div>

          {/* Checklist Section */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-700">Checklist Items</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <input
                  key={item.id}
                  type="text"
                  value={item.text}
                  onChange={(e) => updateItem(item.id, e.target.value)}
                  placeholder="Add a checklist item"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={addItem}
              className="mt-3 text-sm font-medium text-blue-600 hover:underline"
            >
              + Add another item
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
