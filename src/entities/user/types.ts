import { ApiResponse } from 'types/apiResponse';

export type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  documentId: string;
  publishedAt: string;
};

export type AuthResponse = {
  jwt: string;
  user: User;
};

export type AuthApiResponse = ApiResponse<AuthResponse>;

export type AuthErrorResponse = {
  data: object;
  error: {
    status: number;
    name: string;
    message: string;
    details: unknown;
  };
};
