'use client';

import { useEffect, useState } from 'react';
import { TelegramProvider } from '@/components/TelegramProvider';

export default function Home() {
  const [WebApp, setWebApp] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTelegramClient, setIsTelegramClient] = useState(false);

  useEffect(() => {
    const initWebApp = async () => {
      try {
        const webApp = (await import('@twa-dev/sdk')).default;
        setWebApp(webApp);
        // Проверяем, запущено ли приложение в Telegram
        setIsTelegramClient(webApp.platform !== 'unknown');
      } catch (error) {
        console.error('Failed to load WebApp:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initWebApp();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isTelegramClient) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-yellow-800">Внимание!</h3>
                <div className="mt-2 text-yellow-700">
                  <p>Это приложение должно быть открыто через Telegram.</p>
                  <p className="mt-2">Пожалуйста, откройте его через:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Telegram на телефоне</li>
                    <li>Telegram Desktop</li>
                    <li>Telegram Web</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <TelegramProvider>
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Telegram Web App</h1>
          {WebApp && (
            <div className="bg-gray-100 p-4 rounded-lg space-y-2">
              <p>Platform: {WebApp.platform || 'Not available'}</p>
              <p>Version: {WebApp.version || 'Not available'}</p>
              <p>Init Data: {WebApp.initData ? 'Available' : 'Not available'}</p>
              <p>User ID: {WebApp.initDataUnsafe?.user?.id || 'Not available'}</p>
              <p>Username: {WebApp.initDataUnsafe?.user?.username || 'Not available'}</p>
              <p>First Name: {WebApp.initDataUnsafe?.user?.first_name || 'Not available'}</p>
              <p>Last Name: {WebApp.initDataUnsafe?.user?.last_name || 'Not available'}</p>
            </div>
          )}
        </div>
      </main>
    </TelegramProvider>
  );
}
