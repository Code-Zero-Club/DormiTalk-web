import Cookies from 'js-cookie';
import { ApiResponse } from '../types/api';
import { apiClient } from '../lib/apiClient';

const AUTH_TOKEN_KEY = 'auth_token';

export class AuthService {
  static async checkKey(key: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.get<{ message: string }>('/auth/key', {
        params: { key }
      });
      
      if (!response.error) {
        this.setAuthToken(key);
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

  static isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}