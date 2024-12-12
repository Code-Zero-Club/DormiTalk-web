import axios from 'axios';
import { ApiResponse } from '../types/api';

interface YouTubeSearchResult {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

interface YouTubeSearchResponse {
  items: YouTubeSearchResult[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface VideoDurationResponse {
  items: Array<{
    contentDetails: {
      duration: string;
    };
  }>;
}

export interface VideoSearchResult {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  publishedAt: string;
}

export class YouTubeService {
  private static readonly API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  private static readonly API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

  private static decodeHtmlEntities(text: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }
  
  static async search(
    query: string,
    pageToken?: string,
    maxResults: number = 10
  ): Promise<ApiResponse<{
    videos: VideoSearchResult[];
    nextPageToken?: string;
    prevPageToken?: string;
    totalResults: number;
  }>> {
    try {
      const response = await axios.get<YouTubeSearchResponse>(
        `${this.API_BASE_URL}/search`,
        {
          params: {
            part: 'snippet',
            maxResults,
            q: query,
            key: this.API_KEY,
            type: 'video',
            pageToken,
          },
        }
      );

      return {
        data: {
          videos: response.data.items.map(item => ({
            videoId: item.id.videoId,
            title: this.decodeHtmlEntities(item.snippet.title),
            channelTitle: this.decodeHtmlEntities(item.snippet.channelTitle),
            thumbnail: item.snippet.thumbnails.medium.url,
            publishedAt: item.snippet.publishedAt,
          })),
          nextPageToken: response.data.nextPageToken,
          prevPageToken: response.data.prevPageToken,
          totalResults: response.data.pageInfo.totalResults,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: {
            videos: [],
            totalResults: 0,
          },
          error: error.response?.data?.error?.message || '유튜브 검색 중 오류가 발생했습니다.',
        };
      }
      return {
        data: {
          videos: [],
          totalResults: 0,
        },
        error: '알 수 없는 오류가 발생했습니다.',
      };
    }
  }

  static async getVideoDuration(videoId: string): Promise<ApiResponse<string>> {
    try {
      const response = await axios.get<VideoDurationResponse>(
        `${this.API_BASE_URL}/videos`,
        {
          params: {
            part: 'contentDetails',
            id: videoId,
            key: this.API_KEY,
          },
        }
      );

      const duration = response.data.items[0]?.contentDetails.duration;
      if (!duration) {
        throw new Error('동영상 정보를 찾을 수 없습니다.');
      }

      const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      if (!match) {
        throw new Error('재생 시간 형식이 올바르지 않습니다.');
      }

      const hours = parseInt(match[1] || '0');
      const minutes = parseInt(match[2] || '0') + (hours * 60);
      const seconds = parseInt(match[3] || '0');

      // 분은 그대로, 초만 2자리로 패딩
      return {
        data: `${minutes}:${seconds.toString().padStart(2, '0')}`
      };

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          data: '',
          error: error.response?.data?.error?.message || '동영상 정보를 가져오는 중 오류가 발생했습니다.',
        };
      }
      return {
        data: '',
        error: '알 수 없는 오류가 발생했습니다.',
      };
    }
  }
}