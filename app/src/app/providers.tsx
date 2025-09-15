'use client';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ToolProvider } from '@/context/ToolContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ToolProvider>{children}</ToolProvider>
    </SessionProvider>
  );
}
