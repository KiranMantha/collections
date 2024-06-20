import { SessionProvider } from '@providers';
import { Header } from '@ui';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nextjs Ecommerce',
  description: 'a sample nextjs based ecommerce application'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            {children}
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
              <p>Copyright 2024 - All rights reserved by next-ecommerce</p>
            </footer>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
