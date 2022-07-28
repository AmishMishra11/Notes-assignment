import React, { useEffect } from "react";
import { useNotes } from "../../Context/NotesContext";
import { Data } from "../../DataBase";
import Notes from "../Notes/Notes";
import Sidebar from "../Sidebar/Sidebar";
import "./notesContainer.css";
function NotesContainer() {
  const { dispatchNotes } = useNotes();

  const myData = Data.Notes;

  useEffect(() => {
    dispatchNotes({ type: "LOAD_ALL_NOTES", payload: myData });
  }, [dispatchNotes, myData]);

  return (
    <div className="notesContainer">
      <Sidebar />
      <Notes />
    </div>
  );
}

export default NotesContainer;
