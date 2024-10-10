import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { editExamNumber } from "../redux/slices/pacientInfoSliseReducer";
import { useRef } from "react";
import { PacientInfoPattern } from "../../patternsText/pacientInfoPattern";
import { renderToString } from "react-dom/server";


function ApplyPacientInfoButton() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.pacientInfo.examNumber);
  const pacientInfo = renderToString(PacientInfoPattern())
  const editorRef = useRef();

  return (
    <>
      <Button
        variant="success"
        className="me-2"
        onClick={() => {
          // dispatch(editExamNumber({state}));
          // dispatch(editExamNumber('123'));
          // console.log(state)
          // editorRef.current.setContent(pacientInfo);
        }}
      >
        Apply
      </Button>{" "}
    </>
  );
}

export default ApplyPacientInfoButton;
