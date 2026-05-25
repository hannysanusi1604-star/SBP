'use client';

import { useBooking } from './BookingProvider';
import { LOUNGES, MEMBERSHIPS, ZONE_META } from '@/lib/lounge-data';

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return d;
  }
}

function endTime(start: string, hours = 2.25) {
  const [h, m] = start.split(':').map(Number);
  const total = h * 60 + m + hours * 60;
  const eh = Math.floor(total / 60) % 24;
  const em = Math.floor(total % 60);
  return `${String(eh).padStart(2, '0')}:${String(em).padStart(2, '0')}`;
}

export function BookingSummary({ compact = false }: { compact?: boolean }) {
  const { booking } = useBooking();
  const lounge = LOUNGES.find((l) => l.id === booking.loungeId) ?? LOUNGES[0];
  const membership = MEMBERSHIPS.find((m) => m.id === booking.membership)?.label ?? '—';
  const guestsTotal = booking.guests.adults + booking.guests.children;
  const zoneLabel = booking.zone ? ZONE_META[booking.zone].label : '—';

  return (
    <section className="card-cream p-6 sm:p-8 shadow-card">
      <h3 className="serif-heading text-2xl sm:text-3xl mb-6">Booking Summary</h3>

      <div className="grid grid-cols-2 gap-y-6 gap-x-8">
        <Field label="Airport"     value={lounge.airport} />
        <Field label="Lounge"      value={lounge.name} />
        <Field label="Date"        value={formatDate(booking.date)} />
        <Field label="Booking Time" value={`${booking.arrivalTime} — ${endTime(booking.arrivalTime)}`} />
        <Field label="Name"        value={booking.guestName || '—'} />
        <Field label="Guests"      value={`Adult (${booking.guests.adults})${booking.guests.children ? ` · Child (${booking.guests.children})` : ''}`} />
        {!compact && (
          <>
            <Field label="Membership"   value={membership} />
            <Field label="Table"        value={booking.tableId ? `${zoneLabel} · #${booking.tableId}` : 'Not selected'} />
            <Field label="Estimated Occupancy"
                   value={
                     <span className="inline-flex items-center gap-2">
                       <span className={`live-dot ${lounge.occupancyPct > 75 ? 'red' : lounge.occupancyPct > 50 ? 'amber' : ''}`}></span>
                       {lounge.occupancyPct}% full
                     </span>
                   } />
            <Field label="Terminal"    value={lounge.terminal} />
          </>
        )}
      </div>

      <div className="hairline my-7" />

      <div className="flex items-end justify-between">
        <div>
          <div className="swiss-eyebrow">Total</div>
          <div className="mt-1 text-3xl sm:text-4xl serif-heading">
            {lounge.currency} {(lounge.priceFrom * Math.max(1, guestsTotal)).toFixed(2)}
          </div>
          <div className="text-[0.78rem] text-navy-500 mt-1">Includes all amenities · taxes included</div>
        </div>
        <div className="text-right">
          <div className="swiss-eyebrow">Per guest</div>
          <div className="mt-1 text-aspire-navy">{lounge.currency} {lounge.priceFrom.toFixed(2)}</div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[0.85rem] text-navy-500">{label}</div>
      <div className="mt-1 text-aspire-navy">{value}</div>
    </div>
  );
}
