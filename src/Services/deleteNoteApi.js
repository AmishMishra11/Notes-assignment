import axios from "axios";

export const deleteNote = async (dispatchNotes, noteId) => {
  try {
    // eslint-disable-next-line
    const res = await axios({
      method: "DELETE",
      url: "https://clientellnotes.azurewebsites.net/api/v1/delete/notes/",
      data: { note_id: noteId },
    });

    // console.log(res);
  } catch (e) {
    console.log("error occured: ", e);
  }
};
