// import React from 'react';
// import { useNotes } from '../Notes/NotesContext';
// import './Form.css';


// const Form = () => {
//   const { 
//     search = '', 
//     setSearch, 
//     notes = [], 
//     deleteNote, 
//     setEditingNote, 
//     setShowModal 
//   } = useNotes();

//   const filteredNotes = notes.filter(note => {
//     if (!note || typeof note.title !== 'string') return false;
//     return note.title.toLowerCase().includes(search.toLowerCase());
//   });

//   const handleEdit = (note) => {
//     setEditingNote(note);
//     setShowModal(true);
//   };

//   return (
//     <div className="form-container">
//       <div className="search-section">
//         <input
//           type="text"
//           placeholder="Search Notes"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="form-search-input"
//         />
//         <div className="notes-counts">
//           <div>Total Notes: {notes.length}</div>
//           <div>Showing: {filteredNotes.length}</div>
//         </div>
//       </div>
//       <button onClick={() => setShowModal(true)}>Add New Note</button>
//       <ul className="notes-list">
//         {filteredNotes.map((note) => (
//           <li key={note.id} className="note-item">
//             <div className="note-content">
//               <div>
//                 <strong className="note-title">{note.title}</strong>
//                 <p className="note-desc">{note.desc || ''}</p>
//               </div>
//               <div className="note-actions">
//                 <button 
//                   onClick={() => handleEdit(note)}
//                   className="edit-btn"
//                 >
//                   Edit
//                 </button>
//                 <button 
//                   onClick={() => deleteNote(note.id)}
//                   className="delete-btn"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Form;

import React, { useState, useEffect } from 'react';
import { useNotes } from '../Notes/NotesContext';
import './Form.css';
import cardImage from '../../assets/form_box.jpg';

const Form = () => {
  const { 
    search = '', 
    setSearch, 
    notes = [], 
    deleteNote, 
    setEditingNote, 
    setShowModal 
  } = useNotes();

  const [latestNote, setLatestNote] = useState(null);

  useEffect(() => {
    if (notes.length > 0) {
      const newest = notes[notes.length - 1];
      setLatestNote(newest);
    }
  }, [notes]);

  const filteredNotes = notes.filter(note => {
    if (!note || typeof note.title !== 'string') return false;
    return note.title.toLowerCase().includes(search.toLowerCase());
  });

  const handleEdit = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  return (
    <>
      {/* 🔲 Top box including search and Add button */}
      <div className="top-box">
        <div className="form-container">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search Notes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-search-input"
            />
            <div className="notes-counts">
              <div>Total Notes: {notes.length}</div>
              <div>Showing: {filteredNotes.length}</div>
            </div>
          </div>

          <button onClick={() => {
            setEditingNote(null);
            setShowModal(true);
          }} className="add-note-btn">
            Add New Note
          </button>
        </div>
      </div>

      {/* 📝 Notes display outside the box */}
      <div className="notes-display-area">
        <ul className="notes-list">
          {filteredNotes.map((note) => (
            <li key={note.id} className="note-item">
              <div className="note-content">
                <strong className="note-title">{note.title}</strong>
                <p className="note-desc">{note.desc || ''}</p>
                <div className="note-actions">
                  <button onClick={() => handleEdit(note)} className="edit-btn">Edit</button>
                  <button onClick={() => deleteNote(note.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Form;

