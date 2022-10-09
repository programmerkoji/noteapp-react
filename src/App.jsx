import { useEffect, useState } from "react";
import uuid from "react-uuid";

import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
	const [notes, setNotes] = useState(
		JSON.parse(localStorage.getItem("notes")) || [] //JSON.parseでJSON形式をJSの形式に変換（戻す）
	);
	const [activeNote, setActiveNote] = useState(false);

	useEffect(() => {
		// ローカルストレージにノートを保存する
		localStorage.setItem("notes", JSON.stringify(notes)); //JSON.stringifyでオブジェクトをJSON形式に変換
	}, [notes]);

	const onAddNote = () => {
		console.log("新しくNoteが追加されました。");
		const newNote = {
			id: uuid(),
			title: "新しいノート",
			content: "",
			modDate: Date.now(),
		};
		setNotes([...notes, newNote]);
		console.log(notes);
	};

	const onDeleteNote = (id) => {
		const filterNotes = notes.filter((note) => note.id !== id); //クリックしたidにマッチしないidのものを残す
		setNotes(filterNotes);
	};

	const getActiveNote = () => {
		return notes.find((note) => note.id === activeNote);
	};

	const onUpdateNote = (updatedNote) => {
		// 修正された新しいノートの配列を返す
		const updatedNotesArray = notes.map((note) => {
			if (note.id === updatedNote.id) {
				return updatedNote;
			} else {
				return note;
			}
		});

		setNotes(updatedNotesArray);
	};

	return (
		<div className="App">
			<Sidebar
				onAddNote={onAddNote}
				notes={notes}
				onDeleteNote={onDeleteNote}
				activeNote={activeNote}
				setActiveNote={setActiveNote}
			/>
			<Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
		</div>
	);
}

export default App;
