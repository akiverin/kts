import { User } from './types';
import { makeAutoObservable } from 'mobx';

export class UserModel {
  constructor(private readonly data: User) {
    makeAutoObservable(this);
  }

  get id(): number {
    return this.data.id;
  }

  get username(): string {
    return this.data.username;
  }

  get email(): string {
    return this.data.email;
  }

  get provider(): string {
    return this.data.provider;
  }

  get confirmed(): boolean {
    return this.data.confirmed;
  }

  get blocked(): boolean {
    return this.data.blocked;
  }

  get createdAt(): string {
    return this.data.createdAt;
  }

  get updatedAt(): string {
    return this.data.updatedAt;
  }

  get documentId(): string {
    return this.data.documentId;
  }

  get publishedAt(): string {
    return this.data.publishedAt;
  }

  // Метод toJSON возвращает исходный объект
  toJSON(): User {
    return this.data;
  }
}
