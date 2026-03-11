import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Y2K Retro Blog',
  description: '윈도우 95/98 감성의 다이어리 블로그',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css" />
      </head>
      <body>
        <main className="w-full h-screen relative">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
