import { auth } from '../config/firebase';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export interface MediaUploadResult {
  message: string;
  uid: string;
  file_id: string;
  filename: string;
  path: string;
  url: string;
  size: number;
  media_type: 'audio' | 'video';
}

/**
 * Upload a recorded Blob (audio or video) to the CaptureStory API.
 *
 * Uses `FormData` so the browser sets the correct `multipart/form-data`
 * Content-Type header with boundary — do NOT set Content-Type manually.
 */
export async function uploadMedia(
  blob: Blob,
  mediaType: 'audio' | 'video',
): Promise<MediaUploadResult> {
  const ext = mediaType === 'video' ? '.webm' : '.webm';
  const filename = `recording-${Date.now()}${ext}`;

  const formData = new FormData();
  formData.append('file', blob, filename);

  const headers: HeadersInit = {};
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/media/${mediaType}`, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.detail ?? body?.message ?? response.statusText;
    throw new Error(message);
  }

  return response.json() as Promise<MediaUploadResult>;
}
