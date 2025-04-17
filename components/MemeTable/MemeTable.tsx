'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@heroui/react';
import { Button } from '@heroui/button';
import { Meme } from '@/types/index';

type Props = {
  memes: Meme[];
  onEdit: (meme: Meme) => void;
};

export default function MemeTable({ memes, onEdit }: Props) {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'likes', label: 'Likes' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <Table aria-label="Memes" className="min-w-full divide-y divide-gray-200">
        <TableHeader className="bg-gray-50">
          {columns.map((c) => (
            <TableColumn
              key={c.key}
              className="px-4 py-2 text-left text-sm  text-gray-700 font-bold"
            >
              {c.label}
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody className="divide-y divide-gray-100">
          {memes.map((m) => (
            <TableRow key={m.id} className="hover:bg-gray-50">
              {(colKey) =>
                colKey === 'actions' ? (
                  <TableCell className="px-4 py-2 text-sm">
                    <Button
                      onPress={() => onEdit(m)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell className="px-4 py-2 text-sm text-gray-800">
                    {getKeyValue(m, colKey)}
                  </TableCell>
                )
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
