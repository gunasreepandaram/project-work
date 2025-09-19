import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const MyEditor = () => {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 mt-4 mb-4'>
          <textarea className='form-control'></textarea>
        </div>
        <div className='col-12'>
          <ReactQuill value={content} onChange={handleChange} />
        </div>
        <div className='col-3'></div>
      </div>
      
    </div>
  );
};

export default MyEditor;
