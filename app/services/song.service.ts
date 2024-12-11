import { ApiResponse, Song } from '../types/api';
import { apiClient } from '../lib/apiClient';

interface CreateSongDto {
  title: string;
  youtube_id: string;
  play_time: string;
}

export class SongService {
  private static readonly BASE_PATH = '/songs';

  static async getAll(): Promise<ApiResponse<Song[]>> {
    return apiClient.get<Song[]>(this.BASE_PATH);
  }

  static async getById(id: number): Promise<ApiResponse<Song>> {
    return apiClient.get<Song>(`${this.BASE_PATH}/${id}`);
  }

  static async create(data: CreateSongDto): Promise<ApiResponse<Song>> {
    return apiClient.post<Song>(this.BASE_PATH, data);
  }

  static async delete(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${this.BASE_PATH}/${id}`);
  }
}