import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Meme } from '@/types/index';

async function updateMeme(meme: Meme): Promise<Meme> {
  const res = await fetch(`/api/memes`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(meme),
  });
  if (!res.ok) {
    throw new Error('Failed to update meme');
  }
  return res.json();
}

export function useEditMeme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (meme: Meme) => updateMeme(meme),
    onSuccess: (updated) => {
      const prev = queryClient.getQueryData<Meme[]>(['memes']) || [];
      const next = prev.map((m) => (m.id === updated.id ? updated : m));
      queryClient.setQueryData(['memes'], next);

      if (typeof window !== 'undefined') {
        localStorage.setItem('memes', JSON.stringify(next));
      }

      queryClient.invalidateQueries({ queryKey: ['memes'] });
    },
  });
}
