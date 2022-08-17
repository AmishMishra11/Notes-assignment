import { default as React, useEffect, useRef } from "react";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import TextVariantTune from "@editorjs/text-variant-tune";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";

import { editNote } from "../../Services/editNoteApi";
import { useNotes } from "../../Context/NotesContext";

import styled from "@emotion/styled";

const EditorContainer = styled.div({
  width: "100%",
  maxHeight: "90%",

  fontFamily: "'Inter', sans-serif",
  textAlign: "left",

  "& .ce-toolbar__actions": {
    position: "absolute",
    left: "-55px",
  },
});

const EditorMain = styled.div({
  // overflow: "scroll",
  // height: "10rem",
});

const EDITTOR_HOLDER_ID = "editorjs";

const Editor = ({ content, id }) => {
  const { stateNotes, dispatchNotes } = useNotes();
  const { singleNote } = stateNotes;

  const ejInstance = useRef();
  useEffect(() => {
    if (!ejInstance?.current) {
      initEditor();
    }
    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, [id]);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      // logLevel: "ERROR",
      data: content,

      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        try {
          const savedData = await editor.save();
          console.log("saved", savedData);
          bodyChangeHandler(savedData);
        } catch (error) {
          console.log("failed", error);
        }
      },
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [2, 3, 4],
            defaultLevel: 3,
          },
        },

        textVariant: TextVariantTune,

        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },

        Marker: {
          class: Marker,
          // shortcut: "CMD+SHIFT+M",
        },

        underline: Underline,
      },

      tunes: ["textVariant"],
    });
  };

  const bodyChangeHandler = (newBody) => {
    const newSingleNote = { ...singleNote, content: newBody };

    editNote(dispatchNotes, newSingleNote);
  };

  return (
    <EditorContainer>
      <EditorMain id={EDITTOR_HOLDER_ID}> </EditorMain>
    </EditorContainer>
  );
};

export default Editor;
