import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      console.log('hi');
      if (response.ok) {
        console.log('Note added successfully');
        setTitle('');
        setContent('');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        console.error('Failed to add note.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <hi class='add'>Add New Note</hi>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default NoteForm;