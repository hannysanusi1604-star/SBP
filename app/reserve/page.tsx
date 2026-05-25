'use client';

import { useRouter } from 'next/navigation';
import { ReservationStepper, ReservationProgress, StepperActions } from '@/components/ReservationStepper';
import { useBooking } from '@/components/BookingProvider';
import { LOUNGES } from '@/lib/lounge-data';
import { SmartImage } from '@/components/SmartImage';
import { Check } from '@/components/icons';

export default function ReserveLoungeStep() {
  const router = useRouter();
  const { booking, update } = useBooking();

  return (
    <div>
      <ReservationStepper current={1} />
      <ReservationProgress current={1} />

      <div className="text-center mt-6 mb-10">
        <h1 className="serif-heading text-4xl sm:text-6xl text-aspire-navy">Choose your lounge</h1>
        <p className="mt-3 text-navy-500">Browse premium lounges available across our network.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LOUNGES.map((l) => {
          const active = booking.loungeId === l.id;
          return (
            <button
              key={l.id}
              onClick={() => update({ loungeId: l.id })}
              className={`text-left rounded-3xl overflow-hidden border bg-white transition-all ${
                active ? 'border-aspire-navy shadow-lift' : 'border-aspire-border hover:border-aspire-taupe'
              }`}
            >
              <div className="flex">
                <div className="w-1/3 aspect-square overflow-hidden">
                  <SmartImage src={l.image} alt={l.name} className="h-full w-full" />
                </div>
                <div className="flex-1 p-4 sm:p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[0.7rem] uppercase tracking-widest text-navy-500">{l.airportCode} · {l.terminal}</div>
                      <div className="serif-heading text-xl mt-1 text-aspire-navy">{l.name}</div>
                    </div>
                    {active && (
                      <span className="h-6 w-6 rounded-full bg-aspire-navy text-white flex items-center justify-center">
                        <Check size={12} />
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[0.85rem]">
                    <span className="text-navy-500">{l.occupancyPct}% occupancy · ★ {l.rating}</span>
                    <span className="text-aspire-navy">{l.currency} {l.priceFrom}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <StepperActions backHref="/" nextHref="/reserve/schedule" onNext={() => {}} />
    </div>
  );
}
