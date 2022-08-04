import axios from "axios";

export const editNote = async (dispatchNotes, NewNote) => {
  const { id, title, content } = NewNote;
  try {
    const res = await axios({
      method: "PATCH",
      url: "https://clientellnotes.azurewebsites.net/api/v1/update/notes/",
      data: {
        note_id: id,
        title: title,
        content: content,
      },
    });

    dispatchNotes({ type: "SET_NOTE", payload: res.data });
  } catch (e) {
    console.log("error occured: ", e);
  }
};
