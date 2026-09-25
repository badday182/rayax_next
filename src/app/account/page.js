"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useAuth } from "@/components/Auth/AuthProvider";
import AuthForm from "@/components/Auth/AuthForm";
import CustomTemplatesTab from "./CustomTemplatesTab";

const AccountPage = () => {
  const { user, loading } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);

  return (
    <div className="conteinerWidht p-3">
      <div className="mb-3">
        <Button as={Link} href="/" variant="outline-light" size="sm">
          ← На головну
        </Button>
      </div>

      <Tabs
        defaultActiveKey="templates"
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
          <div className="bg-glass rounded-3 p-3 text-white">
            <p>Тут згодом будуть налаштування проекту.</p>
          </div>
        </Tab>
      </Tabs>

      <AuthForm show={showAuthForm} onHide={() => setShowAuthForm(false)} />
    </div>
  );
};

export default AccountPage;
