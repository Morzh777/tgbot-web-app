import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { birthDate, name, userId } = body;

    // Здесь будет интеграция с вашим бэкендом
    const response = await fetch(`${process.env.API_BASE_URL}/calculation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        birthDate,
        name,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при расчете матрицы');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Ошибка при расчете матрицы:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при расчете матрицы' },
      { status: 500 }
    );
  }
} 