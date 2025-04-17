import { useQuery } from '@tanstack/react-query';
import { Meme } from '@/types/index';

async function fetchMemes(): Promise<Meme[]> {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('memes');
    if (stored) {
      try {
        return JSON.parse(stored) as Meme[];
      } catch {}
    }
  }

  const res = await fetch('/api/memes');
  if (!res.ok) {
    throw new Error('Failed to fetch memes');
  }
  const data: Meme[] = await res.json();
  if (typeof window !== 'undefined') {
    localStorage.setItem('memes', JSON.stringify(data));
  }
  return data;
}

export function useMemes() {
  return useQuery<Meme[], Error>({
    queryKey: ['memes'],
    queryFn: fetchMemes,
  });
}
