import React, { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import './styles.css';

export const TextEditor = (): React.ReactElement => {
  const isQuillInitialized = useRef(false);
  const TEXT_EDITOR_ID = "text-editor";

  useEffect(() => {
    if (isQuillInitialized.current) {
      // With this if else block we are making sure that the quill editor is only initialized once.
      // We do not need to perform any operation in this block if the quill editor is already initialized.
    } else {
      new Quill(`#${TEXT_EDITOR_ID}`, { theme: "snow" });
      isQuillInitialized.current = true;
    }
    return () => {
      // This is the cleanup function that will be called when the component is unmounted.
      // We can perform any cleanup operation here.
    };
  }, []);

  return (
    <div
      id={TEXT_EDITOR_ID}
      // style={{ border: 0, display: "flex", justifyContent: "center" }}
      className="container"
    ></div>
  );
};
