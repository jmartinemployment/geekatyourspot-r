'use server';

import { createCalendarEvent } from '@/services/google-calendar.service';
import { sendBookingConfirmation } from '@/services/booking-confirmation.service';
import type { Booking, ContactInfo } from '@/components/landing-page/scheduler/state/types';

export interface CreateBookingResult {
  success: boolean;
  error?: string;
}

export async function createBooking(
  booking: Booking,
  contact: ContactInfo,
): Promise<CreateBookingResult> {
  try {
    await createCalendarEvent(booking, contact);
    await sendBookingConfirmation(booking, contact);
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Booking failed';
    return { success: false, error: message };
  }
}
