'use client'
import React, { useState } from "react";
import { FormFloatingSelect } from "./FloatingLabel";
import DeleteButton from "./deleteButton";
import AddZoneButton from "./addZoneButton";
import { zones } from "../data/zones";
import { zonesWithSides } from "../data/zonesWithSides";
import { sides } from "../data/sides";
import { plechKulshSuglobViews } from "../data/plechovuyKulshovuySuglobViews";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  resetZoneInfoSliseReducer,
  applyPatientInfoBlock,
  resetZoneInfoSliseReducerExceptZone,
} from "./redux/slices/zoneInfoSliseReducer";
import {
  resetogkSliseReducer,
} from "./redux/slices/ogkSliseReducer";

import { resetCherepSliseReducer } from "./redux/slices/cherepSliseReducer";
import { resetPpnSliseReducer } from "./redux/slices/ppnSliseReducer";
import { resetUniversalSliceReducer } from "./redux/slices/universalSliceReducer";


import {
  addDocText,
  doubleAddPatientAndZoneDocText,
} from "./redux/slices/documentSliseReducer";

import { renderToString } from "react-dom/server";
import { ZoneInfoPattern } from "../patternsText/zoneInfoPattern";

import { Ogk } from "./Ogk";
import { Cherep } from "./Cherep";
import { Ppn } from "./Ppn";
import { Shvh } from "./Shvh";
import { Gvh } from "./Gvh";
import { Pvh } from "./Pvh";
import { Ochp } from "./Ochp";
import { PlechovyiSuhlob } from "./PlechovyiSuhlob";
import { Kliuchytsia } from "./Kliuchytsia";
import { Rebra } from "./Rebra";
import { LiktovyiSuhlob } from "./LiktovyiSuhlob";
import { PromenevoZapIastkovyiSuhlob } from "./PromenevoZapIastkovyiSuhlob";
import { Kyst } from "./Kyst";
import { KistokTazu } from "./KistokTazu";
import { KulshovyiSuhlob } from "./KulshovyiSuhlob";
import { KolinnyiSuhlob } from "./KolinnyiSuhlob";
import { HomilkovoStopnyiSuhlob } from "./HomilkovoStopnyiSuhlob";
import { Stopa } from "./Stopa";
import { PeredniViddilyStopy } from "./PeredniViddilyStopy";
import { PacientInfoPattern } from "../patternsText/pacientInfoPattern";
import {
  editExamNumber,
  resetPacientInfoSliseReducer,
} from "./redux/slices/pacientInfoSliseReducer";
import { initialPatientName } from "../data/initialPatientName";
import { initialPatientBirthYear } from "../data/initialPatientBirthYear";
import { initialExamNumber } from "../data/initialExamNumber";
import { AddZoneDescriptionOnlyButton } from "./AddZoneDescriptionOnlyButton";
import { RiPlayListAddLine } from "react-icons/ri";

