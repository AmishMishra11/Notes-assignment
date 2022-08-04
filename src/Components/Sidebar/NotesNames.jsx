import styled from "@emotion/styled/macro";
import React, { useState } from "react";
import { BiRightArrow, BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { useNotes } from "../../Context/NotesContext";
import { deleteNote } from "../../Services/deleteNoteApi";

const IconContainer = styled.div({
  position: "relative",
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  "& .optionIcons": {
    ":hover": { backgroundColor: "rgb(189, 189, 189)" },
    padding: "5px",
    borderRadius: "5px",
  },
});

const DisplayNotesContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  &:hover ${IconContainer} {
    display: flex;
  }
`;

const DisplayNotes = styled.div({
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
  },
});

const OptionContainer = styled.div({
  position: "absolute",
  top: "20px",
  right: "30px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  padding: ".5rem 1rem",
  borderRadius: "5px",

  "& .optionIcon": {
    ":hover": { backgroundColor: "rgb(189, 189, 189)" },
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
  },
});
function NotesNames({ item }) {
  const { dispatchNotes } = useNotes();

  const [options, setOptionsOpen] = useState(false);
  const [trashId, setTrashId] = useState("");

  const showNotesFunction = (noteToBeDisplayed) => {
    const setPayload = noteToBeDisplayed;

    dispatchNotes({ type: "LOAD_NOTE", payload: setPayload });
  };

  return (
    <DisplayNotesContainer>
      <DisplayNotes>
        <BiRightArrow />
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
        <AiOutlinePlus className="optionIcons" />

        {options && (
          <OptionContainer>
            <div
              className="optionIcon"
              onClick={() =>
                dispatchNotes({ type: "DUPLICATE_NOTE", payload: item })
              }
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
    </DisplayNotesContainer>
  );
}

export default NotesNames;
