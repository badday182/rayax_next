'use client'


import Banner from "@/components/Banner/Banner.jsx";
import ButtonEditorCleaner from "@/components/Button_EditorCleaner/Button_EditorCleaner.js";

export default function Home() {

  return (
    <div className="conteinerWidht d-flex justify-content-center flex-wrap p-3">
      <Banner />
      <div className="pacientBlock mb-4 mx-4">
        {/* {patientState.map((option) => (
          <PacientCard
            editorContent={editorContent}
            key={option.id}
            id={option.id}
          />
        ))} */}

        <ButtonEditorCleaner title="Очистити редактор" />
      </div>
      <p className="display-1">Hello</p>
    
    </div>
  );
}
