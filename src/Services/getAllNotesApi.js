import axios from "axios";

export const getAllNotes = async (dispatchNotes) => {
  try {
    const res = await axios({
      method: "GET",
      url: "https://clientellnotes.azurewebsites.net/api/v1/get/notes/",
    });

    dispatchNotes({ type: "LOAD_ALL_NOTES", payload: res.data.results });
  } catch (e) {
    console.log("error occured: ", e);
  }
};
