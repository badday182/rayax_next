"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useAuth } from "@/components/Auth/AuthProvider";
import AuthForm from "@/components/Auth/AuthForm";
import CustomTemplatesTab from "./CustomTemplatesTab";
import SettingsTab from "./SettingsTab";

import Modal from "react-bootstrap/Modal";

const AccountPage = () => {
  const { user, loading } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [activeTab, setActiveTab] = useState("templates");
  const [showRestrictedModal, setShowRestrictedModal] = useState(false);

  const handleTabSelect = (key) => {
    if (key === "settings" && !user) {
      setShowRestrictedModal(true);
      return;
    }
    setActiveTab(key);
  };

  return (
    <div className="conteinerWidht p-3">
      <div className="mb-3">
        <Button as={Link} href="/" variant="outline-light" size="sm">
          ← На головну
        </Button>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={handleTabSelect}
        id="account-tabs"
        className="mb-4 account-custom-tabs"
        data-bs-theme="dark"
      >
        <Tab eventKey="templates" title="Кастомні шаблони">
          <CustomTemplatesTab
            user={user}
            loading={loading}
            setShowAuthForm={setShowAuthForm}
          />
        </Tab>
        <Tab eventKey="settings" title="Налаштування проекту">
          <SettingsTab />
        </Tab>
      </Tabs>

      <AuthForm show={showAuthForm} onHide={() => setShowAuthForm(false)} />

      <Modal
        show={showRestrictedModal}
        onHide={() => setShowRestrictedModal(false)}
        centered
        data-bs-theme="dark"
      >
        <Modal.Header closeButton className="bg-dark text-white border-bottom-0">
          <Modal.Title>Доступ обмежено</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <p>Тільки зареєстровані користувачі мають доступ до налаштувань.</p>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-top-0">
          <Button
            variant="outline-light"
            onClick={() => setShowRestrictedModal(false)}
          >
            Закрити
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowRestrictedModal(false);
              setShowAuthForm(true);
            }}
          >
            Увійти
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountPage;
