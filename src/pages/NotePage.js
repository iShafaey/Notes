import React, { useState, useEffect } from "react";
// import notes from '../assets/data'
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = ({ match, history }) => {
  let noteId = match.params.id;
  // eslint-disable-next-line
  // let note = notes.find(note => note.id == noteId);

  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();

    // eslint-disable-next-line
  }, [noteId]);

  let getNote = async () => {
    if (noteId === "new") return;

    let response = await fetch(`http://127.0.0.1:5000/notes/${noteId}`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    await fetch(`http://127.0.0.1:5000/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
    history.push("/");
  };

  let updateNote = async () => {
    await fetch(`http://127.0.0.1:5000/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
    history.push("/");
  };

  let deleteNote = async () => {
    await fetch(`http://127.0.0.1:5000/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    history.push("/");
  };

  let handleSubmit = () => {
    if (noteId !== "new" && !note.body) {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note !== null) {
      createNote();
    } else {
      history.push("/");
    }
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
