'use client'
import React, { useState, useRef } from "react";
import { renderToString } from "react-dom/server";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import dynamic from "next/dynamic";
const PatientInfo = dynamic(
  () => import("./PatientInfo/PatientInfo.js"),
  { ssr: false }
)
// import PatientInfo from "./PatientInfo/PatientInfo";
import Button from "react-bootstrap/Button";

const ImagineOptions = dynamic(
  // () => import("./ImagineOptions"),
  () => import("./ImagineOptions.js"),
  { ssr: false }
)
// import ImagineOptions from "./ImagineOptions";


import {
  resetPatient,
} from "./redux/slices/newPatientSliseReducer";
import {
  resetDescriptionOnly,
  resetImagineOptions,
} from "./redux/slices/newZoneSlise";
import {
  resetApplyPatientInfoBlock,
  resetZoneInfoSliseReducer,
} from "./redux/slices/zoneInfoSliseReducer";
import { resetogkSliseReducer } from "./redux/slices/ogkSliseReducer";
import { resetUniversalSliceReducer } from "./redux/slices/universalSliceReducer";
import { PiUserPlusLight } from "react-icons/pi";

const PacientCard = ({ id, editorContent }) => {
  const dispatch = useDispatch();
  const zoneState = useSelector((state) => state.creatingZones.zoneCounter);
  const descriptionOnlyState = useSelector(
    (state) => state.creatingZones.zoneDescriptionOnlyCounter
  );
  const DescriptionId = uuidv4();

  // const imagineOptionsRef = useRef();
  const textFromEditor = useSelector(
    (state) => state.creatingDocument.documentText
  );

  return (
    <div className=" rounded-3 border p-3 pacientCard mb-3">
      <PatientInfo editorContent={editorContent} />
      {zoneState.map((option) => (
        <ImagineOptions
          editorContent={editorContent}
          key={option.id}
          id={option.id}
        />
      ))}
      {descriptionOnlyState.map((option) => (
        <ImagineOptions
          editorContent={editorContent}
          key={option.id}
          id={option.id}
          descriptionOnly={true}
        />
    
      ))}
   
      <div className="d-flex justify-content-between zonesButtons">
        <Button
          title="Створити нову анкету для опису протоколу дослідження нового пацієнта"
          // variant="success"
          className="w-100 p-2 glass-button d-ruby"
          onClick={() => {
            editorContent();
            const newPatient = {
              id: uuidv4(),
            };
            // Копируем текст с редактора с новым текстом в буфер обмена
            localStorage.setItem("textToDoc", textFromEditor);

            // dispatch(addTextFromEditor(editorContent()));
            dispatch(resetPatient()); // сброс и создание нового пацика
            dispatch(resetImagineOptions()); // сброс и создание новой зоны
            dispatch(resetApplyPatientInfoBlock()); //Сброс данных о заполнении инфо пациента
            // dispatch(resetDescriptionOnly()); // сброс стейта для описания без шапки
            // dispatch(addPatient(newPatient));

            // Сброс редюсеров
            dispatch(resetZoneInfoSliseReducer()); // сброс зоны исл-ия
            dispatch(resetUniversalSliceReducer()); // сброс универсвльного редюсера
            dispatch(resetogkSliseReducer()); // сброс ОГК
            dispatch(resetDescriptionOnly()); // сброс ТОЛЬКО_ОПИСАНИЯ
            // dispatch(resetDescriptionOnly()); // сброс редюсера только описания (без шапки)

          }}
        >
 Новий пацієнт <PiUserPlusLight className="mt--025rem" size={30}/>
        </Button>
        {/* <Button
          onClick={() => {
            editorContent();
          }}
        >
          Converter
        </Button> */}
        {/* <Button
          variant="outline-danger"
          className="backgroundWhite"
          onClick={() => {
            dispatch(deletePatient({ id }));
          }}
        >
          ❌ Remove Patient
        </Button> */}
      </div>
    </div>
  );
};
export default PacientCard;