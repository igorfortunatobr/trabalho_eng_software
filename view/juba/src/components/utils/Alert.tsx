// Alert.tsx
import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

interface AlertProps {
  show: boolean;
  message: string;
  variant: 'success' | 'danger' | 'warning' | 'info';
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ show, message, variant, onClose }) => {
  if (!show) return null;

  return (
    <BootstrapAlert variant={variant} onClose={onClose} dismissible>
      {message}
    </BootstrapAlert>
  );
};

export default Alert;
