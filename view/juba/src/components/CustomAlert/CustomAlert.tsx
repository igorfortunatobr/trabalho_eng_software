import React from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdError, MdWarning } from "react-icons/md";

interface CustomAlertProps {
  message: string;
  type: string;
  show: boolean;
}

export default function CustomAlert(props: CustomAlertProps) {
  const { message, type, show } = props;

  return (
    <>
      <Alert variant={props.type} show={show}>
        <Row className="d-flex">
          <Col xs={1}>
            {type === "success" && <FaCheck />}
            {type === ("danger" || "info") && <MdError />}
            {type === "warning" && <MdWarning />}
          </Col>
          <Col>
            <p className="m-0">{message}</p>
          </Col>
        </Row>
      </Alert>
    </>
  );
}
