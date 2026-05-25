'use client';

import { useState } from 'react';
import { ReservationStepper, ReservationProgress, StepperActions } from '@/components/ReservationStepper';
import { useBooking } from '@/components/BookingProvider';
import { TIME_SLOTS, LOUNGES } from '@/lib/lounge-data';

export default function ScheduleStep() {
  const { booking, update } = useBooking();
  const lounge = LOUNGES.find((l) => l.id === booking.loungeId) ?? LOUNGES[0];

  return (
    <div>
      <ReservationStepper current={2} />
      <ReservationProgress current={2} />

      <div className="text-center mt-6 mb-10">
        <h1 className="serif-heading text-4xl sm:text-6xl text-aspire-navy">Schedule your visit</h1>
        <p className="mt-3 text-navy-500">{lounge.name} · {lounge.terminal}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="card-cream p-5">
          <div className="swiss-eyebrow">Date</div>
          <input
            type="date"
            value={booking.date}
            onChange={(e) => update({ date: e.target.value })}
            className="mt-2 w-full bg-transparent text-aspire-navy text-xl outline-none"
          />
        </div>
        <div className="card-cream p-5">
          <div className="swiss-eyebrow">Adults</div>
          <select
            value={booking.guests.adults}
            onChange={(e) => update({ guests: { ...booking.guests, adults: Number(e.target.value) } })}
            className="mt-2 w-full bg-transparent text-aspire-navy text-xl outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="card-cream p-5">
          <div className="swiss-eyebrow">Children</div>
          <select
            value={booking.guests.children}
            onChange={(e) => update({ guests: { ...booking.guests, children: Number(e.target.value) } })}
            className="mt-2 w-full bg-transparent text-aspire-navy text-xl outline-none"
          >
            {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div className="card-cream p-6 sm:p-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="swiss-eyebrow">Arrival time</div>
            <div className="serif-heading text-2xl text-aspire-navy mt-1">Select a 2 hr 15 min slot</div>
          </div>
          <div className="text-[0.78rem] text-navy-500">Hours · {lounge.hours}</div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {TIME_SLOTS.map((t) => {
            const active = booking.arrivalTime === t;
            return (
              <button
                key={t}
                onClick={() => update({ arrivalTime: t })}
                className={`py-3 rounded-xl text-[0.92rem] border transition-all ${
                  active
                    ? 'bg-aspire-navy text-white border-aspire-navy'
                    : 'bg-white text-aspire-navy border-aspire-border hover:border-aspire-taupe'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <StepperActions backHref="/reserve" nextHref="/reserve/guests" />
    </div>
  );
}
