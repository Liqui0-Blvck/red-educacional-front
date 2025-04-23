
import { SessionState } from '../store/slices/auth/sessionSlice';
import { AuthTokens } from '../types/core/core.types';
import axios from '../config/axios.config'

const fetchWithToken = async (url: string, token: string) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Suponiendo que el token de acceso se llama 'access'
      },
    });
    return response
  } catch (error) {
    console.error('Error en fetchWithToken:', error);
    throw error;
  }
};

const fetchWithTokenPost = async (url: string, data: any, token?: SessionState) => {
  try {
    if (!token) throw new Error('Error de Token')
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
  } catch (error) {
    console.error('Error en fetchWithTokenPost:', error);
    throw error;
  }
};

const fetchWithTokenPatch = async (url: string, data: any, token: SessionState) => {
  try {
    const response = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
  } catch (error) {
    console.error('Error en fetchWithTokenPatch:', error);
    throw error;
  }
};

const fetchWithTokenPatchFormData = async (url: string, data: any, token: SessionState) => {
  try {
    const response = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Asegúrate de especificar el tipo de contenido
      },
    });
    return response;
  } catch (error) {
    console.error('Error en fetchWithTokenPatch:', error);
    throw error;
  }
};

const fetchWithTokenPostFormData = async (url: string, data: any, token: SessionState) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Asegúrate de especificar el tipo de contenido
      },
    });
    return response;
  } catch (error) {
    console.error('Error en fetchWithTokenPatch:', error);
    throw error;
  }
};

const fetchWithTokenDelete = async (url: string, token: SessionState) => {
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
  } catch (error) {
    console.error('Error en fetchWithTokenDelete:', error);
    throw error;
  }
};

export {
  fetchWithToken,
  fetchWithTokenPost,
  fetchWithTokenPatch,
  fetchWithTokenPatchFormData,
  fetchWithTokenDelete,
  fetchWithTokenPostFormData,
};
