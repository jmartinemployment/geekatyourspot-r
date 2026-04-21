import { NextResponse } from 'next/server'
import { getFreeSlots } from '@/services/google-calendar.service'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const slots = await getFreeSlots(14)
    return NextResponse.json({ slots })
  } catch (err) {
    console.error('Calendar availability error:', err)
    return NextResponse.json({ error: 'Could not fetch availability' }, { status: 500 })
  }
}
