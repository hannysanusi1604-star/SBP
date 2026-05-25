'use client';

import { ReservationStepper, ReservationProgress, StepperActions } from '@/components/ReservationStepper';
import { useBooking } from '@/components/BookingProvider';
import { MEMBERSHIPS } from '@/lib/lounge-data';
import { Check } from '@/components/icons';

export default function GuestsStep() {
  const { booking, update } = useBooking();
  const valid = booking.guestName.trim().length > 1 && /@/.test(booking.email);

  return (
    <div>
      <ReservationStepper current={3} />
      <ReservationProgress current={3} />

      <div className="text-center mt-6 mb-10">
        <h1 className="serif-heading text-4xl sm:text-6xl text-aspire-navy">Guest details</h1>
        <p className="mt-3 text-navy-500">Used for check-in, notifications and your digital boarding pass.</p>
      </div>

      <div className="card-cream p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full name">
          <input
            value={booking.guestName}
            onChange={(e) => update({ guestName: e.target.value })}
            placeholder="Lukas Zimmermann"
            className="input-cream"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={booking.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="you@example.com"
            className="input-cream"
          />
        </Field>
        <Field label="Mobile (for SMS / WhatsApp)" full>
          <input
            type="tel"
            placeholder="+41 79 000 00 00"
            className="input-cream"
          />
          <p className="mt-1.5 text-[0.78rem] text-navy-500">We&apos;ll only message you about your booking, queue position and table availability.</p>
        </Field>
      </div>

      <div className="mt-6">
        <div className="swiss-eyebrow mb-3">Access type</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MEMBERSHIPS.map((m) => {
            const active = booking.membership === m.id;
            return (
              <button
                key={m.id}
                onClick={() => update({ membership: m.id })}
                className={`text-left p-5 rounded-2xl border transition-all flex items-center justify-between ${
                  active ? 'bg-aspire-navy text-white border-aspire-navy' : 'bg-white border-aspire-border hover:border-aspire-taupe'
                }`}
              >
                <div>
                  <div className={`text-[0.72rem] uppercase tracking-widest ${active ? 'text-white/70' : 'text-navy-500'}`}>{m.perk}</div>
                  <div className={`mt-1 text-lg ${active ? 'text-white' : 'text-aspire-navy'}`}>{m.label}</div>
                </div>
                {active && (
                  <span className="h-6 w-6 rounded-full bg-white text-aspire-navy flex items-center justify-center">
                    <Check size={12} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <StepperActions backHref="/reserve/schedule" nextHref="/reserve/payment" disabled={!valid} />
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={full ? 'sm:col-span-2' : ''}>
      <div className="text-[0.72rem] uppercase tracking-widest text-navy-500 mb-2">{label}</div>
      {children}
    </label>
  );
}
