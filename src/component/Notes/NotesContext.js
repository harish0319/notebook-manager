import React, { createContext, useContext, useState, useEffect } from 'react';

export const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem('notes');
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch (error) {
      console.error('Error loading notes from localStorage:', error);
      return [];
    }
  });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes to localStorage:', error);
    }
  }, [notes]);

  const addNote = (note) => {
    if (!note || !note.title) return;
    const updated = [...notes, { ...note, id: Date.now() }];
    setNotes(updated);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        search,
        setSearch,
        addNote,
        showModal,
        setShowModal
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
