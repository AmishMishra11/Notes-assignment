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

    case "TRASH_NOTE":
      const removedNote = stateNote.allNotes.find(
        (item) => item.id === actionNote.payload
      );

      const tempAllNotes = stateNote.allNotes.filter(
        (item) => item.id !== actionNote.payload
      );
      return {
        ...stateNote,
        allNotes: tempAllNotes,
        trashNotes: [
          ...stateNote.trashNotes,
          { ...removedNote, inTrash: true },
        ],
      };

    case "RESTORE_NOTE":
      const newTrash = stateNote.trashNotes.filter(
        (item) => item.id !== actionNote.payload.id
      );

      const restroedNote = { ...actionNote.payload, inTrash: false };

      return {
        ...stateNote,
        singleNote: stateNote.allNotes[0],
        allNotes: [...stateNote.allNotes, restroedNote],
        trashNotes: newTrash,
      };

    case "DELETE_NOTE":
      const temppTrash = stateNote.trashNotes.filter(
        (item) => item.id !== actionNote.payload
      );

      return {
        ...stateNote,
        singleNote: stateNote.allNotes[0],
        trashNotes: temppTrash,
      };

    default:
      return stateNote;
  }
};
