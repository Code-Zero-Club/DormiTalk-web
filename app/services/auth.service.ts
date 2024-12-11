import Cookies from 'js-cookie';
import { ApiResponse } from '../types/api';
import { apiClient } from '../lib/apiClient';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_DESCRIPTION_KEY = 'auth_description';

interface AuthCheckResponse {
  message: string;
  description: string;
  expires_at: string;
}

export class AuthService {
  static async checkKey(key: string): Promise<ApiResponse<AuthCheckResponse>> {
    try {
      const response = await apiClient.get<AuthCheckResponse>('/auth/key', {
        params: { key }
      });
      
      if (!response.error) {
        this.setAuthToken(key);
        if (response.data.description) {
          this.setDescription(response.data.description);
        }
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  static setAuthToken(token: string): void {
    Cookies.set(AUTH_TOKEN_KEY, token, { expires: 7 });
    apiClient.setAuthToken(token);
  }

  static getAuthToken(): string | undefined {
    return Cookies.get(AUTH_TOKEN_KEY);
  }

  static removeAuthToken(): void {
    Cookies.remove(AUTH_TOKEN_KEY);
    apiClient.setAuthToken('');
  }

  static setDescription(description: string): void {
    Cookies.set(AUTH_DESCRIPTION_KEY, description, { expires: 7 });
  }

  static getDescription(): string | undefined {
    return Cookies.get(AUTH_DESCRIPTION_KEY);
  }

  static removeDescription(): void {
    Cookies.remove(AUTH_DESCRIPTION_KEY);
  }

  static isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  static logout(): void {
    this.removeAuthToken();
    this.removeDescription();
  }
}