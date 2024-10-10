import { useDispatch } from "react-redux";
import { addTextFromEditor } from "../redux/slices/documentSliseReducer";
import { VscClearAll } from "react-icons/vsc";

const ButtonEditorCleaner = ({title}) => {
  const dispatch = useDispatch();
  const handleClearEditor = () => {
    const isConfirmed = window.confirm(
      "Ви впевнені, що хочете очистити редактор? Всі ваші описи НАЗАВЖДИ видаляться, вороття не буде"
    );
    if (isConfirmed) {
      dispatch(addTextFromEditor("")); // Обнуляет текстовый редактор
      localStorage.removeItem('textToDoc'); // Обнуляет localStorage
    }
  };
  return (
    <button
      type="button"
      className="btn btn-danger btn-sm d-ruby mr-1"
      onClick={handleClearEditor}
    >
      {title}
      <VscClearAll className="ml-1" size={18} />
    </button>
  );
};
export default ButtonEditorCleaner;
