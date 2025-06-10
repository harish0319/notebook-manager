// import React, { createContext, useContext, useState, useEffect } from 'react';

// export const NotesContext = createContext();
// export const useNotes = () => useContext(NotesContext);

// export const NotesProvider = ({ children }) => {
//   const [notes, setNotes] = useState(() => {
//     try {
//       const savedNotes = localStorage.getItem('notes');
//       return savedNotes ? JSON.parse(savedNotes) : [];
//     } catch (error) {
//       console.error('Error loading notes from localStorage:', error);
//       return [];
//     }
//   });
//   const [search, setSearch] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [editingNote, setEditingNote] = useState(null);

//   useEffect(() => {
//     try {
//       localStorage.setItem('notes', JSON.stringify(notes));
//     } catch (error) {
//       console.error('Error saving notes to localStorage:', error);
//     }
//   }, [notes]);

//   const addNote = (note) => {
//     if (!note || !note.title) return;
//     const updated = [...notes, { ...note, id: Date.now() }];
//     setNotes(updated);
//   };

//   const editNote = (id, updatedNote) => {
//     if (!updatedNote || !updatedNote.title) return;
//     const updated = notes.map(note => 
//       note.id === id ? { ...updatedNote, id } : note
//     );
//     setNotes(updated);
//     setEditingNote(null);
//   };

//   const deleteNote = (id) => {
//     const updated = notes.filter(note => note.id !== id);
//     setNotes(updated);
//   };

//   return (
//     <NotesContext.Provider
//       value={{
//         notes,
//         search,
//         setSearch,
//         addNote,
//         editNote,
//         deleteNote,
//         showModal,
//         setShowModal,
//         editingNote,
//         setEditingNote
//       }}
//     >
//       {children}
//     </NotesContext.Provider>
//   );
// };


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