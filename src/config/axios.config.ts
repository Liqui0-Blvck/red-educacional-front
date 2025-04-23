import axios from 'axios';
import store from '../store/store';
import { refrescarToken } from '../store/slices/auth/authSlices';

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


const instance = axios.create({
  //@ts-ignore
  baseURL: `${import.meta.env.VITE_URL_DEV}`,
  timeout: 10000, // Tiempo de espera de 10 segundos
  headers: { 'Content-Type': 'application/json' },
});

// Agregar token a las solicitudes
instance.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = state.auth.session; // Asegúrate de acceder al estado correcto
    if (token) {
      config.headers['Authorization'] = `Bearer ${token.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


export default instance;
