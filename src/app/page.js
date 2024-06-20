'use client'

import { useState } from "react";
import { renderToString } from "react-dom/server";
import Banner from "@/components/Banner/Banner.jsx";
import ButtonEditorCleaner from "@/components/Button_EditorCleaner/Button_EditorCleaner.js";
import { useDispatch, useSelector } from "react-redux";
import { PacientCard } from "@/components/PacientCard.js";
import TextEditor from "@/components/TextEditor/TextEditor.js";
import { addTextFromEditor } from "@/components/redux/slices/documentSliseReducer.js";
import { PacientInfoPattern } from "@/patternsText/pacientInfoPattern.js";

export default function Home() {
  const dispatch = useDispatch();

  const patientState = useSelector(
    (state) => state.creatingPatient.patientCounter
  );
  const docTex = useSelector((state) => state.creatingDocument.documentText);
  const editorContent = () => {
    const content = editorRef.current.getContent(); //takes text from editor
    dispatch(addTextFromEditor(content));
  };
  const [editorRef, setEditorRef] = useState(null);

  const pacientInfo = renderToString(PacientInfoPattern());

  return (
    <div className="conteinerWidht d-flex justify-content-center flex-wrap p-3">
      {/* <Banner /> */}
      <div className="pacientBlock mb-4 mx-4">
        {patientState.map((option) => (
          <PacientCard
            editorContent={editorContent}
            key={option.id}
            id={option.id}
          />
        ))}

        <ButtonEditorCleaner title="Очистити редактор" />
      </div>
      <>

        <TextEditor docTex={docTex} setEditorRef={setEditorRef} />
      </>

    </div>
  );
}
