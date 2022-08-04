import React, { useEffect, useState } from "react";
import { useNotes } from "../../Context/NotesContext";

import styled from "@emotion/styled";

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

  const { id, title, body, inTrash } = singleNote;

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
    <MainNotes>
      {inTrash && (
        <TrashNotes>
          <TrashNotesHeader>This is trash Note</TrashNotesHeader>
          <TrashNotesButton
            onClick={() =>
              dispatchNotes({ type: "RESTORE_NOTE", payload: singleNote })
            }
          >
            Restore
          </TrashNotesButton>
          <TrashNotesButton
            onClick={() => dispatchNotes({ type: "DELETE_NOTE", payload: id })}
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
