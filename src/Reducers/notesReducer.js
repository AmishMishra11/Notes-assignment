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
        item.id === actionNote.payload.root_note.id
          ? actionNote.payload.root_note
          : item
      );

      return {
        ...stateNote,
        singleNote: actionNote.payload.updated_note,
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
        singleNote: stateNote.allNotes[0],
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
      const allNotes = [...stateNote.allNotes, actionNote.payload.root_note];

      return {
        ...stateNote,
        singleNote: actionNote.payload.created_note,
        allNotes,
      };

    case "ADD_CHILD_NOTE":
      const newAllNotesWithChild = stateNote.allNotes.map((item) =>
        item.id === actionNote.payload.root_note.id
          ? actionNote.payload.root_note
          : item
      );

      return {
        ...stateNote,
        allNotes: newAllNotesWithChild,
        singleNote: actionNote.payload.created_note,
      };

    default:
      return stateNote;
  }
};
