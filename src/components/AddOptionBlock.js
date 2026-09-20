import { useState } from "react";
import { FormFloatingSelect, fieldKeyByArray } from "./FloatingLabel";
import { Button, Form, Modal } from "react-bootstrap";
import { PiPencilSimpleLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "./Auth/AuthProvider";
import { addCustomOption } from "./redux/slices/customOptionsSliceReducer";
import { svoiVaryant } from "../data/svoiVaryant";

export const AddOptionBlock = ({
  items,
  onZoneSelect,
  label,
  counter,
  onAddClick,
  onDeleteClick,
}) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const customOptionsByKey = useSelector((state) => state.customOptions.byKey);
  const [newValue, setNewValue] = useState("");
  const [showAddOptionModal, setShowAddOptionModal] = useState(false);

  const fieldKey = fieldKeyByArray.get(items);
  const customOptions = fieldKey ? customOptionsByKey[fieldKey] ?? [] : [];
  // Кастомні варіанти йдуть одразу після першого (дефолтного) пункту —
  // items[0] не можна зсувати, він використовується як sentinel в іншій логіці.
  const mergedItems = customOptions.length
    ? [items[0], ...customOptions, ...items.slice(1)]
    : items;

  const handleSaveCustomOption = () => {
    const value = newValue.trim();
    if (!value || !fieldKey || !user) return;
    if (value.toLowerCase().includes(svoiVaryant.toLowerCase())) return;
    dispatch(addCustomOption({ userId: user.id, fieldKey, value }));
    setNewValue("");
    setShowAddOptionModal(false);
  };

  return (
    <div className="b1">
      <div className="mb-2 w-100">
        {counter.map((option) => (
          <div key={option.id} className="itemZones addOption">
            <FormFloatingSelect
              key={option.id}
              id={option.id}
              items={mergedItems}
              customValues={customOptions}
              onZoneSelect={onZoneSelect}
              label={label}
            />
            <button
              type="button"
              className="btn btn-outline-danger mb-2 zoneAddButton"
              title="Видалити опцію"
              onClick={() => onDeleteClick(option.id)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
      <div className="d-flex flex-wrap align-items-center gap-2">
        <Button variant="primary" className="mb-1" onClick={onAddClick}>
          Додати {label.toLowerCase()}
        </Button>

        {fieldKey && user && (
          <Button
            variant="outline-light"
            size="sm"
            className="mb-1 d-inline-flex align-items-center"
            onClick={() => setShowAddOptionModal(true)}
          >
            <PiPencilSimpleLight className="me-1" size={16} />
            Додати свій варіант
          </Button>
        )}
      </div>

      {fieldKey && user && (
        <>
          <Modal
            show={showAddOptionModal}
            onHide={() => setShowAddOptionModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="fs-6">
                Введіть свою додаткову опцію для «{label}»
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                placeholder={`Свій варіант для "${label}"`}
                value={newValue}
                autoFocus
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSaveCustomOption();
                  }
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                className="btn-save-custom-option"
                disabled={!newValue.trim()}
                onClick={handleSaveCustomOption}
              >
                Зберегти
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};
