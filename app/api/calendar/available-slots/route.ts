import { NextResponse } from 'next/server';
import { getSlotsForDate } from '@/services/google-calendar.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.exec(date)) {
    return NextResponse.json(
      { error: 'Missing or invalid date parameter. Expected YYYY-MM-DD.' },
      { status: 400 },
    );
  }

  try {
    const slots = await getSlotsForDate(date);
    return NextResponse.json({ slots });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch slots';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
