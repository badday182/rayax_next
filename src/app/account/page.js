"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useAuth } from "@/components/Auth/AuthProvider";
import AuthForm from "@/components/Auth/AuthForm";
import {
  updateCustomOption,
  deleteCustomOption,
} from "@/components/redux/slices/customOptionsSliceReducer";
import {
  updateNormTemplate,
  deleteNormTemplate,
} from "@/components/redux/slices/normTemplatesSliceReducer";
import { customizableFieldsCatalog } from "@/data/customizableFieldsCatalog";

const OptionRow = ({ userId, fieldKey, value }) => {
  const dispatch = useDispatch();
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const trimmed = draft.trim();
  const isUnchanged = trimmed === value;
  const isEmpty = !trimmed;

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      await dispatch(
        updateCustomOption({
          userId,
          fieldKey,
          oldValue: value,
          newValue: trimmed,
        })
      ).unwrap();
    } catch (e) {
      setError(e.message || String(e));
    }
    setSaving(false);
  };

  const handleDelete = () => {
    if (!window.confirm(`Видалити варіант "${value}"?`)) return;
    dispatch(deleteCustomOption({ userId, fieldKey, value }));
  };

  return (
    <div className="mb-2">
      <div className="option-row d-flex align-items-center gap-2">
        <Form.Control
          size="sm"
          className="option-row-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <div className="option-row-actions d-flex gap-2">
          <Button
            size="sm"
            variant="success"
            className="btn-save-custom-option flex-shrink-0"
            disabled={isEmpty || isUnchanged || saving}
            onClick={handleSave}
          >
            Зберегти
          </Button>
          <Button
            size="sm"
            variant="danger"
            className="btn-delete-custom-option flex-shrink-0"
            onClick={handleDelete}
          >
            Видалити
          </Button>
        </div>
      </div>
      {error && <div className="text-danger small mt-1">{error}</div>}
    </div>
  );
};

const NormTemplateRow = ({ userId, zone, title, description }) => {
  const dispatch = useDispatch();
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftDescription, setDraftDescription] = useState(description);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const trimmedTitle = draftTitle.trim();
  const trimmedDescription = draftDescription.trim();
  const isUnchanged =
    trimmedTitle === title && trimmedDescription === description;
  const isEmpty = !trimmedTitle || !trimmedDescription;

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      await dispatch(
        updateNormTemplate({
          userId,
          zone,
          oldTitle: title,
          newTitle: trimmedTitle,
          newDescription: trimmedDescription,
        })
      ).unwrap();
    } catch (e) {
      setError(e.message || String(e));
    }
    setSaving(false);
  };

  const handleDelete = () => {
    if (!window.confirm(`Видалити шаблон "${title}"?`)) return;
    dispatch(deleteNormTemplate({ userId, zone, title }));
  };

  return (
    <div className="mb-3">
      <Form.Group className="mb-2">
        <Form.Label className="small mb-1">Заголовок</Form.Label>
        <Form.Control
          size="sm"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label className="small mb-1">Опис</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          size="sm"
          value={draftDescription}
          onChange={(e) => setDraftDescription(e.target.value)}
        />
      </Form.Group>
      <div className="option-row d-flex align-items-center gap-2">
        <div className="option-row-actions d-flex gap-2">
          <Button
            size="sm"
            variant="success"
            className="btn-save-custom-option flex-shrink-0"
            disabled={isEmpty || isUnchanged || saving}
            onClick={handleSave}
          >
            Зберегти
          </Button>
          <Button
            size="sm"
            variant="danger"
            className="btn-delete-custom-option flex-shrink-0"
            onClick={handleDelete}
          >
            Видалити
          </Button>
        </div>
      </div>
      {error && <div className="text-danger small mt-1">{error}</div>}
    </div>
  );
};

const AccountPage = () => {
  const { user, loading } = useAuth();
  const byKey = useSelector((state) => state.customOptions.byKey);
  const byZone = useSelector((state) => state.normTemplates.byZone);
  const [showAuthForm, setShowAuthForm] = useState(false);

  const fieldsWithOptions = customizableFieldsCatalog.filter(
    (field) => (byKey[field.key]?.length ?? 0) > 0
  );
  const zonesWithTemplates = Object.keys(byZone).filter(
    (zone) => byZone[zone]?.length > 0
  );

  return (
    <div className="conteinerWidht p-3">
      <div className="mb-3">
        <Button as={Link} href="/" variant="outline-light" size="sm">
          ← На головну
        </Button>
      </div>

      <h2 className="text-white mb-3">Мої варіанти описів</h2>

      {!loading && !user && (
        <div className="bg-glass rounded-3 p-3 text-white">
          <p>Увійдіть, щоб побачити свої збережені варіанти.</p>
          <Button variant="outline-light" onClick={() => setShowAuthForm(true)}>
            Увійти
          </Button>
        </div>
      )}

      {user && fieldsWithOptions.length === 0 && (
        <div className="bg-glass rounded-3 p-3 text-white">
          Ви ще не додали жодного власного варіанту. Додайте його прямо в анкеті
          дослідження, натиснувши «Зберегти» біля потрібного поля.
        </div>
      )}

      {user &&
        fieldsWithOptions.map((field) => (
          <Card
            key={field.key}
            className="bg-glass text-white mb-3"
            style={{ minWidth: 0 }}
          >
            <Card.Body className="min-width-0">
              <Card.Title className="fs-6">
                {field.zone} — {field.label}
              </Card.Title>
              {byKey[field.key].map((value) => (
                <OptionRow
                  key={value}
                  userId={user.id}
                  fieldKey={field.key}
                  value={value}
                />
              ))}
            </Card.Body>
          </Card>
        ))}

      {user && zonesWithTemplates.length > 0 && (
        <>
          <h2 className="text-white mb-3 mt-4">Мої шаблони норми/не норми</h2>
          {zonesWithTemplates.map((zone) => (
            <Card
              key={zone}
              className="bg-glass text-white mb-3"
              style={{ minWidth: 0 }}
            >
              <Card.Body className="min-width-0">
                <Card.Title className="fs-6">{zone}</Card.Title>
                {byZone[zone].map((template) => (
                  <NormTemplateRow
                    key={template.title}
                    userId={user.id}
                    zone={zone}
                    title={template.title}
                    description={template.description}
                  />
                ))}
              </Card.Body>
            </Card>
          ))}
        </>
      )}

      <AuthForm show={showAuthForm} onHide={() => setShowAuthForm(false)} />
    </div>
  );
};

export default AccountPage;
