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

export default App;