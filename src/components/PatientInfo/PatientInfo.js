'use client'
import { useState, useEffect, useRef } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ApplyPacientInfoButton from "../applyPacientInfoButton";
import { useSelector, useDispatch } from "react-redux";
import { renderToString } from "react-dom/server";

import Button from "react-bootstrap/Button";

import {
  editExamNumber,
  editExamDate,
  editExamName,
  editExamBirthYear,
  resetPacientInfoSliseReducer,
} from "../redux/slices/pacientInfoSliseReducer";

import { PacientInfoPattern } from "../../patternsText/pacientInfoPattern";
import dynamic from "next/dynamic";
const addDocText = dynamic(
  () => import("../redux/slices/documentSliseReducer"),
  { ssr: false }
)
// import { addDocText } from "../redux/slices/documentSliseReducer";
import { initialExamNumber } from "../../data/initialExamNumber";
import { applyPatientInfoBlock } from "../redux/slices/zoneInfoSliseReducer";
import { RiPlayListAddLine } from "react-icons/ri";
import "./patientInfo.css"
// function PacientInfo() {
const PatientInfo = ({ editorContent }) => {
  const textToDoc = renderToString(PacientInfoPattern());

  const [acceptNotice, setAcceptNotice] = useState(null);
  // const [acceptNotice2, setAcceptNotice2] = useState(null);

  // useEffect(() => {
  //   dispatch(applyPatientInfoBlock(false));

  // }, []);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const applyPatienInfo = useSelector(
    (state) => state.zoneInfo.applyPatienInfo
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (applyPatienInfo) {
      setAcceptNotice(<div className="overlay"></div>);
    }
  }, [applyPatienInfo]);
  const textFromEditor = useSelector(
    (state) => state.creatingDocument.documentText
  );

  const handleApplyPatientButtonClick = () => {
    editorContent();
    // console.log('textFromEditor',textFromEditor);
    dispatch(addDocText({ textToDoc }));

    setAcceptNotice(
      <div className="overlay">
        {/* <h1>Інформація про пацієнта успішно збережена</h1> */}
      </div>
    );
    dispatch(resetPacientInfoSliseReducer());
    setButtonDisabled(true); // Устанавливаем disabled в true после нажатия кнопки

    //предыдущий раз вводили число? задаем автоматику для номера следующего исследования
    if (examState !== initialExamNumber) {
      dispatch(editExamNumber(+examState + 1));
    }
    // Копируем текст с редактора с новым текстом в буфер обмена
    localStorage.setItem("textToDoc", textFromEditor + textToDoc);
  };

  // Значение по умолчанию - сегодняшняя дата
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  //  Обработчик для поля "Дата"
  const handleDateChange = (e) => {
    const inputValue = e.target.value;
    setSelectedDate(inputValue);
    const formattedDate = inputValue.split("-").reverse().join(".");
    dispatch(editExamDate(formattedDate));

    return selectedDate;
  };
  let initialExamDefaultValue = "№ дослідження";
  const examState = useSelector((state) => state.pacientInfo.examNumber);
  if (examState !== initialExamNumber) {
    initialExamDefaultValue = +examState;
  }

  const [naprav, setNaprav] = useState(null);
  // const napravState = useSelector((state) => state.pacientInfo.examNumber);
  const handleNapravChange = (e) => {
    // Регулярное выражение для разрешенных символов (цифры, точка, слеш)
    const inputValue = e.target.value;
    const pattern = /^[0-9\/]+$/;

    if (!pattern.test(inputValue)) {
      e.target.value = inputValue.slice(0, -1); // Удаляем последний недопустимый символ
      dispatch(editExamNumber(e.target.value));
      setNaprav(e.target.value);
    } else {
      dispatch(editExamNumber(inputValue));
      setNaprav(inputValue);
    }
  };

  const [name, setName] = useState();
  const handleNameChange = (e) => {
    const inputValue = e.target.value;

    // Регулярное выражение для разрешенных символов (украинские буквы и символы)
    const pattern = /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ'\s,\.]+$/u;
    if (!pattern.test(inputValue)) {
      e.target.value = inputValue.slice(0, -1); // Удаляем последний недопустимый символ
      dispatch(editExamName(e.target.value));
      setName(e.target.value);
    } else {
      dispatch(editExamName(inputValue));
      setName(inputValue);
    }
  };

  // Обработчик для поля "Рік народження", чтобы ограничить ввод 4 цифрами

  const [birthYear, setBirthYear] = useState();
  const handleBirthYearChange = (e) => {
    const inputValue = e.target.value;
    // Регулярное выражение для разрешенных символов (цифры, не более 4)
    const pattern = /^\d{0,4}$/;

    if (!pattern.test(inputValue)) {
      e.target.value = inputValue.slice(0, 4); // Ограничиваем ввод до 4 цифр
      dispatch(editExamBirthYear(e.target.value));
      setBirthYear(e.target.value);
    } else {
      dispatch(editExamBirthYear(inputValue));
      setBirthYear(inputValue);
    }
  };
  return (
    // <div className="p-3 form-container mb-4 bg-light bg-gradient rounded-3 text-dark border border-secondary">
    <div className="p-3 form-container mb-4 rounded-3 text-dark border border-light-subtle bg-glass">
      {acceptNotice}
      <div>
        <Form className=" mb-3  text-light fw400">
          <Row className="mb-2">
            <Form.Group as={Col} controlId="date">
              <Form.Label>Дата дос-ня</Form.Label>
              <Form.Control
                className="numeric"
                // placeholder="Дата дослідження"
                type="date"
                defaultValue={selectedDate}
                // onChange={(date) => setSelectedDate(date)}
                onChange={handleDateChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="imagine">
              <Form.Label>№ дос-ня</Form.Label>
              <Form.Control
                className="numeric"
                // {initialExamDefaultValue != '' ? {}}
                // placeholder="№ дослідження"
                placeholder={initialExamDefaultValue}
                type="number"
                // defaultValue={naprav}
                onChange={handleNapravChange}
                value={initialExamDefaultValue}
              />
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} controlId="pacientName">
              <Form.Label>П.І.Б пацiента</Form.Label>
              <Form.Control
                placeholder="П.І.Б"
                type="text"
                onChange={handleNameChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="birthYear">
              <Form.Label>Рік народження</Form.Label>
              <Form.Control
                className="numeric"
                placeholder="Рік народження"
                type="number"
                onChange={handleBirthYearChange}
              />
            </Form.Group>
          </Row>

          {/* <ApplyPacientInfoButton /> */}
        </Form>
      </div>
      <Button
        title="Надіслати інформацію до Редактора"
        variant="success"
        className="me-2 d-ruby"
        onClick={handleApplyPatientButtonClick}
        disabled={buttonDisabled}
      >
            Додати <RiPlayListAddLine size={18}/>
      </Button>{" "}
    </div>
  );
};

export default PatientInfo;
