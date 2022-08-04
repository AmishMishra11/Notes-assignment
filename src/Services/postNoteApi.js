import axios from "axios";

export const postNote = async (dispatchNotes, NewNote) => {
  try {
    const res = await axios({
      method: "POST",
      url: "https://clientellnotes.azurewebsites.net/api/v1/post/notes/",
      data: { ...NewNote },
    });

    dispatchNotes({ type: "ADD_NOTE", payload: res.data });
  } catch (e) {
    console.log("error occured: ", e);
  }
};
