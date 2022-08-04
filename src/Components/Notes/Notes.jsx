import React, { useEffect, useState } from "react";
import { useNotes } from "../../Context/NotesContext";

import styled from "@emotion/styled";
import { postNote } from "../../Services/postNoteApi";
import { editNote } from "../../Services/editNoteApi";

const MainNotes = styled.div({
  backgroundColor: "rgb(245, 245, 245)",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
});

const NotesHeader = styled.div({
  width: "95%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const NotesTitle = styled.input({
  width: "60%",
  wordWrap: "break-word",
  backgroundColor: "rgb(245, 245, 245)",
  border: "0",
  outline: "none",
  color: "black",
  fontSize: "xx-large",
  fontWeight: "600",
});

const NotesBody = styled.input({
  marginTop: "2rem",
  width: "60%",
  wordWrap: "break-word",
  backgroundColor: "rgb(245, 245, 245)",
  border: "0",
  outline: "none",
  color: "black",
  fontSize: "large",
  fontWeight: "400",
});

const TrashNotes = styled.div({
  backgroundColor: "rgb(245, 78, 78)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  color: "white",
});

const TrashNotesHeader = styled.h5({
  marginRight: "2rem",
});

const TrashNotesButton = styled.button({
  cursor: "pointer",
  background: "none",
  border: "2px solid white",
  borderRadius: "5px",
  color: "white",
  margin: "0 5px",
  padding: "5px 10px",
});
function Notes() {
  const { stateNotes, dispatchNotes } = useNotes();

  const { singleNote } = stateNotes;

  const { id, title, content, is_trash } = singleNote;

  const [oldTitle, setTitle] = useState("");
  const [oldBody, setBody] = useState("");

  useEffect(() => {
    setBody(content);
    setTitle(title);
  }, [title, content]);

  const titleChangeHandler = (newTitle) => {
    setTitle(newTitle);

    const newSingleNote = { ...singleNote, title: newTitle };

    editNote(dispatchNotes, newSingleNote);

    // dispatchNotes({ type: "SET_NOTE", payload: newSingleNote });
  };

  const bodyChangeHandler = (newBody) => {
    setBody(newBody);

    const newSingleNote = { ...singleNote, content: newBody };

    editNote(dispatchNotes, newSingleNote);

    // dispatchNotes({ type: "SET_NOTE", payload: newSingleNote });
  };

  return (
    <MainNotes>
      {is_trash && (
        <TrashNotes>
          <TrashNotesHeader>This is trash Note</TrashNotesHeader>
          <TrashNotesButton
            onClick={() => {
              postNote(dispatchNotes, singleNote);

              dispatchNotes({ type: "RESTORE_NOTE", payload: singleNote });
            }}
          >
            Restore
          </TrashNotesButton>
          <TrashNotesButton
            onClick={() => {
              dispatchNotes({ type: "DELETE_NOTE", payload: id });
            }}
          >
            Delete
          </TrashNotesButton>
        </TrashNotes>
      )}
      <NotesHeader>
        <h4>{title}</h4>
      </NotesHeader>

      <NotesTitle
        type="text"
        value={oldTitle}
        onChange={(e) => {
          titleChangeHandler(e.target.value);
        }}
      />

      <NotesBody
        type="text"
        value={oldBody}
        onChange={(e) => bodyChangeHandler(e.target.value)}
      />
    </MainNotes>
  );
}

export default Notes;
