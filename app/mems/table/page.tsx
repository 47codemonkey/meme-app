'use client';

import React, { useState } from 'react';
import MemeTable from '@/components/MemeTable/MemeTable';
import MemeEditModal from '@/components/MemeEditModal/MemeEditModal';
import { useMemes } from '@/hooks/useMemes';
import { useEditMeme } from '@/hooks/useEditMeme';
import { Meme } from '@/types/index';

export default function TablePage() {
  const { data: memes, isLoading, error } = useMemes();
  const editMutation = useEditMeme();
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <div className="p-4">Loading memes...</div>;
  if (error) return <div className="p-4 text-red-600">Something went wrong</div>;
  if (!memes) return <div className="p-4">No memes found</div>;

  const handleEditClick = (m: Meme) => {
    setSelectedMeme(m);
    setIsModalOpen(true);
  };

  const handleSave = (updated: Meme) => {
    editMutation.mutate(updated);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Memes Table</h1>
      <MemeTable memes={memes} onEdit={handleEditClick} />
      <MemeEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meme={selectedMeme || undefined}
        onSave={handleSave}
      />
    </div>
  );
}
