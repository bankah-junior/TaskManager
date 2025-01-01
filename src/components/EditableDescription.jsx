import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditableDescription({ initialValue, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="relative group">
        <div 
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: value }} 
        />
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 bg-gray-100 p-1 rounded text-sm"
          aria-label="Edit description"
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="h-48">
        <ReactQuill
          value={value}
          onChange={setValue}
          modules={modules}
          theme="snow"
        />
      </div>
      <div className="flex justify-end space-x-2 pt-8">
        <button
          onClick={() => setIsEditing(false)}
          className="px-2 py-1 text-sm text-gray-600 hover:text-gray-800 focus:outline focus:outline-blue-500"
          aria-label="Cancel editing"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline focus:outline-blue-700"
          aria-label="Save description"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditableDescription;
