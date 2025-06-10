// import Header from "./component/Layout/Header";
// import { NotesProvider } from "./component/Notes/NotesContext";
// import NoteModal from "./component/Input/NoteModal";
// import { useNotes } from "./component/Notes/NotesContext";

// function AppContent() {
//   const { showModal } = useNotes();
  
//   return (
//     <div className="app">
//       <Header />
//       {showModal && <NoteModal />}
//     </div>
//   );
// }

// function App() {
//   return (
//     <NotesProvider>
//       <AppContent />
//     </NotesProvider>
//   );
// }

// export default App;


import Header from "./component/Layout/Header";
import NoteModal from "./component/Input/NoteModal";
import { NotesProvider, useNotes } from "./component/Notes/NotesContext";

const AppContent = () => {
  const { showModal } = useNotes();

  return (
    <div className="app">
      <Header />
      {showModal && <NoteModal />}
    </div>
  );
};

const App = () => (
  <NotesProvider>
    <AppContent />
  </NotesProvider>
);

export default App;