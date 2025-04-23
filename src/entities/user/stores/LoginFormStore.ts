import { makeAutoObservable, runInAction } from 'mobx';

export class LoginFormStore {
  identifier = '';
  password = '';
  errors: Record<'identifier' | 'password', string> = { identifier: '', password: '' };

  constructor() {
    makeAutoObservable(this);
  }

  setField(field: 'identifier' | 'password', value: string) {
    this[field] = value;
    this.errors[field] = '';
  }

  private validateIdentifier() {
    if (!this.identifier) return 'Username or email is required';
    return '';
  }
  private validatePassword() {
    if (!this.password) return 'Password is required';
    if (this.password.length < 6) return 'At least 6 characters';
    return '';
  }

  validateAll(): boolean {
    const e1 = this.validateIdentifier();
    const e2 = this.validatePassword();
    runInAction(() => {
      this.errors = { identifier: e1, password: e2 };
    });
    return !e1 && !e2;
  }
}
