import api from './api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  password: string;
  email?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    username: string;
    email?: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/signup', credentials);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  setToken(token: string) {
    localStorage.setItem('token', token);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
