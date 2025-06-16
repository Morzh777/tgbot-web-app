'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WebApp from '@twa-dev/sdk';

export default function CalculatePage() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Здесь будет логика отправки данных на бэкенд
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          birthDate,
          name,
          userId: WebApp.initDataUnsafe.user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при расчете матрицы');
      }

      const data = await response.json();
      router.push(`/result/${data.calculationId}`);
    } catch (error) {
      console.error('Ошибка:', error);
      WebApp.showAlert('Произошла ошибка при расчете матрицы. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 bg-white">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Рассчитать матрицу
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Ваше имя
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
              Дата рождения
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Рассчитываем...' : 'Рассчитать'}
          </button>
        </form>

        <button
          onClick={() => router.back()}
          className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Назад
        </button>
      </div>
    </main>
  );
} 