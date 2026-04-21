import { google } from 'googleapis'
import type { TimeSlot, Booking, ContactInfo } from '@/components/landing-page/scheduler/state/types'

function getCalendarClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })
  return google.calendar({ version: 'v3', auth })
}

export interface FreeSlot {
  start: string // ISO string
  end: string
  label: string // "Tuesday, Apr 15 at 10:00 AM"
}

export async function getFreeSlots(daysAhead = 14): Promise<FreeSlot[]> {
  const calendar = getCalendarClient()
  if (!calendar) {
    console.warn('Google Calendar credentials not found. Returning empty slots.')
    return []
  }
  const calendarId = process.env.GOOGLE_CALENDAR_ID!

  const now = new Date()
  const future = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000)

  try {
    // Get busy times
    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: now.toISOString(),
        timeMax: future.toISOString(),
        items: [{ id: calendarId }],
      },
    }).catch(err => {
      console.warn('Google Calendar API Error (Check your credentials):', err.message)
      return null
    })

    if (!freeBusy) return []

    const busy = freeBusy.data.calendars?.[calendarId]?.busy ?? []

    // Generate 30-min slots 9am-4:30pm on weekdays
    const slots: FreeSlot[] = []
    const cursor = new Date(now)
    // Round to next 30 min block
    cursor.setSeconds(0, 0)
    if (cursor.getMinutes() > 0 && cursor.getMinutes() < 30) {
      cursor.setMinutes(30)
    } else if (cursor.getMinutes() > 30) {
      cursor.setHours(cursor.getHours() + 1)
      cursor.setMinutes(0)
    }

    // Ensure we start at 9am at the earliest if today
    if (cursor.getHours() < 9) {
      cursor.setHours(9, 0, 0, 0)
    }

    while (cursor < future && slots.length < 12) {
      const day = cursor.getDay()
      if (day !== 0 && day !== 6) { // Skip weekends
        const slotEnd = new Date(cursor.getTime() + 30 * 60 * 1000)

        // Check if cursor is within 9am-5pm ET
        // Note: This simplified logic assumes the server/env is ET or handled via offset
        // For production, use a library like luxon or date-fns-tz
        const currentHour = cursor.getHours()

        if (currentHour >= 9 && currentHour < 17) {
          const isBusy = busy.some(b =>
            new Date(b.start!) < slotEnd && new Date(b.end!) > cursor
          )

          if (!isBusy) {
            slots.push({
              start: cursor.toISOString(),
              end: slotEnd.toISOString(),
              label: cursor.toLocaleString('en-US', {
                weekday: 'long', month: 'short', day: 'numeric',
                hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York',
              }) + ' ET',
            })
          }
        }
      }

      cursor.setMinutes(cursor.getMinutes() + 30)

      // If we've passed 5pm, move to next day 9am
      if (cursor.getHours() >= 17) {
        cursor.setDate(cursor.getDate() + 1)
        cursor.setHours(9, 0, 0, 0)
      }
    }

    return slots
  } catch (error) {
    console.error('Error in getFreeSlots:', error)
    throw error;
  }
}

// ── Per-date availability (scheduler wizard) ──────────────────────────────────

function getETOffset(dateStr: string): number {
  const testDate = new Date(`${dateStr}T12:00:00Z`)
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    timeZoneName: 'shortOffset',
  }).formatToParts(testDate)
  const offsetPart = parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT-4'
  const match = /GMT([+-]\d+)/.exec(offsetPart)
  return match ? Number.parseInt(match[1], 10) : -4
}

function parseDateParts(dateStr: string): { year: number; month: number; day: number } {
  return {
    year: Number.parseInt(dateStr.slice(0, 4), 10),
    month: Number.parseInt(dateStr.slice(5, 7), 10) - 1,
    day: Number.parseInt(dateStr.slice(8, 10), 10),
  }
}

