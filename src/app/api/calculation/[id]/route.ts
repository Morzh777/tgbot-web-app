import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/calculation/${params.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Не удалось получить результаты расчета');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Ошибка при получении результатов:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при получении результатов' },
      { status: 500 }
    );
  }
} 