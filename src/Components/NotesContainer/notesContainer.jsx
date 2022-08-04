import React, { useEffect } from "react";
import { useNotes } from "../../Context/NotesContext";
import Notes from "../Notes/Notes";
import Sidebar from "../Sidebar/Sidebar";

import styled from "@emotion/styled";
import { getAllNotes } from "../../Services/getAllNotesApi";

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

  useEffect(() => {
    getAllNotes(dispatchNotes);
  }, [dispatchNotes]);

  return (
    <NotesContainerMain>
      <Sidebar />
      <Notes />
    </NotesContainerMain>
  );
}

export default NotesContainer;
