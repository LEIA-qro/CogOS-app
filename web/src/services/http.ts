const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function postJson<T>(endpoint: string, body: unknown, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    return (await res.json()) as T;
  } catch (error) {
    console.warn(`API call to ${endpoint} failed. Using offline fallback data:`, error);
    // Sin API se usan datos de ejemplo
    return fallbackData;
  }
}
