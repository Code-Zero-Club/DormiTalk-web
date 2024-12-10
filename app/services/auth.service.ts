import { ApiResponse } from '../types/api';
import { apiClient } from '../lib/apiClient';

export class AuthService {
  static async checkKey(key: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.get<{ message: string }>('/auth/key', {
      params: { key }
    });
  }

  static setAuthToken(token: string): void {
    apiClient.setAuthToken(token);
  }
}