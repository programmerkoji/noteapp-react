import { useState } from "react";
import uuid from "react-uuid";

import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
	const [notes, setNotes] = useState([]);

	const onAddNote = () => {
		console.log("新しくNoteが追加されました。");
		const newNote = {
			id: uuid(),
			title: "新しいノート",
			content: "新しいノートの内容",
			modDate: Date.now(),
		};
		setNotes([...notes, newNote]);
		console.log(notes);
	};

	const onDeleteNote = (id) => {
		const filterNotes = notes.filter((note) => note.id !== id); //クリックしたidにマッチしないidのものを残す
		console.log(filterNotes);
		setNotes(filterNotes);
	};

	return (
		<div className="App">
			<Sidebar
				onAddNote={onAddNote}
				notes={notes}
				onDeleteNote={onDeleteNote}
			/>
			<Main />
		</div>
	);
}

export default App;
