// src/lib/axios.config.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import store from '../store/store';
import { logout, tokenRefrescado } from '../store/slices/auth/sessionSlice';

//@ts-ignore
const BASE_URL = import.meta.env.VITE_URL_DEV;

// Crea la instancia
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// -----------------------------------------------------------------------------
// 1) Interceptor de peticiones: adjunta siempre el access token
// -----------------------------------------------------------------------------
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { token } = store.getState().auth.session;
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -----------------------------------------------------------------------------
// 2) Lógica de refresh en el interceptor de respuestas
// -----------------------------------------------------------------------------
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Si no es 401 o ya lo hemos reintentado, propaga el error
    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }
    if (originalRequest._retry) {
      // Ya reintentado: hacer logout definitivo
      store.dispatch(logout());
      return Promise.reject(error);
    }

    // Marca para no repetir este bloque
    originalRequest._retry = true;

    // Si ya hay un refresh en curso, encolamos
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          if (newToken && originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          }
          return api(originalRequest);
        })
        .catch(err => Promise.reject(err));
    }

    // Aquí iniciamos un nuevo refresh
    isRefreshing = true;
    const { refresh } = store.getState().auth.session;

    try {
      // Llamada directa usando axios (no api) para evitar bucle
      const { data } = await axios.post(
        `${BASE_URL}/auth/jwt/refresh/`,
        { refresh },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const newAccess = data.access as string;

      // Actualiza Redux y cookie
      store.dispatch(tokenRefrescado(newAccess));
      Cookies.set('user', JSON.stringify(store.getState().auth.session));

      // Procesa la cola: despierta todas las peticiones encoladas
      processQueue(null, newAccess);

      // Reintenta la petición original con el header actualizado
      if (originalRequest.headers) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
      }
      return api(originalRequest);
    } catch (err) {
      // Refresh fallido: limpia cola y logout
      processQueue(err, null);
      store.dispatch(logout());
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
