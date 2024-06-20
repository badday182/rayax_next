import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { deleteImagineOptions } from "./redux/slices/newZoneSlise";
import { resetDescriptionOnly } from "./redux/slices/descriptionOnlyReducer";
import { AiTwotoneDelete } from "react-icons/ai";
function DeleteButton({ variant, onClick, id }) {
  const dispatch = useDispatch();
  // const state = useSelector((state) => state.creatingZones.zoneCounter);

  return (
    <>
      <Button
        title="Видалити протокол із поточної анкети пацієнта, не видаляє протокол із текстового редактора"
        className="backgroundWhite"
        variant={variant}
        // onClick={() => onClick(id)}
        onClick={() => {
          dispatch(deleteImagineOptions({ id }));
          dispatch(resetDescriptionOnly()); // сброс стейта для описания без шапки
        }}
      >
        Видалити протокол <AiTwotoneDelete size={18} />
      </Button>{" "}
    </>
  );
}

export default DeleteButton;
