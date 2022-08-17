import styled from "@emotion/styled/macro";
import React, { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus, AiFillCaretDown } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { BsChevronRight } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";

import { useNotes } from "../../Context/NotesContext";
import { deleteNote } from "../../Services/deleteNoteApi";
import { postNote } from "../../Services/postNoteApi";

const IconContainer = styled.div({
  position: "relative",
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  "& .optionIcons": {
    ":hover": { backgroundColor: "#E4E7EB" },
    padding: "5px",
    borderRadius: "5px",
  },
});

const ParentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover ${IconContainer} {
    display: flex;
  }

  :hover {
    background-color: #f0f2f5;
  }
`;

const DisplayNotesContainer = styled.div({
  width: "100%",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
});

const DisplayNotes = styled.div({
  position: "relative",
  cursor: "pointer",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",

  p: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "7rem",
    height: "1.2em",
    whiteSpace: "nowrap",
    margin: "5px",
  },

  "& .dripIcons": {
    color: "#798EA3",
  },
});

const OptionContainer = styled.div({
  zIndex: "2",
  position: "absolute",
  top: "25px",
  right: "30px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  padding: ".5rem 1rem",
  borderRadius: "5px",

  "& .optionIcon": {
    ":hover": { backgroundColor: "#E4E7EB" },
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
  },
});

const ChildNoteContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "90%",
});

const MyNoteAdd = styled.div({
  padding: "5px",
  borderRadius: "5px",
  cursor: "pointer",

  position: "relative",
  zIndex: "999",

  "& .addNoteHeader": {
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
      // display: "block",
      display: "none",
    },
  },
});

function NotesNames({ item }) {
  const { dispatchNotes } = useNotes();

  const [options, setOptionsOpen] = useState(false);
  const [trashId, setTrashId] = useState("");
  const [showChild, setShowChild] = useState(false);

  const showNotesFunction = (noteToBeDisplayed) => {
    const setPayload = noteToBeDisplayed;

    dispatchNotes({ type: "LOAD_NOTE", payload: setPayload });
  };

  const duplicateNoteHandler = () => {
    const NewNote = {
      parent: null,
      title: item.title + " Copy",
      content: item.content,
    };
    postNote(dispatchNotes, NewNote);
  };

  const addInnerNoteHandler = () => {
    const NewNote = {
      parent: item.id,
      title: "New Note",
      content: "New Note Content",
    };
    postNote(dispatchNotes, NewNote);
    setShowChild(true);
  };

  return (
    <DisplayNotesContainer>
      <ParentContainer>
        <DisplayNotes>
          {showChild ? (
            <AiFillCaretDown
              className="dripIcons"
              onClick={() => setShowChild(false)}
            />
          ) : item?.children?.length ? (
            <BsFillCaretRightFill
              className="dripIcons"
              onClick={() => setShowChild(true)}
            />
          ) : (
            <BsChevronRight />
          )}

          <p onClick={() => showNotesFunction(item)}>{item.title}</p>
        </DisplayNotes>
        <IconContainer>
          <BiDotsHorizontalRounded
            className="optionIcons"
            onClick={() => {
              setOptionsOpen((prev) => !prev);
              setTrashId(item.id);
            }}
          />

          <MyNoteAdd onClick={addInnerNoteHandler} className="optionIcons">
            <AiOutlinePlus />
            <div className="addNoteHeader">Add Child</div>
          </MyNoteAdd>

          {options && (
            <OptionContainer>
              <div
                className="optionIcon"
                onClick={() => duplicateNoteHandler()}
              >
                <HiOutlineDocumentDuplicate />
                <small>Duplicate</small>
              </div>

              <div
                className="optionIcon"
                onClick={() => {
                  dispatchNotes({ type: "TRASH_NOTE", payload: trashId });
                  deleteNote(dispatchNotes, item.id);
                }}
              >
                <FiTrash2 />
                <small>Trash</small>
              </div>
            </OptionContainer>
          )}
        </IconContainer>
      </ParentContainer>

      {showChild && (
        <ChildNoteContainer>
          {item.children.map((innerNote) => (
            <NotesNames key={item.id} item={innerNote} />
          ))}
        </ChildNoteContainer>
      )}
    </DisplayNotesContainer>
  );
}

export default NotesNames;
