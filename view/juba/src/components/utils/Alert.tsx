// Alert.tsx
import React from "react";
import { Alert as BootstrapAlert, Col, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdError, MdWarning } from "react-icons/md";

interface AlertProps {
  show: boolean;
  message: string;
  variant: "success" | "danger" | "warning" | "info";
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ show, message, variant, onClose }) => {
  if (!show) return null;

  return (
    <BootstrapAlert variant={variant} onClose={onClose} dismissible>
      <Row className="d-flex">
        <Col xs={1}>
          {variant === "success" && <FaCheck />}
          {variant === ("danger" || "info") && <MdError />}
          {variant === "warning" && <MdWarning />}
        </Col>
        <Col>
          <p className="m-0">{message}</p>
        </Col>
      </Row>
    </BootstrapAlert>
  );
};

export default Alert;
