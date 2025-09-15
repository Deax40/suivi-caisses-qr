
import './globals.css';
import { ReactNode } from 'react';
import Providers from './providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900">
        <Providers>
          <div className="max-w-6xl mx-auto p-4">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
