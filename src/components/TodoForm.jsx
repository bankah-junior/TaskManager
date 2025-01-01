import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TodoForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([{ id: Date.now(), text: '', completed: false }]);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      id: Date.now(),
      title,
      description,
      items,
      date: new Date().toISOString(),
    };
    onSubmit(todo);
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), text: '', completed: false }]);
  };

  const updateItem = (id, text) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, text } : item
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          
          <div className="h-48">
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
              placeholder="Description"
              preserveWhitespace
            />
          </div>

          <div className="space-y-2 pt-8">
            <h3 className="font-semibold">Checklist Items</h3>
            {items.map(item => (
              <input
                key={item.id}
                type="text"
                value={item.text}
                onChange={(e) => updateItem(item.id, e.target.value)}
                placeholder="List item"
                className="w-full p-2 border rounded"
              />
            ))}
            <button
              type="button"
              onClick={addItem}
              className="text-blue-500 hover:text-blue-600"
            >
              + Add item
            </button>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;