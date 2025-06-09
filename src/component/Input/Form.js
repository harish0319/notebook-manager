import React from 'react';
import { useNotes } from '../Notes/NotesContext';

const Form = () => {
  const { search = '', setSearch, notes = [] } = useNotes();

  const filteredNotes = notes.filter(note => {
    if (!note || typeof note.title !== 'string') return false;
    return note.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <input
        type="text"
        placeholder="Search Notes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
      />

      <p>Total Notes: {notes.length}</p>

      <ul>
        {filteredNotes.map((note) => (
          <li key={note.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <strong>{note.title}</strong>
            <p>{note.desc || ''}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
