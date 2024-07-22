import { toast } from 'react-toastify';
import ErrorMessage from '../components/ErrorMessage'; // Certifique-se de que o caminho está correto

// Função para exibir mensagens de erro
export const showError = (message: string) => {
  toast.error(message, {
    position: "top-center", // Likely not toast.POSITION
    autoClose: 5000,
    closeButton: true,
    draggable: true, // Check if toast supports draggable option
    className: 'toast-custom-error', // Optional custom class
  });
};

// Função para lidar com erros de rede
export const handleNetworkError = () => {
  showError('Erro de rede. Verifique sua conexão com a internet ou se a API está online.');
};

// Função para lidar com erros desconhecidos
export const handleUnknownError = () => {
  showError('Erro desconhecido. Por favor, tente novamente mais tarde.');
};
