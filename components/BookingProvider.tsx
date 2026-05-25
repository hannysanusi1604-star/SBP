'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { LOUNGES, type SeatingZone } from '@/lib/lounge-data';

export type Booking = {
  loungeId: string;
  date: string;
  arrivalTime: string;
  guests: { adults: number; children: number };
  guestName: string;
  email: string;
  membership: string;
  tableId: string | null;
  zone: SeatingZone | null;
  slot: string | null;
};

const defaultBooking: Booking = {
  loungeId: LOUNGES[0].id,
  date: new Date().toISOString().slice(0, 10),
  arrivalTime: '14:00',
  guests: { adults: 1, children: 0 },
  guestName: '',
  email: '',
  membership: 'priority-pass',
  tableId: null,
  zone: null,
  slot: null,
};

type Ctx = {
  booking: Booking;
  update: (patch: Partial<Booking>) => void;
  reset: () => void;
};

const BookingContext = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<Booking>(defaultBooking);

  const update = useCallback((patch: Partial<Booking>) => {
    setBooking((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => setBooking(defaultBooking), []);

  const value = useMemo(() => ({ booking, update, reset }), [booking, update, reset]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider');
  return ctx;
}
