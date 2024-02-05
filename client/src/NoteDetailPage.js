import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './NoteDetailsPage.css'

const NoteDetailPage = () => {
  const { noteId } = useParams();

  const [noteDetails, setNoteDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/notes/${noteId}`);
        const data = await response.json();
        setNoteDetails(data);
        setEditedTitle(data.title);
        setEditedContent(data.content);
      } catch (error) {
        console.error('Error fetching note details', error);
      }
    };

    fetchNoteDetails();
  }, [noteId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3002/update/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedTitle,
          content: editedContent,
        }),
      });

      if (response.ok) {
        setIsEditing(false);
        const updatedNoteDetails = await response.json();
        setNoteDetails(updatedNoteDetails);
      } else {
        console.error('Failed to update note details');
      }
    } catch (error) {
      console.error('Error updating note details', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3002/delete/${noteId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  const handleCancel = () => {
    setEditedTitle(noteDetails.title);
    setEditedContent(noteDetails.content);
    setIsEditing(false);
  };

  return (
    <div>
      <h2>Note Detail Page</h2>
      {noteDetails && (
        <div>
          {isEditing && (
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <label>Content:</label>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <Link to="/note_list"><button onClick={handleSave}>Save</button></Link>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
          {!isEditing && (
            <div class="a">
              <p>Title: {noteDetails.title}</p>
              <p>Content: {noteDetails.content}</p>
              <p>Last Updated At: {new Date(noteDetails.updatedAt).toLocaleString()}</p>
              <button onClick={handleEdit}>Edit</button>
              <Link to="/note_list"><button onClick={handleDelete}>Delete</button></Link>
              <Link to="/note_list"><button>Go Back</button></Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
};

export default NoteDetailPage;
