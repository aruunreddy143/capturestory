import { auth } from "../config/firebase";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000/api";

async function getAuthHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();

    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);

    const message =
      body?.detail ?? body?.message ?? response.statusText;

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function apiGet<T>(path: string): Promise<T> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers,
  });

  return handleResponse<T>(response);
}

export async function apiPost<T>(
  path: string,
  body: unknown
): Promise<T> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  return handleResponse<T>(response);
}

export async function apiPut<T>(
  path: string,
  body: unknown
): Promise<T> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  return handleResponse<T>(response);
}

export async function apiDelete<T = void>(path: string): Promise<T> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers,
  });

  return handleResponse<T>(response);
}