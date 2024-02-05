// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './home';
import NoteList from './NoteList';
import NoteDetailPage from './NoteDetailPage';
import './App.css';

function App() {
  return (
    <div>
    <header><p class="nts">Notes App</p></header>
    <Router>
      <Routes>
        <Route path="/"  element={<HomePage />} />
        <Route path="/note_list" element={<NoteList />} />
        <Route path="/note/:noteId" element={<NoteDetailPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;