const ImagineOptions = ({ id, editorContent, descriptionOnly = false }) => {
  const zoneState = useSelector((state) => state.zoneInfo.zone); //"ОГК" Defoult

  // const [selectedZone, setSelectedZone] = useState("ОГК");
  const [selectedZone, setSelectedZone] = useState(zoneState);


   const [selectedSide, setSelectedSide] = useState("Справа");
  const [selectedOgkViews, setSelectedOgkViews] = useState("Оглядова");
  const [selectedplechKulshSuglobViews, setSelectedplechKulshSuglobViews] =
    useState("Пряма");
  const [selectednormaNenorma, setSelectednormaNenorma] = useState("Норма");
  const [addintoEditorButtonDisabled, setAddintoEditorButtonDisabled] =
    useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [descriptionOnlyButtonDisabled, setDescriptionOnlyButtonDisabled] =
    useState(true);


  const zoneWithSides = zonesWithSides.includes(selectedZone) ? true : false;

  const dispatch = useDispatch();


  // // Текст с эдитора
  // const textFromEditor = useSelector(
  //   (state) => state.creatingDocument.documentText
  // );

  const textToDocPacientInfo = renderToString(PacientInfoPattern());
  let textToDoc = renderToString(ZoneInfoPattern(descriptionOnly));

  // if (descriptionOnly) {
  //   // textToDoc = renderToString(ZoneInfoPatternDescriptionOnly());
  //   textToDoc = renderToString(ZoneInfoPattern(descriptionOnly));
  // }
  const existPatientName = useSelector((state) => state.pacientInfo.examName);
  const existPatientBirthYear = useSelector(
    (state) => state.pacientInfo.examBirthYear
  );

  const isPatientInfoExist =
    (existPatientName !== initialPatientName) &
    (existPatientBirthYear !== initialPatientBirthYear);
  const examState = useSelector((state) => state.pacientInfo.examNumber);

  const [acceptNotice, setAcceptNotice] = useState(null);

  const handleApplyZone = () => {
    editorContent();

    if (descriptionOnly) {
      dispatch(addDocText({ textToDoc }));
      setButtonDisabled(true); // Устанавливаем disabled в true после нажатия кнопки
    } else {
      //дублируем функционал из PacientInfo + добавляем зону в эдитор
      if (isPatientInfoExist !== 0) {
        dispatch(
          doubleAddPatientAndZoneDocText({ textToDocPacientInfo, textToDoc })
        );
        dispatch(resetPacientInfoSliseReducer());
        dispatch(applyPatientInfoBlock(true));

        if (examState !== initialExamNumber) {
          dispatch(editExamNumber(+examState + 1));
        }
      } else {
        dispatch(addDocText({ textToDoc }));
      }

      setAddintoEditorButtonDisabled(true);
      // setDescriptionOnlyButtonDisabled(disabled)

      // Копируем текст с редактора с новым текстом в буфер обмена
      localStorage.setItem("textToDoc", textFromEditor + textToDoc);
    }

    // Сбрасываем данные в редюсерах
    dispatch(resetPacientInfoSliseReducer());
    dispatch(resetZoneInfoSliseReducerExceptZone()); //сброс всех параметров кроме zone
    dispatch(resetogkSliseReducer());
    dispatch(resetCherepSliseReducer());
    dispatch(resetPpnSliseReducer());
    dispatch(resetUniversalSliceReducer());
    setAcceptNotice(<div className="overlay"></div>);
  };

  // Текст с эдитора
  const textFromEditor = useSelector(
    (state) => state.creatingDocument.documentText
  );

  return (
    <div
      className={`mb-4 p-3 rounded-3 text-dark border ${
        descriptionOnly ? "border-info border-3" : "border-light-subtle"
      } bg-2ndglass`}
    >
      {descriptionOnly && <h5 className="text-white fst-italic fw-light fs-5">Тільки опис зони "{selectedZone}"</h5>}
      <div className="imagineOptions">
        {acceptNotice}

        {!descriptionOnly && (
          <FormFloatingSelect
            id="zone"
            items={zones}
            onZoneSelect={setSelectedZone}
            label="Зона дослідження"
          />
        )}
        {zoneWithSides && !descriptionOnly && (
          <FormFloatingSelect
            items={sides}
            onZoneSelect={setSelectedSide}
            label="Сторона"
          />
        )}

        {selectedZone === "ОГК" ? <Ogk descriptionOnly={descriptionOnly}/> : null}
        {selectedZone === "Череп" ? <Cherep /> : null}
        {selectedZone === "ППН" ? <Ppn /> : null}
        {selectedZone === "ШВХ" ? <Shvh /> : null}
        {selectedZone === "ГВХ" ? <Gvh /> : null}
        {selectedZone === "ПВХ" ? <Pvh /> : null}
        {selectedZone === "ОЧП" ? <Ochp /> : null}
        {selectedZone === "Плечовий суглоб" ? <PlechovyiSuhlob /> : null}
        {selectedZone === "Ключиця" ? <Kliuchytsia /> : null}
        {selectedZone === "Ребра" ? <Rebra /> : null}
        {selectedZone === "Ліктьовий суглоб" ? <LiktovyiSuhlob /> : null}
        {selectedZone === "Променево-зап'ястковий суглоб" ? (
          <PromenevoZapIastkovyiSuhlob />
        ) : null}
        {selectedZone === "Кисть" ? <Kyst /> : null}
        {selectedZone === "Кісток тазу" ? <KistokTazu /> : null}
        {selectedZone === "Кульшовий суглоб" ? <KulshovyiSuhlob /> : null}
        {selectedZone === "Колінний суглоб" ? <KolinnyiSuhlob /> : null}
        {selectedZone === "Гомілковостопний суглоб" ? (
          <HomilkovoStopnyiSuhlob />
        ) : null}
        {selectedZone === "Стопа" ? <Stopa /> : null}
        {selectedZone === "Передні відділи стопи" ? (
          <PeredniViddilyStopy />
        ) : null}

        {selectedZone === "Кульшовий суглоб" && !descriptionOnly ||
        selectedZone === "Плечовий суглоб" && !descriptionOnly ? (
          <FormFloatingSelect
            items={plechKulshSuglobViews}
            onZoneSelect={setSelectedplechKulshSuglobViews}
            label="Проекція"
          />
               ) : null}
      </div>

      <div
        className={`d-flex justify-content-between zonesButtons flex-wrap ${
          descriptionOnly && "flex-wrap"
        }`}
      >
        <div>
          <Button
            title="Надіслати інформацію до Редактора"
            variant="success"
            // className="me-0 mt-2 mb-2"
            className={`${descriptionOnly ? "me-2 d-ruby" : "me-0 mt-2 mb-2 d-ruby"}`}
            onClick={() => {
              setDescriptionOnlyButtonDisabled(false);
              handleApplyZone();
              if (descriptionOnly) {
                // Копируем текст с редактора с новым текстом в буфер обмена
                localStorage.setItem("textToDoc", textFromEditor + textToDoc);
              }
            }}
            disabled={
              descriptionOnly ? buttonDisabled : addintoEditorButtonDisabled
            }
          >
            Додати <RiPlayListAddLine size={18} />
          </Button>{" "}
          {!descriptionOnly ? (
            <>
            <AddZoneButton
              className="me-0 mt-2 mb-2"
              variant="success"
              onAddOptions={() => {
                handleApplyZone();
                dispatch(resetZoneInfoSliseReducer());
              }}
              setDescriptionOnlyButtonTrue={() => {
                setDescriptionOnlyButtonDisabled(true);
                dispatch(resetZoneInfoSliseReducer());
              }}
              addintoEditorButtonDisabled={addintoEditorButtonDisabled}
            />            
          <AddZoneDescriptionOnlyButton
            variant="outline-info"
            descriptionOnlyButtonDisabled={descriptionOnlyButtonDisabled}
          />
            </>
          ) : (
            <AddZoneDescriptionOnlyButton
            title="Add Description"
            variant="outline-info"
            descriptionOnlyButtonDisabled={descriptionOnlyButtonDisabled}
            // onAddOptions={onAddOptions}
          />
          )}
        </div>
        {!descriptionOnly && <DeleteButton
          className="me-0 mt-2 mb-2"
          variant="outline-danger"
          id={id}
        />}        
      </div>
    </div>
  );
};
export default ImagineOptions;