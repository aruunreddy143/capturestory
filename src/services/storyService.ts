import type { Story, StoryCategory } from '../types';
import { apiDelete, apiGet, apiPost, apiPut } from './apiClient';

export interface CreateStoryPayload {
  title: string;
  content: string;
  excerpt?: string;
  category: StoryCategory;
  mediaType: 'text' | 'audio' | 'video';
  mediaUrl?: string;
  coverGradient?: string;
  isPublished?: boolean;
}

export interface UpdateStoryPayload extends Partial<CreateStoryPayload> {}

/** Fetch all stories for the current user */
export function getStories(): Promise<Story[]> {
  return apiGet<Story[]>('/stories');
}

/** Fetch a single story by ID */
export function getStory(id: string): Promise<Story> {
  return apiGet<Story>(`/stories/${id}`);
}

/** Create a new story */
export function createStory(payload: CreateStoryPayload): Promise<Story> {
  return apiPost<Story>('/stories', payload);
}

/** Update an existing story */
export function updateStory(id: string, payload: UpdateStoryPayload): Promise<Story> {
  return apiPut<Story>(`/stories/${id}`, payload);
}

/** Delete a story */
export function deleteStory(id: string): Promise<void> {
  return apiDelete(`/stories/${id}`);
}

/** Publish / unpublish a story */
export function publishStory(id: string, isPublished: boolean): Promise<Story> {
  return apiPut<Story>(`/stories/${id}`, { isPublished });
}
