'use client';

import React, { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Meme } from '@/types/index';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  meme?: Meme;
  onSave: (updated: Meme) => void;
};

export default function MemeEditModal({ isOpen, onClose, meme, onSave }: Props) {
  const [form, setForm] = useState<Meme | undefined>(meme);

  useEffect(() => {
    setForm(meme);
  }, [meme]);

  const errors = useMemo(() => {
    if (!form) return {};
    const e: Record<string, string> = {};
    if (!form.name || form.name.length < 3 || form.name.length > 100) {
      e.name = 'Name must be 3–100 characters';
    }
    if (!/^https?:\/\/.+\.(jpe?g)$/i.test(form.imageUrl)) {
      e.imageUrl = 'URL must end with .jpg / .jpeg';
    }
    const likesNum = Number(form.likes);
    if (likesNum < 0 || likesNum > 99 || Number.isNaN(likesNum)) {
      e.likes = 'Likes 0‑99';
    }
    return e;
  }, [form]);

  const isValid = !!form && Object.keys(errors).length === 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => prev && { ...prev, [name]: value });
  };

  const handleSave = () => form && isValid && onSave(form);

  if (!isOpen || !form) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Meme</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">ID</label>
            <Input
              readOnly
              name="id"
              value={String(form.id)}
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Name
              {errors.name && <span className="text-red-500 ml-1 text-xs">{errors.name}</span>}
            </label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${errors.name ? 'border-red-500' : ''}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Image URL
              {errors.imageUrl && (
                <span className="text-red-500 ml-1 text-xs">{errors.imageUrl}</span>
              )}
            </label>
            <Input
              readOnly
              name="imageUrl"
              value={form.imageUrl}
              className={`w-full border rounded px-3 py-2 bg-gray-100 ${errors.imageUrl ? 'border-red-500' : ''}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Likes
              {errors.likes && <span className="text-red-500 ml-1 text-xs">{errors.likes}</span>}
            </label>
            <Input
              name="likes"
              type="number"
              min="0"
              max="99"
              value={String(form.likes)}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${errors.likes ? 'border-red-500' : ''}`}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button onPress={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </Button>
          <Button
            disabled={!isValid}
            onPress={handleSave}
            className={`px-4 py-2 rounded text-white ${
              isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
