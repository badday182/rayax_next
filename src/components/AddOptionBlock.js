import { useState } from "react";
import { FormFloatingSelect, fieldKeyByArray } from "./FloatingLabel";
import { Button, Form, InputGroup } from "react-bootstrap";
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
      <Button
        variant="btn btn-primary w-75 mb-1"
        className=""
        onClick={onAddClick}
      >
        Додати {label.toLowerCase()}
      </Button>{" "}

      {fieldKey && user && (
        <InputGroup className="mt-2 mb-2" size="sm">
          <Form.Control
            placeholder={`Свій варіант для "${label}"`}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSaveCustomOption();
              }
            }}
          />
          <Button variant="outline-success" onClick={handleSaveCustomOption}>
            Зберегти
          </Button>
        </InputGroup>
      )}
    </div>
  );
};
