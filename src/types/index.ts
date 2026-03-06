export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: Portfolio;
  category: StoryCategory;
  coverGradient: string;
  mediaType: 'text' | 'audio' | 'video';
  mediaUrl?: string;
  duration?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
  isPublished: boolean;
}

export interface Portfolio {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  storiesCount: number;
  followers: number;
  following: number;
  joinedAt: string;
}

export type StoryCategory =
  | 'fiction'
  | 'non-fiction'
  | 'poetry'
  | 'memoir'
  | 'fantasy'
  | 'mystery'
  | 'romance'
  | 'sci-fi';

export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  type: 'audio' | 'video';
}

export interface DashboardStats {
  totalStories: number;
  totalViews: number;
  totalLikes: number;
  totalRecordings: number;
}
