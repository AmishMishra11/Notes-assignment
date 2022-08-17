import React, { useEffect, useRef, useState } from "react";
import { useNotes } from "../../Context/NotesContext";

import styled from "@emotion/styled";
import { postNote } from "../../Services/postNoteApi";
import { editNote } from "../../Services/editNoteApi";
import Editor from "../Editor";

const MainNotes = styled.div({
  backgroundColor: "#FFFFFF",
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
  border: "0",
  outline: "none",
  color: "black",
  fontSize: "xx-large",
  fontWeight: "600",
});

const NotesEditor = styled.div({
  marginTop: "1rem",
  width: "60%",
  height: "60%",
});

const NotesBody = styled.textarea({
  marginTop: "2rem",
  width: "60%",
  height: "60%",
  wordWrap: "break-word",
  fontFamily: "'Inter', sans-serif",
  border: "0",
  outline: "none",
  color: "black",
  fontSize: "large",
  fontWeight: "400",
});

const TrashNotes = styled.div({
  backgroundColor: "#C23934",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  color: "white",
});

const TrashNotesHeader = styled.h5({
  marginRight: "2rem",
  fontWeight: "500",
});

const TrashNotesButton = styled.button({
  cursor: "pointer",
  background: "#CD4B46",
  border: "2px solid transparent",
  borderRadius: "5px",
  color: "white",
  margin: "0 5px",
  padding: "5px 10px",
});
function Notes() {
  const inputRef = useRef();
  const { stateNotes, dispatchNotes } = useNotes();

  const { singleNote } = stateNotes;

  const { id, title, content, is_trash } = singleNote;

  const [oldTitle, setTitle] = useState("");

  useEffect(() => {
    setTitle(title);
    // inputRef.current.select();
    // eslint-disable-next-line
  }, [id]);

  const deboundingFunction = (callbackFunc, delay) => {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        callbackFunc.apply(context, args);
      }, delay);
    };
  };

  const titleChangeHandler = (newTitle) => {
    const newSingleNote = { ...singleNote, title: newTitle };

    editNote(dispatchNotes, newSingleNote);
  };

  const debounceTitle = deboundingFunction(titleChangeHandler, 300);

  return (
    <MainNotes>
      {is_trash && (
        <TrashNotes>
          <TrashNotesHeader>This note is in trash </TrashNotesHeader>
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
            Delete Permently
          </TrashNotesButton>
        </TrashNotes>
      )}
      <NotesHeader>
        <h4>{title}</h4>
      </NotesHeader>

      <NotesTitle
        ref={inputRef}
        type="text"
        value={oldTitle}
        onChange={(e) => {
          setTitle(e.target.value);
          debounceTitle(e.target.value);
        }}
      />
      <NotesEditor>
        {content && <Editor content={content} id={id} />}
      </NotesEditor>

      {/* <NotesBody type="text" placeholder="test" /> */}
    </MainNotes>
  );
}

export default Notes;
