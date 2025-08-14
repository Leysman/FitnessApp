import axios from 'axios';
import store from '../store';
import { logout } from '../redux/slices/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
 
  timeout: 20000,
});

// Токен из Redux в каждый запрос
api.interceptors.request.use(
  (config) => {
    const { token } = store.getState().auth || {};
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 401 → logout + удобное сообщение об ошибке
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    error.friendlyMessage =
      error.response?.data?.message ||
      error.response?.statusText ||
      error.message ||
      'Неизвестная ошибка';
    return Promise.reject(error);
  }
);

export default api;