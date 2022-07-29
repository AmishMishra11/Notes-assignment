import { createContext, useContext, useReducer } from "react";
import { noteReducer } from "../Reducers/notesReducer";

const NoteContext = createContext();

const NoteContextProvider = ({ children }) => {
  const [stateNotes, dispatchNotes] = useReducer(noteReducer, {
    allNotes: [],
    singleNote: {},
    trashNotes: [],
  });

  return (
    <NoteContext.Provider value={{ stateNotes, dispatchNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

const useNotes = () => useContext(NoteContext);

export { NoteContextProvider, useNotes };
