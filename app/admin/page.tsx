'use client';

import { useEffect, useState } from 'react';
import { LiveBadge, OccupancyBars } from '@/components/QueueComponents';
import { LOUNGES, OCCUPANCY_FORECAST, QUEUE_INITIAL, TABLES, ZONE_META } from '@/lib/lounge-data';
import { ArrowRight, Bell, Check, Plus, X } from '@/components/icons';

export default function AdminPage() {
  const [lounge, setLounge] = useState(LOUNGES[0].id);
  const [now, setNow] = useState(new Date());
  const [queue, setQueue] = useState(QUEUE_INITIAL);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const totalTables = TABLES.length;
  const occupied = TABLES.filter((t) => !t.available).length;
  const occupancy = Math.round((occupied / totalTables) * 100);
  const loungeObj = LOUNGES.find((l) => l.id === lounge) ?? LOUNGES[0];

  function notify(id: string) {
    setQueue((q) => q.map((e) => (e.id === id ? { ...e, status: 'notified' as const } : e)));
  }
  function seat(id: string) {
    setQueue((q) => q.filter((e) => e.id !== id));
  }

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-14 pb-24">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="swiss-eyebrow">Operator workspace</div>
          <h1 className="serif-heading text-4xl sm:text-6xl mt-2 text-aspire-navy">Lounge operations</h1>
          <p className="mt-2 text-navy-500">Real-time occupancy, queue and reservation controls.</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={lounge} onChange={(e) => setLounge(e.target.value)} className="input-cream max-w-xs">
            {LOUNGES.map((l) => (
              <option key={l.id} value={l.id}>{l.airportCode} · {l.name}</option>
            ))}
          </select>
          <LiveBadge label={`Updated ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`} />
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Kpi label="Live occupancy" value={`${occupancy}%`} sub={`${occupied}/${totalTables} tables`} tone={occupancy > 80 ? 'red' : occupancy > 60 ? 'amber' : 'green'} />
        <Kpi label="In queue" value={String(queue.length)} sub="Walk-in waitlist" tone={queue.length > 6 ? 'amber' : 'green'} />
        <Kpi label="Reservations today" value="142" sub="↑ 12% vs avg" tone="green" />
        <Kpi label="Avg dwell time" value="1h 38m" sub="Within target" tone="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <section className="lg:col-span-2 card-cream p-6 sm:p-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="swiss-eyebrow">Occupancy forecast</div>
              <div className="serif-heading text-2xl text-aspire-navy mt-1">{loungeObj.airportCode} · today</div>
            </div>
            <div className="text-[0.78rem] text-navy-500">Capacity {loungeObj.capacity}</div>
          </div>
          <OccupancyBars data={OCCUPANCY_FORECAST} />

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.keys(ZONE_META) as Array<keyof typeof ZONE_META>).map((z) => {
              const zoneTables = TABLES.filter((t) => t.zone === z);
              const free = zoneTables.filter((t) => t.available).length;
              return (
                <div key={z} className="p-4 rounded-2xl bg-white border border-aspire-border">
                  <div className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-widest text-navy-500">
                    <span className="h-2 w-2 rounded-full" style={{ background: ZONE_META[z].color }} />
                    {ZONE_META[z].label}
                  </div>
                  <div className="serif-heading text-2xl text-aspire-navy mt-1">{free}/{zoneTables.length}</div>
                  <div className="text-[0.78rem] text-navy-500">free tables</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Queue admin */}
        <section className="card-cream p-6 sm:p-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="swiss-eyebrow">Walk-in queue</div>
              <div className="serif-heading text-xl text-aspire-navy mt-1">{queue.length} waiting</div>
            </div>
            <LiveBadge label="Auto" />
          </div>
          <div className="space-y-2 max-h-[460px] overflow-y-auto scrollbar-hide pr-1">
            {queue.map((e) => (
              <div key={e.id} className="p-3 rounded-xl bg-white border border-aspire-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-full bg-aspire-taupe text-white flex items-center justify-center text-[0.78rem]">{e.initials}</span>
                    <div>
                      <div className="text-aspire-navy text-[0.92rem]">{e.name}</div>
                      <div className="text-[0.72rem] text-navy-500">
                        {ZONE_META[e.preference].label} · party {e.party} · {e.estimatedWait}m
                      </div>
                    </div>
                  </div>
                  <span className={`h-2 w-2 rounded-full ${
                    e.status === 'notified' ? 'bg-amber-500' : 'bg-aspire-taupe'
                  }`} />
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => notify(e.id)}
                    className="px-3 py-1.5 rounded-full text-[0.7rem] uppercase tracking-widest border border-aspire-border text-aspire-navy hover:border-aspire-taupe inline-flex items-center gap-1"
                  >
                    <Bell size={12} /> Notify
                  </button>
                  <button
                    onClick={() => seat(e.id)}
                    className="px-3 py-1.5 rounded-full text-[0.7rem] uppercase tracking-widest bg-aspire-navy text-white inline-flex items-center gap-1"
                  >
                    <Check size={12} /> Seat
                  </button>
                  <button
                    onClick={() => seat(e.id)}
                    className="px-3 py-1.5 rounded-full text-[0.7rem] uppercase tracking-widest border border-aspire-border text-navy-500 inline-flex items-center gap-1"
                  >
                    <X size={12} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Tables grid */}
      <section className="mt-6 card-cream p-6 sm:p-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="swiss-eyebrow">Table management</div>
            <div className="serif-heading text-2xl text-aspire-navy mt-1">Live floor</div>
          </div>
          <button className="inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-widest text-aspire-navy">
            Re-assign manually <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-2.5">
          {TABLES.map((t) => (
            <div
              key={t.id}
              className={`p-3 rounded-xl border text-center transition-all ${
                t.available ? 'bg-white border-aspire-border' : 'bg-aspire-soft border-aspire-border opacity-70'
              }`}
            >
              <div className="text-[0.65rem] uppercase tracking-widest text-navy-500">{ZONE_META[t.zone].label.split(' ')[0]}</div>
              <div className="serif-heading text-xl text-aspire-navy mt-1">{t.id}</div>
              <div className="text-[0.7rem] text-navy-500">{t.seats}-seat</div>
              <div className={`mt-1.5 inline-block w-2 h-2 rounded-full ${t.available ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Forecast row */}
      <section className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ForecastCard title="Next 60 min arrivals" value="38" delta="+6 vs avg" />
        <ForecastCard title="Tables freed by 16:00" value="14" delta="based on dwell" />
        <ForecastCard title="Predicted wait by 17:30" value="22 min" delta="capacity peak" />
      </section>
    </div>
  );
}

function Kpi({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: 'green' | 'amber' | 'red' }) {
  return (
    <div className="card-cream p-5">
      <div className="flex items-center justify-between">
        <div className="swiss-eyebrow">{label}</div>
        <span className={`h-2 w-2 rounded-full ${tone === 'red' ? 'bg-red-500' : tone === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
      </div>
      <div className="serif-heading text-4xl text-aspire-navy mt-2 tabular-nums">{value}</div>
      <div className="text-[0.78rem] text-navy-500 mt-1">{sub}</div>
    </div>
  );
}

function ForecastCard({ title, value, delta }: { title: string; value: string; delta: string }) {
  return (
    <div className="card-aspire p-5">
      <div className="swiss-eyebrow text-aspire-navy/70">{title}</div>
      <div className="serif-heading text-3xl text-aspire-navy mt-2">{value}</div>
      <div className="text-[0.78rem] text-aspire-navy/70 mt-1">{delta}</div>
    </div>
  );
}
