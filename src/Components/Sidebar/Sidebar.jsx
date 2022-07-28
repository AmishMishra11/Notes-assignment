import React from "react";

import "./sidebar.css";

import { BiRightArrow } from "react-icons/bi";
import { useNotes } from "../../Context/NotesContext";

function Sidebar() {
  const { stateNotes, dispatchNotes } = useNotes();

  const { allNotes } = stateNotes;

  const showNotesFunction = (id) => {
    const setPayload = allNotes.find((item) => item.id === id);

    dispatchNotes({ type: "LOAD_NOTE", payload: setPayload });
  };

  return (
    <div className="sidebar">
      <div className="notesName">
        {allNotes.map((item) => (
          <div key={item.id} className="notesDisplay">
            <BiRightArrow />
            <p onClick={() => showNotesFunction(item.id)}>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
