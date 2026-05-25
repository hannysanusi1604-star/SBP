'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CountdownTimer, LiveBadge, NotificationToast, QueueTicker } from '@/components/QueueComponents';
import { QUEUE_INITIAL, ZONE_META, type QueueEntry, type SeatingZone } from '@/lib/lounge-data';
import { ArrowRight, Bell, Plus } from '@/components/icons';

export default function QueuePage() {
  const [queue, setQueue] = useState<QueueEntry[]>(QUEUE_INITIAL);
  const [joined, setJoined] = useState<QueueEntry | null>(null);
  const [zone, setZone] = useState<SeatingZone>('quiet');
  const [party, setParty] = useState(2);
  const [name, setName] = useState('');
  const [notified, setNotified] = useState(false);

  // Simulated tick: estimated wait decreases over time
  useEffect(() => {
    const id = setInterval(() => {
      setQueue((prev) =>
        prev.map((e) => ({ ...e, estimatedWait: Math.max(0, e.estimatedWait - 1) })),
      );
    }, 8000);
    return () => clearInterval(id);
  }, []);

  // Trigger sample notification 5s after joining
  useEffect(() => {
    if (!joined) return;
    const id = setTimeout(() => setNotified(true), 5500);
    return () => clearTimeout(id);
  }, [joined]);

  function join() {
    if (!name.trim()) return;
    const entry: QueueEntry = {
      id: `q-${Date.now()}`,
      name,
      initials: name.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase(),
      party,
      preference: zone,
      joinedAt: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      estimatedWait: 12 + Math.floor(Math.random() * 10),
      status: 'waiting',
    };
    setQueue((q) => [...q, entry]);
    setJoined(entry);
  }

  const myPosition = joined ? queue.findIndex((e) => e.id === joined.id) + 1 : null;
  const tickerItems = useMemo(
    () =>
      queue
        .slice(0, 6)
        .map((e) => `${e.initials} · ${ZONE_META[e.preference].label} · ${e.estimatedWait}m wait`),
    [queue],
  );

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 sm:pt-14 pb-24">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="swiss-eyebrow">Walk-ins · Virtual queue</div>
          <h1 className="serif-heading text-4xl sm:text-6xl mt-2 text-aspire-navy">Skip the doorway</h1>
          <p className="mt-2 text-navy-500 max-w-xl">
            Join the queue from your phone. We&apos;ll send a gentle WhatsApp or SMS the moment your table is ready.
          </p>
        </div>
        <LiveBadge label={`${queue.length} in queue · ~${Math.max(...queue.map((q) => q.estimatedWait))}m max wait`} tone="amber" />
      </div>

      <div className="mb-8 -mx-5 sm:-mx-8">
        <QueueTicker items={tickerItems} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Join form / status */}
        <section className="lg:col-span-1 space-y-4">
          {joined ? (
            <div className="card-aspire p-6">
              <div className="flex items-center justify-between">
                <LiveBadge label="You're in" />
                <span className="text-[0.78rem] text-aspire-navy/70">Joined at {joined.joinedAt}</span>
              </div>
              <div className="mt-4">
                <div className="swiss-eyebrow text-aspire-navy/70">Your position</div>
                <div className="serif-heading text-6xl text-aspire-navy mt-1">#{myPosition}</div>
                <div className="mt-2 text-aspire-navy/80">Est. wait · {joined.estimatedWait} min</div>
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-white/70 border border-white">
                <div className="text-[0.85rem] text-navy-500">Preference</div>
                <div className="text-aspire-navy mt-1">{ZONE_META[joined.preference].label} · party of {joined.party}</div>
              </div>
              <p className="mt-5 text-[0.85rem] text-aspire-navy/80">
                We&apos;ll notify you via SMS / WhatsApp when a table opens. You&apos;ll have 15 minutes to claim it.
              </p>
            </div>
          ) : (
            <div className="card-cream p-6">
              <div className="swiss-eyebrow">Join the queue</div>
              <div className="serif-heading text-2xl mt-1 mb-5 text-aspire-navy">Tell us a little about you</div>

              <label className="block">
                <div className="text-[0.72rem] uppercase tracking-widest text-navy-500 mb-2">Name</div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mira Hofmann"
                  className="input-cream"
                />
              </label>

              <label className="block mt-4">
                <div className="text-[0.72rem] uppercase tracking-widest text-navy-500 mb-2">Party size</div>
                <select value={party} onChange={(e) => setParty(Number(e.target.value))} className="input-cream">
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>

              <div className="mt-4">
                <div className="text-[0.72rem] uppercase tracking-widest text-navy-500 mb-2">Seating preference</div>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(ZONE_META) as SeatingZone[]).map((z) => {
                    const active = zone === z;
                    return (
                      <button
                        key={z}
                        onClick={() => setZone(z)}
                        className={`p-3 rounded-xl border text-left text-[0.85rem] ${
                          active ? 'bg-aspire-navy text-white border-aspire-navy' : 'bg-white border-aspire-border hover:border-aspire-taupe text-aspire-navy'
                        }`}
                      >
                        <span className="inline-block h-2 w-2 rounded-full mr-2 align-middle" style={{ background: ZONE_META[z].color }} />
                        {ZONE_META[z].label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button onClick={join} disabled={!name.trim()} className={`btn-primary w-full justify-center mt-6 ${name.trim() ? '' : 'opacity-40 cursor-not-allowed'}`}>
                <Plus size={14} /> Join queue
              </button>
              <p className="mt-3 text-[0.78rem] text-navy-500">By joining you agree to receive booking-related messages.</p>
            </div>
          )}

          {joined && notified && (
            <CountdownTimer
              seconds={15 * 60}
              onExpire={() => setNotified(false)}
              label="Table reserved for you · claim within"
            />
          )}
        </section>

        {/* Live queue list */}
        <section className="lg:col-span-2 card-cream p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="swiss-eyebrow">Live queue</div>
              <div className="serif-heading text-2xl mt-1 text-aspire-navy">Now serving · auto-refreshing</div>
            </div>
            <LiveBadge label="Auto-refresh" />
          </div>

          <div className="space-y-2.5">
            {queue.map((e, i) => {
              const mine = joined?.id === e.id;
              return (
                <div
                  key={e.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    mine ? 'border-aspire-navy bg-aspire-soft' : 'border-aspire-border bg-white'
                  }`}
                >
                  <div className="h-11 w-11 rounded-full bg-aspire-taupe text-white flex items-center justify-center font-medium">
                    {e.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-aspire-navy">{e.name}{mine && <span className="ml-2 text-[0.7rem] uppercase tracking-widest text-aspire-taupe">You</span>}</span>
                      <span className="text-[0.72rem] text-navy-500">· party of {e.party}</span>
                    </div>
                    <div className="text-[0.78rem] text-navy-500">
                      <span className="inline-block h-2 w-2 rounded-full mr-1.5 align-middle" style={{ background: ZONE_META[e.preference].color }} />
                      {ZONE_META[e.preference].label} · joined {e.joinedAt}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[0.65rem] uppercase tracking-widest text-navy-500">Position</div>
                    <div className="text-aspire-navy text-lg">#{i + 1}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[0.65rem] uppercase tracking-widest text-navy-500">Wait</div>
                    <div className="text-aspire-navy text-lg tabular-nums">{e.estimatedWait}m</div>
                  </div>
                  <span className={`hidden sm:inline-block w-2.5 h-2.5 rounded-full ${
                    e.status === 'notified' ? 'bg-amber-500' : e.status === 'seated' ? 'bg-emerald-500' : 'bg-aspire-taupe'
                  }`} />
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Link href="/dashboard" className="text-[0.78rem] uppercase tracking-widest text-aspire-taupe hover:underline">
              Manage my visit
            </Link>
            <Link href="/tables" className="inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-widest text-aspire-navy">
              Or reserve a specific table <ArrowRight size={12} />
            </Link>
          </div>
        </section>
      </div>

      {/* Toast */}
      {notified && (
        <div className="fixed bottom-6 right-6 z-50">
          <NotificationToast
            zone={zone}
            tableId={zone === 'window' ? 'V2' : zone === 'workstation' ? 'W4' : zone === 'family' ? 'F3' : 'Q1'}
            onClaim={() => setNotified(false)}
            onDismiss={() => setNotified(false)}
          />
        </div>
      )}
    </div>
  );
}
