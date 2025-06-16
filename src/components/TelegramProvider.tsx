'use client';

import { useEffect, useState } from 'react';

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initWebApp = async () => {
      try {
        const WebApp = (await import('@twa-dev/sdk')).default;
        
        // Отладочная информация
        console.log('WebApp initData:', WebApp.initData);
        console.log('WebApp initDataUnsafe:', WebApp.initDataUnsafe);
        console.log('WebApp platform:', WebApp.platform);
        console.log('WebApp version:', WebApp.version);
        
        // Инициализация Telegram Web App
        WebApp.ready();
        
        // Настройка основной темы
        WebApp.setHeaderColor('#ffffff');
        WebApp.setBackgroundColor('#ffffff');
        
        // Включаем кнопку "Назад"
        WebApp.enableClosingConfirmation();
        
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize WebApp:', error);
      }
    };

    initWebApp();
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
} 