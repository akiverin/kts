import { api, apiRoutes } from 'config/api';
import { formatApiError } from 'utils/errors';
import { AuthResponse } from './types';

/**
 * Функция для авторизации пользователя.
 * Отправляет POST-запрос на /auth/local с полями identifier и password.
 */
export const signIn = async (identifier: string, password: string): Promise<AuthResponse> => {
  try {
    const payload = { identifier, password };
    const response = await api.post<AuthResponse>(apiRoutes.users.auth, payload);
    return response.data;
  } catch (error) {
    throw new Error(formatApiError('signIn', error));
  }
};

/**
 * Функция для регистрации пользователя.
 * Отправляет POST-запрос на /auth/local/register с полями username, email и password.
 */
export const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const payload = { username, email, password };
    const response = await api.post<AuthResponse>(apiRoutes.users.register, payload);
    return response.data;
  } catch (error) {
    throw new Error(formatApiError('register', error));
  }
};