export async function getSlotsForDate(dateStr: string): Promise<TimeSlot[]> {
  const startHourEnv = process.env.BOOKING_WINDOW_START_HOUR
  const endHourEnv = process.env.BOOKING_WINDOW_END_HOUR

  if (!startHourEnv || !endHourEnv) {
    throw new Error(
      'BOOKING_WINDOW_START_HOUR and BOOKING_WINDOW_END_HOUR must be set in environment'
    )
  }

  const startHour = Number.parseInt(startHourEnv, 10)
  const endHour = Number.parseInt(endHourEnv, 10)

  if (Number.isNaN(startHour) || Number.isNaN(endHour)) {
    throw new Error('BOOKING_WINDOW_START_HOUR and BOOKING_WINDOW_END_HOUR must be valid integers')
  }

  if (startHour !== 9 || endHour !== 17) {
    console.warn(
      `[calendar] Booking window is ${startHour}–${endHour} ET, expected 9–17. Verify this is intentional.`
    )
  }

  const calendar = getCalendarClient()
  if (!calendar) {
    throw new Error('Google Calendar credentials not configured')
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID
  if (!calendarId) {
    throw new Error('GOOGLE_CALENDAR_ID not set')
  }

  const etOffset = getETOffset(dateStr)
  const { year, month, day } = parseDateParts(dateStr)

  const windowStart = new Date(Date.UTC(year, month, day, startHour - etOffset, 0, 0, 0))
  const windowEnd = new Date(Date.UTC(year, month, day, endHour - etOffset, 0, 0, 0))

  const freeBusy = await calendar.freebusy.query({
    requestBody: {
      timeMin: windowStart.toISOString(),
      timeMax: windowEnd.toISOString(),
      items: [{ id: calendarId }],
    },
  })

  const busy = freeBusy.data.calendars?.[calendarId]?.busy ?? []

  const slots: TimeSlot[] = []
  // Last bookable slot must end + buffer before window closes
  // e.g. endHour=17 → last slot starts at 16:00 (16:00 appt + 16:30 buffer = 17:00)
  const lastSlotHour = endHour - 1

  for (let hour = startHour; hour <= lastSlotHour; hour++) {
    for (const minute of [0, 30]) {
      if (hour === lastSlotHour && minute === 30) continue

      const slotStart = new Date(Date.UTC(year, month, day, hour - etOffset, minute, 0, 0))
      const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000)
      const blockEnd = new Date(slotStart.getTime() + 60 * 60 * 1000)

      const isBlocked = busy.some((b) => {
        const busyStart = new Date(b.start!)
        const busyEnd = new Date(b.end!)
        return busyStart < blockEnd && busyEnd > slotStart
      })

      if (!isBlocked) {
        const startTime = slotStart.toLocaleString('en-US', {
          timeZone: 'America/New_York',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        const endTime = slotEnd.toLocaleString('en-US', {
          timeZone: 'America/New_York',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })

        slots.push({ startTime, endTime, isoStart: slotStart.toISOString() })
      }
    }
  }

  return slots
}

export async function createCalendarEvent(
  booking: Booking,
  contact: ContactInfo,
): Promise<void> {
  const calendar = getCalendarClient()
  if (!calendar) throw new Error('Google Calendar credentials not configured')

  const calendarId = process.env.GOOGLE_CALENDAR_ID
  if (!calendarId) throw new Error('GOOGLE_CALENDAR_ID not set')

  const eventStart = new Date(booking.slot.isoStart)
  const eventEnd = new Date(eventStart.getTime() + 60 * 60 * 1000)

  await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `AI Strategy Call — ${contact.firstName} ${contact.lastName}`,
      description: `Strategy call booked by ${contact.firstName} ${contact.lastName} (${contact.email})`,
      start: { dateTime: eventStart.toISOString(), timeZone: 'America/New_York' },
      end: { dateTime: eventEnd.toISOString(), timeZone: 'America/New_York' },
      // Attendees omitted — service account requires Domain-Wide Delegation to send invites.
      // Confirmation is delivered via email through the onSubmit callback instead.
    },
  })
}
