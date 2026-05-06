import apiClient from './api';

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    return apiClient.post('/auth/login', { email, password });
  },

  register: async (
    email: string,
    password: string,
    username: string
  ): Promise<AuthResponse> => {
    return apiClient.post('/auth/register', { email, password, username });
  },

  logout: async (): Promise<void> => {
    return apiClient.post('/auth/logout');
  },

  refreshToken: async (): Promise<AuthResponse> => {
    return apiClient.post('/auth/refresh');
  },
};
