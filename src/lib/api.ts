import Constants from 'expo-constants';

const API_URL = process.env.API_URL ?? (Constants.expoConfig?.extra?.apiUrl as string) ?? 'http://localhost:3001';

export async function apiFetch<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`Erro na API (${res.status}): ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export function confirmDose(doseLogId: string) {
  return apiFetch(`/doses/${doseLogId}/confirm`, { method: 'POST' });
}
