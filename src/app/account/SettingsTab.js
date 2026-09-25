"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { updateUserSettings, setEmptyLinesCount } from "@/components/redux/slices/settingsSliceReducer";
import { useAuth } from "@/components/Auth/AuthProvider";

const SettingsTab = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  
  // Use the value from Redux store, which should have been loaded by fetchUserSettings
  const currentCount = useSelector((state) => state.settings?.emptyLinesCount ?? 3);
  const [draftCount, setDraftCount] = useState(currentCount);

  // Sync draftCount with Redux state (in case it finishes loading after initial render)
  useEffect(() => {
    setDraftCount(currentCount);
  }, [currentCount]);

  const handleChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) {
      val = 1;
    }
    setDraftCount(val);
    
    // Optimistically update the store
    dispatch(setEmptyLinesCount(val));
    
    // Update the database if the user is authenticated
    if (user) {
      dispatch(updateUserSettings({ userId: user.id, emptyLinesCount: val }));
    }
  };

  return (
    <div className="bg-glass rounded-3 p-3 text-white">
      <h3 className="mb-4 fs-5 text-white">Налаштування генерації</h3>
      <Form.Group className="mb-3 d-flex flex-column" style={{ maxWidth: "300px" }}>
        <Form.Label>
          Кількість пустих рядків між протоколами (мінімум 1)
        </Form.Label>
        <Form.Control
          type="number"
          min="1"
          value={draftCount}
          onChange={handleChange}
          className="mt-2"
        />
      </Form.Group>
    </div>
  );
};

export default SettingsTab;
