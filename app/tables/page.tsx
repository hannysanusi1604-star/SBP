'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { SeatingMap } from '@/components/SeatingMap';
import { LiveBadge, OccupancyBars } from '@/components/QueueComponents';
import { TABLES, ZONE_META, TIME_SLOTS, OCCUPANCY_FORECAST, type SeatingZone, type Table } from '@/lib/lounge-data';
import { useBooking } from '@/components/BookingProvider';
import { ArrowRight, Check } from '@/components/icons';

export default function TablesPage() {
  const { booking, update } = useBooking();
  const [filter, setFilter] = useState<SeatingZone | null>(null);
  const [selected, setSelected] = useState<Table | null>(
    booking.tableId ? TABLES.find((t) => t.id === booking.tableId) ?? null : null,
  );
  const [slot, setSlot] = useState(booking.slot ?? booking.arrivalTime ?? '14:00');

  const stats = useMemo(() => {
    const total = TABLES.length;
    const avail = TABLES.filter((t) => t.available).length;
    return { total, avail };
  }, []);

  function confirm() {
    if (!selected) return;
    update({ tableId: selected.id, zone: selected.zone, slot });
  }

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-14 pb-24">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="swiss-eyebrow">Step 1 · Verify eligibility · Step 2 · Choose your table</div>
          <h1 className="serif-heading text-4xl sm:text-6xl mt-2 text-aspire-navy">Reserve a table</h1>
          <p className="mt-2 text-navy-500 max-w-xl">
            Open to every guest — Priority Pass, airline loyalty, premium credit card, or direct payment. Pick the seat that fits your stay.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LiveBadge label={`${stats.avail}/${stats.total} tables free`} tone={stats.avail / stats.total < 0.3 ? 'red' : stats.avail / stats.total < 0.6 ? 'amber' : 'green'} />
        </div>
      </div>

      {/* Eligibility */}
      <div className="card-aspire p-5 sm:p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 rounded-full bg-aspire-navy text-white flex items-center justify-center">
            <Check size={16} />
          </span>
          <div>
            <div className="text-aspire-navy">Eligibility verified</div>
            <div className="text-[0.85rem] text-aspire-navy/70">{booking.membership.replace('-', ' ')} · table reservation unlocked</div>
          </div>
        </div>
        <div className="text-[0.85rem] text-aspire-navy/80">Tables released every 15 minutes during peak hours.</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Zone filter */}
          <div className="flex flex-wrap gap-2">
            <ZoneChip active={filter === null} onClick={() => setFilter(null)} label="All zones" />
            {(Object.keys(ZONE_META) as SeatingZone[]).map((z) => (
              <ZoneChip
                key={z}
                active={filter === z}
                onClick={() => setFilter(z)}
                label={ZONE_META[z].label}
                color={ZONE_META[z].color}
              />
            ))}
          </div>

          <SeatingMap
            selectedId={selected?.id ?? null}
            filterZone={filter}
            onSelect={(t) => setSelected(t)}
          />

          <div className="text-[0.78rem] text-navy-500 flex items-center gap-4">
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ background: '#DCC9B9' }} /> Available</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-aspire-border" /> Occupied</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full ring-2 ring-aspire-navy" /> Selected</span>
          </div>

          <div className="card-cream p-6">
            <div className="swiss-eyebrow">Today&apos;s occupancy forecast</div>
            <div className="serif-heading text-xl mt-1 mb-4 text-aspire-navy">Pick a quieter hour</div>
            <OccupancyBars data={OCCUPANCY_FORECAST} />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card-cream p-6">
            <div className="swiss-eyebrow">Your selection</div>
            {selected ? (
              <>
                <div className="serif-heading text-3xl mt-2 text-aspire-navy">Table {selected.id}</div>
                <div className="text-aspire-navy/80 mt-1">
                  {ZONE_META[selected.zone].label} · {selected.seats} {selected.seats === 1 ? 'seat' : 'seats'}
                </div>
                <p className="mt-3 text-[0.9rem] text-navy-500 leading-relaxed">{ZONE_META[selected.zone].description}</p>
              </>
            ) : (
              <p className="mt-3 text-navy-500 text-[0.92rem]">Tap a table on the map to begin.</p>
            )}
          </div>

          <div className="card-cream p-6">
            <div className="swiss-eyebrow">Reservation time</div>
            <div className="mt-3 grid grid-cols-3 gap-2 max-h-56 overflow-y-auto scrollbar-hide">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setSlot(t)}
                  className={`py-2 rounded-lg text-[0.85rem] border ${
                    slot === t
                      ? 'bg-aspire-navy text-white border-aspire-navy'
                      : 'bg-white border-aspire-border text-aspire-navy hover:border-aspire-taupe'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={confirm}
            disabled={!selected}
            className={`btn-primary w-full justify-center ${selected ? '' : 'opacity-40 cursor-not-allowed'}`}
          >
            Confirm table <Check size={14} />
          </button>

          {booking.tableId && (
            <Link href="/dashboard?confirmed=1" className="btn-outline w-full justify-center">
              View confirmation <ArrowRight size={14} />
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}

function ZoneChip({ active, onClick, label, color }: { active: boolean; onClick: () => void; label: string; color?: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[0.78rem] transition-all ${
        active ? 'bg-aspire-navy text-white border-aspire-navy' : 'bg-white text-aspire-navy border-aspire-border hover:border-aspire-taupe'
      }`}
    >
      {color && <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />}
      {label}
    </button>
  );
}
