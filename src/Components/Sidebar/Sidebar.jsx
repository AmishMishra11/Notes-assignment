import React, { useState } from "react";

import "./sidebar.css";

import { BiRightArrow } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { useNotes } from "../../Context/NotesContext";

function Sidebar() {
  const { stateNotes, dispatchNotes } = useNotes();

  const { allNotes, trashNotes } = stateNotes;

  const showNotesFunction = (noteToBeDisplayed) => {
    const setPayload = noteToBeDisplayed;

    dispatchNotes({ type: "LOAD_NOTE", payload: setPayload });
  };

  const [trashOpen, setTrashOpen] = useState(false);

  return (
    <div className="sidebar">
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
                    <p onClick={() => showNotesFunction(item)}>{item.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              "Empty"
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
