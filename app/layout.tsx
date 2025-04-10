'use client';

import './globals.css';
import { useGlobalEventListeners } from '@/hooks/useGlobalEventListeners';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useGlobalEventListeners();
  return (
    <html lang='en'>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
