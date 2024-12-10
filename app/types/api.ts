export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface Song {
  id: number;
  title: string;
  youtube_id: string;
  play_time: string;
  created_at: string;
}

export interface Scheduler {
  id: number;
  start_time: string;  // HH:MM:SS 형식
  day_of_week: string[];
  play_time: string;  // HH:MM:SS 형식
  last_modified: string;
}