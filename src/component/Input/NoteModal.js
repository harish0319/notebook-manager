import React, { useState } from 'react';
import { useNotes } from '../Notes/NotesContext';

const NoteModal = () => {
  const { setShowModal, addNote } = useNotes();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    addNote({ title, desc });
    setTitle('');
    setDesc('');
    setShowModal(false);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ background: '#fff', padding: '20px', width: '300px', borderRadius: '8px' }}>
        <h2>Add New Note</h2>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        ></textarea>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handleAdd}>Add to Book</button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
