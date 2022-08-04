import React, { useState } from "react";

import { BiRightArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

import { useNotes } from "../../Context/NotesContext";

import styled from "@emotion/styled/macro";
import NotesNames from "./NotesNames";

const SidebarMain = styled.div({
  backgroundColor: "rgb(227, 227, 227)",
  width: "20%",
  height: "100%",
});

const SidebarContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  alignItems: "center",
  justifyContent: "space-between",
});

const NoteName = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

const DisplayNotes = styled.div({
  cursor: "pointer",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
});

const Trash = styled.div({
  cursor: "pointer",
  fontWeight: "600",
});

const AddNote = styled.div({
  borderTop: "1px solid rgb(62, 62, 62)",
  padding: "10px 0",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  ":hover": { backgroundColor: "rgb(189, 189, 189)" },
});
function Sidebar() {
  const { stateNotes, dispatchNotes } = useNotes();

  const { allNotes, trashNotes } = stateNotes;

  const [trashOpen, setTrashOpen] = useState(false);

  const showNotesFunction = (noteToBeDisplayed) => {
    const setPayload = noteToBeDisplayed;

    dispatchNotes({ type: "LOAD_NOTE", payload: setPayload });
  };

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
    <SidebarMain>
      <SidebarContainer>
        <NoteName>
          {allNotes.map((item) => (
            <NotesNames key={item.id} item={item} />
          ))}

          <Trash onClick={() => setTrashOpen((prev) => !prev)}>Trash</Trash>
          {trashOpen && (
            <div className="trashContainer">
              {trashNotes.length !== 0 ? (
                <div className="trashNotes">
                  {trashNotes.map((item) => (
                    <DisplayNotes key={item.id}>
                      <BiRightArrow />
                      <p onClick={() => showNotesFunction(item)}>
                        {item.title}
                      </p>
                    </DisplayNotes>
                  ))}
                </div>
              ) : (
                "Empty"
              )}
            </div>
          )}
        </NoteName>

        <AddNote onClick={addNoteHandler}>
          <AiOutlinePlus />
          Add New Note
        </AddNote>
      </SidebarContainer>
    </SidebarMain>
  );
}

export default Sidebar;
