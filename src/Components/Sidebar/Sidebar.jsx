import React, { useState } from "react";

import "./sidebar.css";

import { BiRightArrow } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";

import { useNotes } from "../../Context/NotesContext";

function Sidebar() {
  const { stateNotes, dispatchNotes } = useNotes();

  const { allNotes, trashNotes } = stateNotes;

  const showNotesFunction = (noteToBeDisplayed) => {
    const setPayload = noteToBeDisplayed;

    dispatchNotes({ type: "LOAD_NOTE", payload: setPayload });
  };

  const [trashOpen, setTrashOpen] = useState(false);

  const addNoteHandler = () => {
    const newID = allNotes.length + 1;

    const newNote = {
      id: newID.toString(),
      title: "New Note",
      body: "New Note Body",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      innerNotes: [],
      inTrash: false,
    };

    dispatchNotes({ type: "ADD_NOTE", payload: newNote });
  };

  return (
    <div className="sidebar">
      <div className="sidebarContainer">
        <div className="notesName">
          {allNotes.map((item) => (
            <div key={item.id} className="allNotesDisplay">
              <div key={item.id} className="notesDisplay">
                <BiRightArrow />
                <p onClick={() => showNotesFunction(item)}>{item.title}</p>
              </div>

              <div>
                <FiTrash2
                  className="trashIcon"
                  onClick={() =>
                    dispatchNotes({ type: "TRASH_NOTE", payload: item.id })
                  }
                />
              </div>
            </div>
          ))}

          <div className="trash" onClick={() => setTrashOpen((prev) => !prev)}>
            Trash
          </div>
          {trashOpen && (
            <div className="trashContainer">
              {trashNotes.length !== 0 ? (
                <div className="trashNotes">
                  {trashNotes.map((item) => (
                    <div key={item.id} className="notesDisplay">
                      <BiRightArrow />
                      <p onClick={() => showNotesFunction(item)}>
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                "Empty"
              )}
            </div>
          )}
        </div>
        <div className="addNote" onClick={addNoteHandler}>
          <AiOutlinePlus />
          Add New Note
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
