import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { signIn, register } from '../api';
import { AuthResponse, User } from '../types';
import { Meta } from 'utils/meta';
import { UserModel } from '../model';
import { errorMessage, isCancelError } from 'utils/errors';

const AUTH_TOKEN_KEY = 'authToken';
const AUTH_USER_KEY = 'authUser';

export class UserStore {
  user: User | null = null;
  token: string | null = null;
  meta: Meta = Meta.initial;
  error: string = '';

  /** Полевые переменные для блокировки повторного запуска запроса */
  private _loginAbortController: AbortController | null = null;
  private _registerAbortController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    if (storedToken && storedUser) {
      try {
        this.token = JSON.parse(storedToken);
        this.user = new UserModel(JSON.parse(storedUser));
        this.meta = Meta.success;
      } catch {
        this.logout();
      }
    }
    reaction(
      () => [this.token, this.user],
      ([t, u]) => {
        if (t && u) {
          localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(t));
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(u));
        } else {
          localStorage.removeItem(AUTH_TOKEN_KEY);
          localStorage.removeItem(AUTH_USER_KEY);
        }
      },
    );
  }

  /**
   * Метод для авторизации.
   * При успешном ответе сохраняет jwt и данные пользователя.
   */
  async login(identifier: string, password: string): Promise<boolean> {
    if (this._loginAbortController) {
      this._loginAbortController.abort();
    }

    this._loginAbortController = new AbortController();
    const signal = this._loginAbortController.signal;

    this.meta = Meta.loading;

    try {
      const response: AuthResponse = await signIn(identifier, password, signal);

      runInAction(() => {
        this.token = response.jwt;
        this.user = new UserModel(response.user);
        this.meta = Meta.success;
      });

      return true;
    } catch (error) {
      if (isCancelError(error)) {
        return false;
      }
      runInAction(() => {
        this.error = errorMessage(error);
        this.meta = Meta.error;
      });
      return false;
    } finally {
      runInAction(() => {
        this._loginAbortController = null;
      });
    }
  }

  /**
   * Метод для регистрации.
   * При успешном ответе сохраняет jwt и данные пользователя.
   */
  async register(username: string, email: string, password: string): Promise<boolean> {
    if (this._registerAbortController) {
      this._registerAbortController.abort();
    }

    this._registerAbortController = new AbortController();
    const signal = this._registerAbortController.signal;

    this.meta = Meta.loading;
    try {
      const response: AuthResponse = await register(username, email, password, signal);
      runInAction(() => {
        this.token = response.jwt;
        this.user = new UserModel(response.user);
        this.meta = Meta.success;
      });
      return true;
    } catch (error) {
      if (isCancelError(error)) {
        return false;
      }
      runInAction(() => {
        this.error = errorMessage(error);
        this.meta = Meta.error;
      });
      return false;
    } finally {
      runInAction(() => {
        this._registerAbortController = null;
      });
    }
  }

  /**
   * Метод для выхода из системы. Сбрасывает состояние пользователя.
   */
  logout() {
    this.token = null;
    this.user = null;
    this.meta = Meta.initial;

    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  }
}
