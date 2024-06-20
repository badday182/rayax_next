import { Button } from "react-bootstrap";

export function BlockButton({ onClick }) {
    return (
      <div className="d-grid gap-2 m-2">
        <Button variant="primary" size="lg" onClick={onClick}>
          Add
        </Button>
            </div>
    );
  }