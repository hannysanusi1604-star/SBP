'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SmartImage } from '@/components/SmartImage';
import { ArrowRight, Search, Sparkle, Bell, ChevronDown } from '@/components/icons';
import { LOUNGES } from '@/lib/lounge-data';
import { LiveBadge } from '@/components/QueueComponents';
import { useBooking } from '@/components/BookingProvider';

export default function HomePage() {
  const router = useRouter();
  const { update } = useBooking();
  const [airport, setAirport] = useState(LOUNGES[0].id);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('14:00');
  const [adults, setAdults] = useState(1);

  function startReserve() {
    update({
      loungeId: airport,
      date,
      arrivalTime: time,
      guests: { adults, children: 0 },
    });
    router.push('/reserve/schedule');
  }

  return (
    <div>
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <SmartImage
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2400&q=85"
            alt=""
            className="absolute inset-0 h-full w-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-aspire-bg/30 via-aspire-bg/55 to-aspire-bg" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-24 pb-24 sm:pb-36">
          <div className="max-w-3xl animate-fade-up">
            <div className="swiss-eyebrow">Premium airport lounges · Live availability</div>
            <h1 className="serif-heading text-5xl sm:text-7xl md:text-[5.5rem] mt-4 leading-[0.98] text-aspire-navy">
              A calm moment,<br/>before every flight.
            </h1>
            <p className="mt-6 text-[1.1rem] sm:text-[1.25rem] text-navy-500 max-w-2xl leading-relaxed">
              Reserve a lounge, secure a table, or join the virtual queue — across Europe&apos;s most refined airport lounges.
            </p>
          </div>

          {/* Search card */}
          <div className="mt-12 sm:mt-16 max-w-5xl card-cream shadow-lift p-4 sm:p-6 animate-fade-up">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
              <Field label="Airport / Lounge" className="sm:col-span-4">
                <select
                  value={airport}
                  onChange={(e) => setAirport(e.target.value)}
                  className="input-cream appearance-none pr-9"
                >
                  {LOUNGES.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.airportCode} · {l.airport}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Date" className="sm:col-span-3">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-cream"
                />
              </Field>
              <Field label="Arrival" className="sm:col-span-2">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="input-cream"
                />
              </Field>
              <Field label="Guests" className="sm:col-span-2">
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="input-cream appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-1 flex">
                <button
                  onClick={startReserve}
                  aria-label="Search"
                  className="w-full h-full min-h-[52px] rounded-xl bg-aspire-navy text-white flex items-center justify-center hover:bg-navy-700 transition-colors"
                >
                  <Search size={18} />
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-3 text-[0.78rem] text-navy-500">
                <LiveBadge label="Live occupancy" />
                <span className="hidden sm:inline">Updated every 30 seconds.</span>
              </div>
              <button onClick={startReserve} className="btn-primary">
                Reserve Your Lounge Experience
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <QuickCard
              eyebrow="Walk-in"
              title="Join the virtual queue"
              body="No booking? Reserve your place in line and we'll notify you the moment a table opens."
              href="/queue"
            />
            <QuickCard
              eyebrow="Members"
              title="Verify & reserve a table"
              body="Priority Pass, loyalty status or premium cards — every member can now reserve a specific seat."
              href="/tables"
            />
            <QuickCard
              eyebrow="Operators"
              title="Live occupancy dashboard"
              body="Manage tables, walk-ins and forecasted demand in one calm operator workspace."
              href="/admin"
            />
          </div>
        </div>
      </section>

      {/* FEATURED LOUNGES */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pt-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="swiss-eyebrow">Featured lounges</div>
            <h2 className="serif-heading text-3xl sm:text-5xl mt-2 text-aspire-navy">Available this week</h2>
          </div>
          <Link href="/search" className="hidden sm:inline-flex items-center gap-2 text-aspire-navy text-[0.78rem] uppercase tracking-widest hover:gap-3 transition-all">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {LOUNGES.map((l) => (
            <Link
              key={l.id}
              href="/search"
              className="group rounded-3xl overflow-hidden bg-white border border-aspire-border hover:shadow-lift transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <SmartImage src={l.image} alt={l.name} className="h-full w-full group-hover:scale-[1.04] transition-transform duration-700" />
                <div className="absolute top-3 left-3">
                  <LiveBadge
                    label={`${l.occupancyPct}% full`}
                    tone={l.occupancyPct > 75 ? 'red' : l.occupancyPct > 50 ? 'amber' : 'green'}
                  />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between text-[0.72rem] uppercase tracking-widest text-navy-500">
                  <span>{l.airportCode} · {l.city}</span>
                  <span>★ {l.rating}</span>
                </div>
                <div className="serif-heading text-xl mt-2 text-aspire-navy">{l.name}</div>
                <div className="text-[0.85rem] text-navy-500 mt-1">{l.terminal}</div>
                <div className="mt-4 flex items-end justify-between">
                  <div className="text-aspire-navy">
                    <span className="text-[0.7rem] uppercase tracking-widest text-navy-500 mr-1">from</span>
                    {l.currency} {l.priceFrom}
                  </div>
                  <span className="text-[0.72rem] uppercase tracking-widest text-aspire-taupe group-hover:underline">Reserve</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 mt-24">
        <div className="card-aspire p-8 sm:p-14">
          <div className="max-w-2xl">
            <div className="swiss-eyebrow text-aspire-navy/70">Why Aspire</div>
            <h2 className="serif-heading text-3xl sm:text-5xl mt-3 text-aspire-navy">
              Hospitality, technology and quiet — in one seamless ecosystem.
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Pillar
              eyebrow="01 · Reserve"
              title="A table that is genuinely yours"
              body="Pick a quiet zone, workstation, family seat or runway-facing view — visible to you, held for you."
            />
            <Pillar
              eyebrow="02 · Queue"
              title="No more pacing the gate"
              body="Join the queue from your phone. Boarding pass scanned, position tracked, gentle nudges when ready."
            />
            <Pillar
              eyebrow="03 · Arrive"
              title="QR check-in, no friction"
              body="Show your code at the door. Your table, your name, your preferred drink — already prepared."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 mt-24">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="animate-fade-up">
            <div className="swiss-eyebrow inline-flex items-center gap-2">
              <Sparkle size={14} /> The new lounge experience
            </div>
            <h2 className="serif-heading text-3xl sm:text-5xl mt-3 text-aspire-navy">
              Every traveller, every lounge, every status.
            </h2>
            <p className="mt-4 text-navy-500 leading-relaxed max-w-lg">
              Priority Pass, airline loyalty, premium credit cards or direct-paying guests — Aspire treats every visitor with the same calm precision.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/reserve" className="btn-primary">Reserve a lounge <ArrowRight size={14} /></Link>
              <Link href="/queue" className="btn-outline"><Bell size={14} /> Join a queue</Link>
            </div>
          </div>
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-lift">
            <SmartImage
              src="https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1600&q=80"
              alt="Lounge interior"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`relative block ${className}`}>
      <span className="absolute top-2 left-4 text-[0.62rem] uppercase tracking-widest text-navy-500 z-10">{label}</span>
      <div className="pt-4 pb-0 [&_input]:pt-5 [&_select]:pt-5 relative">
        {children}
        <ChevronDown size={14} className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 pointer-events-none" />
      </div>
    </label>
  );
}

function QuickCard({ eyebrow, title, body, href }: { eyebrow: string; title: string; body: string; href: string }) {
  return (
    <Link
      href={href}
      className="group p-6 rounded-2xl bg-white border border-aspire-border hover:border-aspire-taupe transition-colors"
    >
      <div className="swiss-eyebrow">{eyebrow}</div>
      <div className="mt-2 serif-heading text-xl text-aspire-navy">{title}</div>
      <p className="mt-2 text-[0.92rem] text-navy-500 leading-relaxed">{body}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-widest text-aspire-taupe group-hover:gap-3 transition-all">
        Continue <ArrowRight size={12} />
      </div>
    </Link>
  );
}

function Pillar({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="bg-white/70 rounded-2xl p-6 border border-white/80">
      <div className="swiss-eyebrow">{eyebrow}</div>
      <div className="mt-2 serif-heading text-xl text-aspire-navy">{title}</div>
      <p className="mt-2 text-[0.92rem] text-navy-500 leading-relaxed">{body}</p>
    </div>
  );
}
