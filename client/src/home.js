import React, { useState, useEffect } from 'react';
import NoteForm from './NoteForm';
import './home.css';
import TilesContainer from './LastThreeNotes.js';

const HomePage = () => {
  const [notes, setNotes] = useState([]);

  const handleAddNote = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  return (
    <div className="home_page">
      <div className="view">
      <div className='addNote'><NoteForm onAddNote={handleAddNote} /></div>
      <div className="latest_notes_container">
        <TilesContainer notes={notes} />
      </div>
      </div>
    </div>
  );
};

export default HomePage;