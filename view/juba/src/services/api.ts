import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';

// Crie a instância do Axios
const api = axios.create({
  baseURL: 'http://localhost:8098', // Atualize com seu URL
});

// Interceptor de requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const errorMessage = (error.response.data as { message?: string }).message || 'Erro desconhecido.';
      toast.error(errorMessage);
    } else if (error.request) {
      toast.error('Erro de rede. Verifique sua conexão com a internet ou se a API está online.');
    } else {
      toast.error('Erro desconhecido.');
    }
    return Promise.reject(error);
  }
);

export default api;
