import React, { useEffect } from "react";
import { useNotes } from "../../Context/NotesContext";
import { Data } from "../../DataBase";
import Notes from "../Notes/Notes";
import Sidebar from "../Sidebar/Sidebar";

import styled from "@emotion/styled";

const NotesContainerMain = styled.div({
  width: "90%",
  height: "80%",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: " translate(-50%, -50%)",
  display: "flex",
});
function NotesContainer() {
  const { dispatchNotes } = useNotes();

  const myData = Data.Notes;

  useEffect(() => {
    dispatchNotes({ type: "LOAD_ALL_NOTES", payload: myData });
  }, [dispatchNotes, myData]);

  return (
    <NotesContainerMain>
      <Sidebar />
      <Notes />
    </NotesContainerMain>
  );
}

export default NotesContainer;
