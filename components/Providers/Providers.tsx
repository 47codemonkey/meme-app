'use client';

import { ReactNode, useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider, Persister } from '@tanstack/react-query-persist-client';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  const persister: Persister = {
    persistClient: (client) => {
      localStorage.setItem('REACT_QUERY_OFFLINE_CACHE', JSON.stringify(client));
    },
    restoreClient: () => {
      const cache = localStorage.getItem('REACT_QUERY_OFFLINE_CACHE');
      return cache ? JSON.parse(cache) : undefined;
    },
    removeClient: () => {
      localStorage.removeItem('REACT_QUERY_OFFLINE_CACHE');
    },
  };

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60,
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
