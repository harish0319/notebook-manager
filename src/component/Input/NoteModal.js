import React, { useState, useEffect } from 'react';
import { useNotes } from '../Notes/NotesContext';
import './NoteModal.css';

const NoteModal = () => {
  const { setShowModal, addNote, editNote, editingNote } = useNotes();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDesc(editingNote.desc || '');
    }
  }, [editingNote]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    if (editingNote) {
      editNote(editingNote.id, { title, desc });
    } else {
      addNote({ title, desc });
    }
    
    setTitle('');
    setDesc('');
    setShowModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{editingNote ? 'Edit Note' : 'Add New Note'}</h2>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="modal-input"
        />
        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="modal-textarea"
          rows={4}
        ></textarea>
        <div className="modal-actions">
          <button 
            onClick={handleSubmit}
            className="modal-button save"
          >
            {editingNote ? 'Save Changes' : 'Add Note'}
          </button>
          <button 
            onClick={() => setShowModal(false)}
            className="modal-button cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
