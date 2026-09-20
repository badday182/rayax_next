import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PiPencilSimpleLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "./Auth/AuthProvider";
import { addNormTemplate } from "./redux/slices/normTemplatesSliceReducer";
import { svoiVaryant } from "../data/svoiVaryant";

// Кнопка + модалка для збереження власного шаблону "Норма/Не норма":
// на відміну від AddOptionBlock.js (одне текстове поле — значення дропдауна
// і є текстом висновку), тут заголовок (що показується в списку) і опис
// (повний текст, що піде у документ) — різні поля, тому окремий компонент.
export const AddNormTemplateButton = ({ zone }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!user) return null;

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    if (!trimmedTitle || !trimmedDescription) return;
    if (trimmedTitle.toLowerCase().includes(svoiVaryant.toLowerCase())) return;
    if (trimmedTitle === "Не норма") return;

    dispatch(
      addNormTemplate({
        userId: user.id,
        zone,
        title: trimmedTitle,
        description: trimmedDescription,
      })
    );
    setTitle("");
    setDescription("");
    setShow(false);
  };

  return (
    <>
      <Button
        variant="outline-light"
        size="sm"
        className="mb-1 d-inline-flex align-items-center"
        onClick={() => setShow(true)}
      >
        <PiPencilSimpleLight className="me-1" size={16} />
        Додати свою норму/не норму
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">
            Введіть свою додаткову норму/не норму для «{zone}»
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Заголовок (буде у списку)</Form.Label>
            <Form.Control
              placeholder={`Своя норма/не норма для "${zone}"`}
              value={title}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Опис (піде у документ)</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            className="btn-save-custom-option"
            disabled={!title.trim() || !description.trim()}
            onClick={handleSave}
          >
            Зберегти
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
