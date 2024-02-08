import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fetchTilesData from './LastThreeNotes.js'

const NoteForm = ({ fetchTilesData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setAddSuccess(true);
    try {
      console.log('hi');
        setTitle('');
        console.log("ooo");
        setContent('');
      const response = await fetch('http://localhost:3002/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      console.log("ajshfa");

      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const responseOkay = () => {
    setAddSuccess(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <hi className='add'>Add New Note</hi>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <button type="submit">Save</button>
      {addSuccess && (<div className = "adds">
        <p>Note Added Successfully</p>
        <button onClick={responseOkay}>Okay!</button>
      </div>)}
    </form>
  );
};

export default NoteForm;