import { ReactNode } from 'react';
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import Providers from '@/components/Providers/Providers';

export default function MemsLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div>
        <MainNavbar />
        <main className="p-4">{children}</main>
      </div>
    </Providers>
  );
}
