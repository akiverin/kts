import { api, apiRoutes } from 'config/api';
import { formatApiError } from 'utils/errors';
import { AuthResponse } from './types';
import axios from 'axios';

/**
 * Функция для авторизации пользователя.
 * Отправляет POST-запрос на /auth/local с полями identifier и password.
 */
export const signIn = async (identifier: string, password: string, signal?: AbortSignal): Promise<AuthResponse> => {
  try {
    const payload = { identifier, password };
    const response = await api.post<AuthResponse>(apiRoutes.users.auth, payload, { signal });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiMessage = error.response?.data?.error?.message;
      if (apiMessage) {
        throw new Error(apiMessage);
      }
    }
    throw new Error(formatApiError('signIn', error));
  }
};

/**
 * Функция для регистрации пользователя.
 * Отправляет POST-запрос на /auth/local/register с полями username, email и password.
 */
export const register = async (
  username: string,
  email: string,
  password: string,
  signal?: AbortSignal,
): Promise<AuthResponse> => {
  try {
    const payload = { username, email, password };
    const response = await api.post<AuthResponse>(apiRoutes.users.register, payload, { signal });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiMessage = error.response?.data?.error?.message;
      if (apiMessage) {
        throw new Error(apiMessage);
      }
    }
    throw new Error(formatApiError('register', error));
  }
};
