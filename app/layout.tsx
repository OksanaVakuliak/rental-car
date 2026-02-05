import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import { Providers } from '@/components/MantineProvider/MantineProvider';
import { ToastProvider } from '@/components/ToastProvider/ToastProvider';
import { Suspense } from 'react';
import Loading from './loading';
import { ColorSchemeScript } from '@mantine/core';

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  title: 'RentalCar - Find your perfect car',
  description: 'Car rental service in Ukraine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={manrope.className} suppressHydrationWarning>
        <Providers>
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>

          <ToastProvider />
        </Providers>
      </body>
    </html>
  );
}
