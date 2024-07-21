import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8097', // Substitua pela URL da sua API
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.authorization = `${token}`;
  }
  return config;
});

export default api;
