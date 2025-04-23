import { makeAutoObservable, runInAction } from 'mobx';

export class RegisterFormStore {
  username = '';
  email = '';
  password = '';
  errors: Record<string, string> = {};

  constructor() {
    makeAutoObservable(this);
  }

  setField(field: 'username' | 'email' | 'password', value: string) {
    this[field] = value;
    this.errors[field] = '';
  }

  private validateUsername() {
    if (!this.username) return 'Username is required';
    if (this.username.length < 3) return 'At least 3 characters';
    return '';
  }
  private validateEmail() {
    const re = /\S+@\S+\.\S+/;
    if (!this.email) return 'Email is required';
    if (!re.test(this.email)) return 'Invalid email';
    return '';
  }
  private validatePassword() {
    if (!this.password) return 'Password is required';
    if (this.password.length < 6) return 'At least 6 characters';
    return '';
  }

  validateAll(): boolean {
    const e1 = this.validateUsername();
    const e2 = this.validateEmail();
    const e3 = this.validatePassword();
    runInAction(() => {
      this.errors = { username: e1, email: e2, password: e3 };
    });
    return !e1 && !e2 && !e3;
  }

  reset() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.errors = {};
  }
}
