import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div>
    <strong>Erro:</strong>
    <br />
    {message}
  </div>
);

export default ErrorMessage;
