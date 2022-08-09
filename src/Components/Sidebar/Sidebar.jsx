import React, { useState } from "react";

import { BiRightArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";

import { useNotes } from "../../Context/NotesContext";

import styled from "@emotion/styled/macro";
import NotesNames from "./NotesNames";
import { postNote } from "../../Services/postNoteApi";
const SidebarMain = styled.div({
  backgroundColor: "#FAFAFA",
  width: "20rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
});

const SidebarContainer = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const MyNotes = styled.div({
  color: "#798EA3",
  wight: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
});

const MyNoteAdd = styled.div({
  padding: "5px",
  borderRadius: "5px",
  cursor: "pointer",

  position: "relative",

  "& .addNoteHeader": {
    zIndex: "2",
    display: "none",
    position: "absolute",
    width: "5rem",
    backgroundColor: "#5C7798",
    color: "#FFFFFF",
    top: "2rem",
    right: "-2rem",
    textAlign: "center",
    borderRadius: "5px",
    padding: "5px",
  },

  ":hover": {
    backgroundColor: "#F0F2F5",

    "& .addNoteHeader": {
      display: "block",
    },
  },
});

const NoteNameContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});
const NoteDisplay = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "90%",
  // overflowY: "auto",
  // height: "20rem",
});

const DisplayNotes = styled.div({
  cursor: "pointer",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
});

const Trash = styled.div({
  color: "#798EA3",
  width: "100%",
  textAlign: "left",
  padding: "2rem 0.5rem .5rem .5rem",

  cursor: "pointer",
  fontWeight: "600",

  display: "flex",
  alignItems: "center",
  gap: "10px",

  "& div": {
    paddingLeft: "1rem",
  },
});

const AddNote = styled.div({
  color: "#798EA3",
  borderTop: "3px solid #F2F2F2",
  padding: "10px 0",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  cursor: "pointer",
  ":hover": { backgroundColor: "#F0F2F5" },
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
    const NewNote = {
      parent: null,
      title: "New Note",
      content: "New Note Body",
    };
    postNote(dispatchNotes, NewNote);
  };

  const showNotes = allNotes.sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
  );

  return (
    <SidebarMain>
      <SidebarContainer>
        <MyNotes>
          <h3>My Notes</h3>

          <MyNoteAdd onClick={addNoteHandler}>
            <AiOutlinePlus />

            <div className="addNoteHeader">Add Note</div>
          </MyNoteAdd>
        </MyNotes>

        <NoteNameContainer>
          <NoteDisplay>
            {showNotes.map((item) => (
              <NotesNames key={item.id} item={item} />
            ))}
          </NoteDisplay>
          <Trash onClick={() => setTrashOpen((prev) => !prev)}>
            <div>
              <FiTrash2 />
            </div>
            <h4>Trash</h4>
          </Trash>
          {trashOpen && (
            <div>
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
        </NoteNameContainer>
      </SidebarContainer>

      <AddNote onClick={addNoteHandler}>
        <AiOutlinePlus style={{ paddingLeft: "10px" }} />
        New Note
      </AddNote>
    </SidebarMain>
  );
}

export default Sidebar;
