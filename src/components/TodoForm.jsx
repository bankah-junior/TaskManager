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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl p-6 overflow-y-auto bg-white rounded-lg">
        <h2 className="mb-4 text-2xl font-bold">New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          {/* Description Input */}
          <div className="h-48 overflow-y-auto">
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
              placeholder="Describe your task..."
              className="w-full h-full border-2 rounded-lg"
            />
          </div>

          {/* Checklist Section */}
          <div className="pt-8 space-y-4">
            <h3 className="text-xl font-semibold">Checklist Items</h3>
            <div className="space-y-4 overflow-y-auto max-h-24">
              {items.map(item => (
                <input
                  key={item.id}
                  type="text"
                  value={item.text}
                  onChange={(e) => updateItem(item.id, e.target.value)}
                  placeholder="Add checklist item"
                  className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={addItem}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              + Add another item
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
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
