/**
 * API 客户端
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: '请求失败' }));
    throw new Error(error.detail || '请求失败');
  }

  return response.json();
}

// Auth
export const auth = {
  register: (phone: string, password: string) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    }),
  login: (phone: string, password: string) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    }),
  me: () => request('/auth/me'),
};

// Courses
export const courses = {
  list: () => request('/courses'),
  create: (title: string, description?: string) =>
    request('/courses', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
    }),
  get: (id: number) => request(`/courses/${id}`),
  delete: (id: number) =>
    request(`/courses/${id}`, { method: 'DELETE' }),
};

// Videos
export const videos = {
  upload: (courseId: number, title: string, file: File) => {
    const formData = new FormData();
    formData.append('course_id', String(courseId));
    formData.append('title', title);
    formData.append('file', file);
    return fetch(`${API_BASE}/videos/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: formData,
    }).then(r => r.json());
  },
  get: (id: number) => request(`/videos/${id}`),
  transcribe: (id: number) =>
    request(`/videos/${id}/transcribe`, { method: 'POST' }),
  applyTemplate: (id: number, templateId: number) =>
    request(`/videos/${id}/apply-template?template_id=${templateId}`, {
      method: 'POST',
    }),
  export: (id: number) =>
    request(`/videos/${id}/export`, { method: 'POST' }),
};