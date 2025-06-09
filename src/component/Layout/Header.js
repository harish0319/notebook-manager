import { useNotes } from "../Notes/NotesContext";
import Form from "../Input/Form";

const Header = (props) => {
    const { setShowModal } = useNotes();

    return (
        <header className="header">
            <h1>Note Book Manager</h1>
            <Form />
            <button onClick={() => setShowModal(true)}>Add New Note</button>
        </header>
    );
};

export default Header;