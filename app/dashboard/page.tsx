'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo, useState } from 'react';
import { LiveBadge } from '@/components/QueueComponents';
import { BookingSummary } from '@/components/BookingSummary';
import { useBooking } from '@/components/BookingProvider';
import { LOUNGES, FLIGHTS, ZONE_META } from '@/lib/lounge-data';
import { ArrowRight, Bell, Check, QR } from '@/components/icons';

function DashboardInner() {
  const params = useSearchParams();
  const confirmed = params.get('confirmed') === '1';
  const { booking } = useBooking();
  const lounge = LOUNGES.find((l) => l.id === booking.loungeId) ?? LOUNGES[0];
  const [lang, setLang] = useState<'en' | 'de' | 'fr' | 'it'>('en');

  const bookingRef = useMemo(() => 'ASP-' + Math.random().toString(36).slice(2, 7).toUpperCase(), []);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-14 pb-24">
      {confirmed && (
        <div className="mb-6 card-aspire p-5 flex items-center gap-4">
          <span className="h-10 w-10 rounded-full bg-aspire-navy text-white flex items-center justify-center"><Check size={16} /></span>
          <div>
            <div className="serif-heading text-xl text-aspire-navy">Reservation confirmed</div>
            <div className="text-[0.88rem] text-aspire-navy/80">Confirmation sent to {booking.email || 'your inbox'}. Reference {bookingRef}.</div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="swiss-eyebrow">My stay</div>
          <h1 className="serif-heading text-4xl sm:text-6xl mt-2 text-aspire-navy">
            Welcome{booking.guestName ? `, ${booking.guestName.split(' ')[0]}` : ''}.
          </h1>
          <p className="mt-2 text-navy-500">Everything you need for a calm visit at {lounge.name}.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[0.72rem] uppercase tracking-widest text-navy-500">Language</span>
          <div className="flex rounded-full border border-aspire-border bg-white p-1">
            {(['en', 'de', 'fr', 'it'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 text-[0.75rem] uppercase tracking-widest rounded-full transition-colors ${
                  lang === l ? 'bg-aspire-navy text-white' : 'text-navy-500 hover:text-aspire-navy'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: details */}
        <div className="lg:col-span-2 space-y-6">
          <BookingSummary />

          {/* Flight integration */}
          <section className="card-cream p-6 sm:p-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="swiss-eyebrow">Departures · next 90 min</div>
                <div className="serif-heading text-2xl mt-1 text-aspire-navy">{lounge.airportCode} airport feed</div>
              </div>
              <LiveBadge label="Live" />
            </div>

            <div className="divide-y divide-aspire-border">
              {FLIGHTS.map((f) => (
                <div key={f.code} className="py-3 flex items-center justify-between text-[0.92rem]">
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-aspire-navy w-16">{f.code}</span>
                    <span className="text-aspire-navy">{f.dest}</span>
                  </div>
                  <div className="flex items-center gap-6 text-navy-500">
                    <span>Gate {f.gate}</span>
                    <span className="tabular-nums text-aspire-navy">{f.sched}</span>
                    <span className={`text-[0.78rem] ${f.status.includes('Delayed') ? 'text-amber-700' : f.status === 'Boarding' ? 'text-emerald-700' : 'text-navy-500'}`}>
                      {f.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Check-in steps */}
          <section className="card-cream p-6 sm:p-8">
            <div className="swiss-eyebrow mb-1">When you arrive</div>
            <div className="serif-heading text-2xl text-aspire-navy mb-5">A quiet check-in</div>
            <ol className="space-y-3 text-[0.95rem] text-aspire-navy">
              {[
                'Show the QR code at the door — your host already knows your name.',
                'Your table is held until 15 minutes after your arrival window.',
                'Browse the in-lounge menu and order discreetly from your seat.',
                'Tap "I&apos;m boarding" 20 min before your flight for a friendly nudge.',
              ].map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-aspire-taupe text-white text-xs flex items-center justify-center mt-0.5">{i + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: s }} />
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Right: QR + table + actions */}
        <aside className="space-y-4">
          <div className="card-cream p-6 text-center">
            <div className="swiss-eyebrow">Your check-in code</div>
            <div className="mt-4 mx-auto h-44 w-44 rounded-2xl bg-white border border-aspire-border flex items-center justify-center">
              <QR size={120} />
            </div>
            <div className="serif-heading text-xl mt-4 text-aspire-navy">{bookingRef}</div>
            <div className="text-[0.78rem] text-navy-500 mt-1">Present at the lounge entrance</div>
          </div>

          <div className="card-aspire p-6">
            <div className="swiss-eyebrow text-aspire-navy/70">Your table</div>
            {booking.tableId ? (
              <>
                <div className="serif-heading text-3xl text-aspire-navy mt-1">#{booking.tableId}</div>
                <div className="text-aspire-navy/80 mt-1">
                  {booking.zone ? ZONE_META[booking.zone].label : '—'} · {booking.slot ?? booking.arrivalTime}
                </div>
                <Link href="/tables" className="mt-4 inline-flex items-center gap-2 text-aspire-navy underline underline-offset-4">
                  Change table <ArrowRight size={14} />
                </Link>
              </>
            ) : (
              <Link href="/tables" className="mt-3 inline-flex items-center gap-2 text-aspire-navy">
                Reserve a specific table <ArrowRight size={14} />
              </Link>
            )}
          </div>

          <div className="card-cream p-6">
            <div className="swiss-eyebrow">Notifications</div>
            <div className="mt-3 space-y-2 text-[0.9rem] text-aspire-navy">
              <Row label="SMS & WhatsApp" status="on" />
              <Row label="Email reminders" status="on" />
              <Row label="Push notifications" status="off" />
            </div>
            <button className="mt-5 inline-flex items-center gap-2 text-aspire-taupe text-[0.78rem] uppercase tracking-widest">
              <Bell size={12} /> Manage preferences
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, status }: { label: string; status: 'on' | 'off' }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className={`inline-flex items-center gap-1.5 text-[0.78rem] ${status === 'on' ? 'text-emerald-700' : 'text-navy-500'}`}>
        <span className={`h-2 w-2 rounded-full ${status === 'on' ? 'bg-emerald-500' : 'bg-aspire-border'}`} />
        {status === 'on' ? 'Enabled' : 'Off'}
      </span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-navy-500">Loading…</div>}>
      <DashboardInner />
    </Suspense>
  );
}
