'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WebApp from '@twa-dev/sdk';

interface CalculationResult {
  square: number[][];
  description: string;
  name: string;
  birthDate: string;
}

export default function ResultPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/calculation/${params.id}`);
        if (!response.ok) {
          throw new Error('Не удалось загрузить результаты');
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Ошибка:', error);
        WebApp.showAlert('Произошла ошибка при загрузке результатов');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Результаты не найдены
          </h2>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 bg-white">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Матрица судьбы
        </h1>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">{result.name}</h2>
          <p className="text-gray-600">{result.birthDate}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg border">
          {result.square.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className="aspect-square flex items-center justify-center text-xl font-semibold border"
              >
                {cell}
              </div>
            ))
          )}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Описание</h3>
          <p className="text-gray-700 whitespace-pre-line">{result.description}</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/compatibility')}
            className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Проверить совместимость
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            На главную
          </button>
        </div>
      </div>
    </main>
  );
} 