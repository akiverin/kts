import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { signIn, register } from '../api';
import { AuthResponse, User } from '../types';
import { Meta } from 'utils/meta';
import { UserModel } from '../model';

const AUTH_TOKEN_KEY = 'authToken';
const AUTH_USER_KEY = 'authUser';

export class UserStore {
  user: User | null = null;
  token: string | null = null;
  meta: Meta = Meta.initial;
  error: string = '';

  /** Полевые переменные для блокировки повторного запуска запроса */
  private _currentLoginRequest: Promise<boolean> | null = null;
  private _currentRegisterRequest: Promise<boolean> | null = null;

  constructor() {
    makeAutoObservable(this);

    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        this.token = storedToken;
        this.user = new UserModel(parsedUser);
        this.meta = Meta.success;
      } catch {
        this.logout();
      }
    }

    reaction(
      () => [this.token, this.user],
      ([token, user]) => {
        if (token && user) {
          localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
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
    if (this._currentLoginRequest) {
      return this._currentLoginRequest;
    }
    this.meta = Meta.loading;
    this._currentLoginRequest = (async () => {
      try {
        const response: AuthResponse = await signIn(identifier, password);
        runInAction(() => {
          this.token = response.jwt;
          this.user = new UserModel(response.user);
          this.meta = Meta.success;
        });

        return true;
      } catch (error) {
        runInAction(() => {
          this.error = error instanceof Error ? error.message : 'Unknown error';
          this.meta = Meta.error;
        });
        return false;
      } finally {
        runInAction(() => {
          this._currentLoginRequest = null;
        });
      }
    })();
    return this._currentLoginRequest;
  }

  /**
   * Метод для регистрации.
   * При успешном ответе сохраняет jwt и данные пользователя.
   */
  async register(username: string, email: string, password: string): Promise<boolean> {
    if (this._currentRegisterRequest) {
      return this._currentRegisterRequest;
    }
    this.meta = Meta.loading;
    this._currentRegisterRequest = (async () => {
      try {
        const response: AuthResponse = await register(username, email, password);
        runInAction(() => {
          this.token = response.jwt;
          this.user = new UserModel(response.user);
          this.meta = Meta.success;
        });
        return true;
      } catch (error) {
        runInAction(() => {
          this.error = error instanceof Error ? error.message : 'Unknown error';
          this.meta = Meta.error;
        });
        return false;
      } finally {
        runInAction(() => {
          this._currentRegisterRequest = null;
        });
      }
    })();
    return this._currentRegisterRequest;
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
