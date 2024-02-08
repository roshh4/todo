import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './NoteDetailsPage.css'

const NoteDetailPage = () => {
  const { noteId } = useParams();

  const [noteDetails, setNoteDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updateModal , setUpdateModal] = useState(false);


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
      
      setUpdateModal(true);

      if (response) {
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
    setShowDeleteModal(true);
  };
  

  const confirmDelete = async () => {
    const response = await fetch(`http://localhost:3002/delete/${noteId}`, {
      method: 'DELETE',
    });
    if (response) {
        console.log('Note deleted successfully');
        setShowDeleteModal(false);
      } else {
        console.error('Failed to delete note');
      }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCancel = () => {
    setEditedTitle(noteDetails.title);
    setEditedContent(noteDetails.content);
    setIsEditing(false);
  };

  const responseOkay = () =>{
    setUpdateModal(false);
  }

  return (
    <div className='b'>
      {noteDetails && (
        <div>
          {isEditing && (
            <div className='c'>
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
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
          {!isEditing && (
            <div className="a">
              <p>Title: {noteDetails.title}</p>
              <p>Content: {noteDetails.content}</p>
              <p>Last Updated At: {new Date(noteDetails.updatedAt).toLocaleString()}</p>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <Link to="/note_list"><button>Go Back</button></Link>
            </div>
          )}
        </div>
      )}
      {showDeleteModal && ( <div className='d'>
        <p>Are you sure you want to delete this note?</p>
        <Link to="/note_list"><button onClick={confirmDelete} className='y'>Yes</button></Link>
        <button onClick={cancelDelete} className='n'>No</button>
      </div>
      )}
    {updateModal && ( <div className='u'>
      <p>Note Updated successfully</p>
      <Link to="/note_list"><button onClick={responseOkay} className='o'>Okay!</button></Link>
      </div>
    )}
  </div>
  );
  
};
export default NoteDetailPage;
