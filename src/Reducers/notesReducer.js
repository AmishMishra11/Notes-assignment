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
          { ...removedNote, is_trash: true },
        ],
      };

    case "RESTORE_NOTE":
      const newTrash = stateNote.trashNotes.filter(
        (item) => item.id !== actionNote.payload.id
      );

      return {
        ...stateNote,
        singleNote: stateNote.allNotes[0],
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

    case "ADD_NOTE":
      return {
        ...stateNote,
        allNotes: [...stateNote.allNotes, actionNote.payload],
        singleNote: actionNote.payload,
      };

    case "DUPLICATE_NOTE":
      const duplicateNote = {
        ...actionNote.payload,
        id: actionNote.payload.id + "1",
        title: actionNote.payload.title + " Copy",
      };

      return { ...stateNote, allNotes: [...stateNote.allNotes, duplicateNote] };

    default:
      return stateNote;
  }
};
