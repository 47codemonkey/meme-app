'use client';

import MemeList from '@/components/MemeList/MemeList';
import { useMemes } from '@/hooks/useMemes';

export default function ListPage() {
  const { data: memes, isLoading, error } = useMemes();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading memes</div>;
  if (!memes) return <div>No memes found</div>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Memes List</h1>
      <MemeList memes={memes} />
    </div>
  );
}
