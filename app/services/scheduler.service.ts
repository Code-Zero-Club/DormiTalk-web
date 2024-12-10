import { ApiResponse, Scheduler } from '../types/api';
import { apiClient } from '../lib/apiClient';

interface SchedulerDto {
  start_time: string;
  day_of_week: string[];
  play_time: string;
}

export class SchedulerService {
  private static readonly BASE_PATH = '/schedulers';

  private static formatTime(time: string): string {
    return time.length === 5 ? `${time}:00` : time;
  }

  private static formatSchedulerData(data: SchedulerDto): SchedulerDto {
    return {
      ...data,
      start_time: this.formatTime(data.start_time),
      play_time: this.formatTime(data.play_time),
    };
  }

  static async getAll(): Promise<ApiResponse<Scheduler[]>> {
    return apiClient.get<Scheduler[]>(this.BASE_PATH);
  }

  static async create(data: SchedulerDto): Promise<ApiResponse<Scheduler>> {
    const formattedData = this.formatSchedulerData(data);
    return apiClient.post<Scheduler>(this.BASE_PATH, formattedData);
  }

  static async update(id: number, data: SchedulerDto): Promise<ApiResponse<Scheduler>> {
    const formattedData = this.formatSchedulerData(data);
    return apiClient.put<Scheduler>(`${this.BASE_PATH}/${id}`, formattedData);
  }
}