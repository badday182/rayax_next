import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addDescriptionOnly } from "../redux/slices/newZoneSlise";
import { TbPencilPlus } from "react-icons/tb";
export function AddZoneDescriptionOnlyButton({
  variant,
  descriptionOnlyButtonDisabled,
  // descriptionOnlyButtonDisabled2,
}) {
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!disabled) {
      // Добавлена проверка, чтобы избежать множественных кликов
      const newZoneid = { id: uuidv4() };
      dispatch(addDescriptionOnly(newZoneid));
      setDisabled(true); // Устанавливаем disabled в true после нажатия кнопки
    }
  };

  return (
    <>
      <Button
        title="Додати тільки опис, без шапки"
        className="backgroundWhite me-0 mt-2 mb-2 d-ruby"
        variant={variant}
        onClick={handleClick}
        disabled={descriptionOnlyButtonDisabled || disabled}
      >
        Додати опис <TbPencilPlus className="mt--025rem" size={18}/>
      </Button>{" "}
    </>
  );
}
