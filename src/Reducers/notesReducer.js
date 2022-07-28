export const noteReducer = (stateNote, actionNote) => {
  switch (actionNote.type) {
    case "LOAD_ALL_NOTES":
      return {
        ...stateNote,
        allNotes: actionNote.payload,
        singleNote: actionNote.payload[0],
      };

    case "LOAD_NOTE":
      return { ...stateNote, singleNote: actionNote.payload };

    case "SET_NOTE":
      const newAllNote = stateNote.allNotes.map((item) =>
        item.id === actionNote.payload.id ? actionNote.payload : item
      );

      return {
        ...stateNote,
        singleNote: actionNote.payload,
        allNotes: newAllNote,
      };

    default:
      return stateNote;
  }
};
