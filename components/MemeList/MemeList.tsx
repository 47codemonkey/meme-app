'use client';

import React from 'react';
import { Meme } from '@/types/index';

interface Props {
  memes: Meme[];
}

export default function MemeList({ memes }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {memes.map((meme) => (
        <div
          key={meme.id}
          className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
        >
          <img src={meme.imageUrl} alt={meme.name} className="h-48 w-full object-cover rounded" />
          <div className="mt-4 flex-1">
            <h3 className="text-lg font-semibold mb-2">{meme.name}</h3>
            <p className="text-gray-600 mb-4">
              Likes: <span className="font-bold">{meme.likes}</span>
            </p>
          </div>
          <a
            href={meme.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto text-blue-600 hover:text-blue-800 underline text-sm"
          >
            Open Image
          </a>
        </div>
      ))}
    </div>
  );
}
