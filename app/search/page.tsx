'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SmartImage } from '@/components/SmartImage';
import { LiveBadge } from '@/components/QueueComponents';
import { ArrowRight, Search, Sliders, Star } from '@/components/icons';
import { LOUNGES } from '@/lib/lounge-data';
import { useBooking } from '@/components/BookingProvider';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const router = useRouter();
  const { update } = useBooking();
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'availability' | 'price' | 'rating'>('availability');

  const filtered = LOUNGES.filter((l) =>
    `${l.airport} ${l.airportCode} ${l.city} ${l.name}`.toLowerCase().includes(q.toLowerCase()),
  ).sort((a, b) => {
    if (sort === 'price') return a.priceFrom - b.priceFrom;
    if (sort === 'rating') return b.rating - a.rating;
    return a.occupancyPct - b.occupancyPct;
  });

  function pick(id: string) {
    update({ loungeId: id });
    router.push('/reserve/schedule');
  }

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-14 pb-24">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="swiss-eyebrow">Lounge directory</div>
          <h1 className="serif-heading text-4xl sm:text-6xl mt-2 text-aspire-navy">Available lounges</h1>
        </div>
      </div>

      {/* Search bar */}
      <div className="card-cream p-4 sm:p-5 mb-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1 flex items-center gap-3 px-3">
          <Search size={18} className="text-navy-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Airport name, city or IATA code"
            className="w-full bg-transparent outline-none text-aspire-navy placeholder:text-navy-500/60 py-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <Sliders size={16} className="text-navy-500" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="bg-transparent text-[0.85rem] text-aspire-navy outline-none px-2 py-2"
          >
            <option value="availability">Sort: Most available</option>
            <option value="price">Sort: Price low → high</option>
            <option value="rating">Sort: Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((l) => (
          <div key={l.id} className="rounded-3xl overflow-hidden bg-white border border-aspire-border flex flex-col sm:flex-row">
            <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden">
              <SmartImage src={l.image} alt={l.name} className="h-full w-full" />
              <div className="absolute top-3 left-3">
                <LiveBadge label={`${l.occupancyPct}% full`} tone={l.occupancyPct > 75 ? 'red' : l.occupancyPct > 50 ? 'amber' : 'green'} />
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between text-[0.72rem] uppercase tracking-widest text-navy-500">
                <span>{l.airportCode} · {l.city}, {l.country}</span>
                <span className="inline-flex items-center gap-1"><Star filled size={12} /> {l.rating} ({l.reviews})</span>
              </div>
              <div className="serif-heading text-2xl mt-2 text-aspire-navy">{l.name}</div>
              <div className="text-[0.85rem] text-navy-500">{l.terminal} · {l.hours}</div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {l.amenities.slice(0, 4).map((a) => (
                  <span key={a} className="text-[0.7rem] px-2.5 py-1 rounded-full bg-aspire-soft text-aspire-navy/80 border border-aspire-border">
                    {a}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-5 flex items-end justify-between">
                <div>
                  <div className="text-[0.7rem] uppercase tracking-widest text-navy-500">from</div>
                  <div className="text-aspire-navy text-xl">{l.currency} {l.priceFrom}</div>
                </div>
                <button onClick={() => pick(l.id)} className="btn-primary">
                  Reserve <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-20 text-navy-500">No lounges match your search.</div>
        )}
      </div>
    </div>
  );
}
