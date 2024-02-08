import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './home';
import NoteList from './NoteList';
import NoteDetailPage from './NoteDetailPage';
import './App.css';

function App() {
  return (
    <div>
      <Router>
      <header>
        <p className="nts">Notes App</p>
        {/* <nav>
          <Link to="/">Home</Link>
          <Link to="/note_list">View All</Link>
        </nav> */}
      </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/note_list" element={<NoteList />} />
          <Route path="/note/:noteId" element={<NoteDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;