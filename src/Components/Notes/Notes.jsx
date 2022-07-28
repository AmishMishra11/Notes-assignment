import React, { useEffect, useState } from "react";
import { useNotes } from "../../Context/NotesContext";
import "./notes.css";

function Notes() {
  const { stateNotes, dispatchNotes } = useNotes();

  const { singleNote } = stateNotes;

  const { title, body } = singleNote;

  const [oldTitle, setTitle] = useState("");
  const [oldBody, setBody] = useState("");

  useEffect(() => {
    setBody(body);
    setTitle(title);
  }, [title, body]);

  const titleChangeHandler = (newTitle) => {
    setTitle(newTitle);

    const newSingleNote = { ...singleNote, title: newTitle };

    dispatchNotes({ type: "SET_NOTE", payload: newSingleNote });
  };

  const bodyChangeHandler = (newBody) => {
    setBody(newBody);

    const newSingleNote = { ...singleNote, body: newBody };

    dispatchNotes({ type: "SET_NOTE", payload: newSingleNote });
  };

  return (
    <div className="notes">
      <h4>{title}</h4>

      <input
        className="notesTitle"
        type="text"
        value={oldTitle}
        onChange={(e) => titleChangeHandler(e.target.value)}
      />

      <input
        className="notesBody"
        type="text"
        value={oldBody}
        onChange={(e) => bodyChangeHandler(e.target.value)}
      />
    </div>
  );
}

export default Notes;
