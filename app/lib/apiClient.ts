import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { ApiResponse } from '../types/api';
import Cookies from 'js-cookie';

interface ErrorResponseData {
  error?: string;
  message?: string;
  [key: string]: unknown;
}

class ApiClient {
  private client: AxiosInstance;
  private authToken?: string;
  
  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const savedToken = Cookies.get('auth_token');
    if (savedToken) {
      this.setAuthToken(savedToken);
    }
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  private getAuthHeaders(): Record<string, string> {
    return this.authToken ? { 'Authorization': `Bearer ${this.authToken}` } : {};
  }

  private handleError(error: AxiosError<ErrorResponseData>): ApiResponse<null> {
    const errorResponse = error.response?.data;
    const errorMessage = errorResponse?.error || errorResponse?.message || '알 수 없는 에러가 발생했습니다.';
    return { data: null, error: errorMessage };
  }

  async get<T>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<T>(path, {
        ...config,
        headers: {
          ...this.getAuthHeaders(),
          ...config?.headers,
        },
      });
      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError<ErrorResponseData>(error)) {
        throw this.handleError(error);
      }
      throw this.handleError(new AxiosError());
    }
  }

  async post<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(path, data, {
        ...config,
        headers: {
          ...this.getAuthHeaders(),
          ...config?.headers,
        },
      });
      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError<ErrorResponseData>(error)) {
        throw this.handleError(error);
      }
      throw this.handleError(new AxiosError());
    }
  }

  async put<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<T>(path, data, {
        ...config,
        headers: {
          ...this.getAuthHeaders(),
          ...config?.headers,
        },
      });
      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError<ErrorResponseData>(error)) {
        throw this.handleError(error);
      }
      throw this.handleError(new AxiosError());
    }
  }

  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<T>(path, {
        ...config,
        headers: {
          ...this.getAuthHeaders(),
          ...config?.headers,
        },
      });
      return { data: response.data };
    } catch (error) {
      if (axios.isAxiosError<ErrorResponseData>(error)) {
        throw this.handleError(error);
      }
      throw this.handleError(new AxiosError());
    }
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL || '');