import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { addDocText } from "./redux/slices/documentSliseReducer";

function ApplyZonesButton() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.creatingDocument.documentText);

  return (
    <>
      <Button
        variant="success"
        className="me-2"
        onClick={() => {
          dispatch(addDocText('Легені та серце без змін'));
          // console.log(state)
        }}
      >
        Apply
      </Button>{" "}
    </>
  );
}

export default ApplyZonesButton;
