import React, { createContext, useContext, useState, useEffect } from 'react';

// Create and export context
const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);

// Provider component
export const NotesProvider = ({ children }) => {
  // Load notes from localStorage
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('notes')) || [];
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Save notes to localStorage on change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    if (note?.title) setNotes([...notes, { ...note, id: Date.now() }]);
  };

  const editNote = (id, updatedNote) => {
    if (updatedNote?.title) {
      setNotes(notes.map(note => note.id === id ? { ...updatedNote, id } : note));
      setEditingNote(null);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Provide all state and methods
  return (
    <NotesContext.Provider value={{
      notes, search, setSearch,
      addNote, editNote, deleteNote,
      showModal, setShowModal,
      editingNote, setEditingNote
    }}>
      {children}
    </NotesContext.Provider>
  );
};