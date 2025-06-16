import { Inter } from 'next/font/google';
import './globals.css';
import { TelegramProvider } from '@/components/TelegramProvider';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'Наталочка - Матрица Судьбы',
  description: 'Рассчитайте свою матрицу судьбы и узнайте больше о себе',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <TelegramProvider>
          {children}
        </TelegramProvider>
      </body>
    </html>
  );
}
