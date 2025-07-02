import React, { useState, useEffect } from 'react';
import { useNotes } from '../Notes/NotesContext';
import './NoteModal.css';

const NoteModal = () => {
  const { setShowModal, addNote, editNote, editingNote , notes} = useNotes();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDesc(editingNote.desc || '');
    }
  }, [editingNote]);

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const titleExists = notes.some(note =>
      note.title.toLowerCase() === trimmedTitle.toLowerCase() &&
      (!editingNote || note.id !== editingNote.id)
    );

    if (titleExists) {
      alert("A note with this title already exists. Please choose a different title.");
      return;
    }

    if (editingNote) {
      editNote(editingNote.id, { title: trimmedTitle, desc });
    } else {
      addNote({ title: trimmedTitle, desc });
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
