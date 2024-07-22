// useAlert.ts
import { useState } from 'react';

interface AlertState {
  show: boolean;
  message: string;
  variant: 'success' | 'danger' | 'warning' | 'info';
}

const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({ show: false, message: '', variant: 'success' });

  const showAlert = (message: string, variant: 'success' | 'danger' | 'warning' | 'info') => {
    setAlert({ show: true, message, variant });
  };

  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return {
    alert,
    showAlert,
    hideAlert,
  };
};

export default useAlert;
