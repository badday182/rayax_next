"use client";

import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "./AuthProvider";

const AuthForm = ({ show, onHide }) => {
  const { signUp, signIn, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState("signIn"); // "signIn" | "signUp"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const resetAndHide = () => {
    setEmail("");
    setPassword("");
    setError("");
    setInfo("");
    onHide();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setInfo("");
    setSubmitting(true);

    const { error: authError } =
      mode === "signIn"
        ? await signIn(email, password)
        : await signUp(email, password);

    setSubmitting(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    if (mode === "signUp") {
      setInfo(
        "Реєстрація успішна. Перевірте пошту, якщо потрібне підтвердження."
      );
    } else {
      resetAndHide();
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    const { error: authError } = await signInWithGoogle();
    if (authError) setError(authError.message);
  };

  return (
    <Modal show={show} onHide={resetAndHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{mode === "signIn" ? "Увійти" : "Реєстрація"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          variant="outline-dark"
          className="w-100 mb-3"
          onClick={handleGoogleSignIn}
        >
          Увійти через Google
        </Button>
        <div className="text-center text-muted mb-3">або</div>
      </Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="pt-0">
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </Form.Group>
          {error && <div className="text-danger mb-2">{error}</div>}
          {info && <div className="text-success mb-2">{info}</div>}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="link"
            type="button"
            onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
          >
            {mode === "signIn"
              ? "Немає акаунту? Зареєструватися"
              : "Вже є акаунт? Увійти"}
          </Button>
          <Button variant="primary" type="submit" disabled={submitting}>
            {mode === "signIn" ? "Увійти" : "Зареєструватися"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AuthForm;
