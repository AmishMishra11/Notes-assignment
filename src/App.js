import styled from "@emotion/styled";
import NotesContainer from "./Components/NotesContainer/notesContainer";

function App() {
  const AppComp = styled.div({
    backgroundColor: "#f3e392",
    position: "relative",
    width: "100vw",
    height: "100vh",
  });

  return (
    <AppComp>
      <NotesContainer />
    </AppComp>
  );
}

export default App;
