import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ docTex, setEditorRef }) => {
  const editorRef = useRef();

  {
    /*This code means that the callback function in useEffect 
    will be called only once after the component is mounted
    (or on the initial rendering), because the dependency array is empty `[]`.
After that, the value of `editorRef` will be set and will not change
within this effect anymore.
*/
  }

  useEffect(() => {
    setEditorRef(editorRef);
  }, []);

  const scrollToBottom = (editor) => {
    const body = editor.getBody();
    const lastChild = body.lastChild;
    if (lastChild) {
      lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <Editor
      apiKey="62kbbg7407jjlea01hu71w9axyixiyxitsr8wtho4lnck72p"
      onInit={(_evt, editor) => {
        editorRef.current = editor;
        scrollToBottom(editor);
      }}
      initialValue={docTex}
      init={{
        selector: "#myTextarea",
        browser_spellcheck: true,
        spellchecker_language: "uk",
        contextmenu: true,
        language: "uk",
        height: 650,
        width: 700,
        content_css: "/src/tineContent.css",

        setup: function (editor) {
          editor.on("NodeChange", function () {
            scrollToBottom(editor);
          });
        },
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "pagebreak",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
        ],
        toolbar:
          "print | pagebreak | " +
          " undo redo | blocks | " +
          "bold italic forecolor | ",
        content_style:
          "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; padding: 1rem;}  table { width: 100%; border-collapse: collapse; border: 2px solid white; border-color: white; } tbody, th, tr, td { border: 2px solid white; border-color: white; border-style: solid; } td {padding: 0.4rem;} h1,h2,h3,h4,h5,h6 {margin: 5px 5px;} ",
      }}
    />
  );
};
export default TextEditor;
