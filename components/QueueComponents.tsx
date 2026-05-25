'use client';

import { useEffect, useState } from 'react';
import { ZONE_META, type SeatingZone } from '@/lib/lounge-data';
import { Bell, Check, X } from './icons';

export function LiveBadge({ label = 'Live', tone = 'green' }: { label?: string; tone?: 'green' | 'amber' | 'red' }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-aspire-border text-[0.7rem] uppercase tracking-widest text-aspire-navy">
      <span className={`live-dot ${tone === 'green' ? '' : tone}`} />
      {label}
    </span>
  );
}

export function CountdownTimer({
  seconds,
  onExpire,
  label = 'Claim within',
}: {
  seconds: number;
  onExpire?: () => void;
  label?: string;
}) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire?.();
      return;
    }
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, [remaining, onExpire]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const pct = (remaining / seconds) * 100;

  return (
    <div className="card-cream p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="swiss-eyebrow">{label}</div>
          <div className="serif-heading text-4xl mt-1 tabular-nums">{mm}:{ss}</div>
        </div>
        <div className="text-right">
          <div className="text-[0.7rem] uppercase tracking-widest text-navy-500">Auto-release</div>
          <div className="text-aspire-navy text-sm">{Math.ceil(remaining / 60)} min remaining</div>
        </div>
      </div>
      <div className="mt-4 h-1 w-full bg-aspire-soft rounded-full overflow-hidden">
        <div
          className="h-full bg-aspire-taupe transition-all duration-1000 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function NotificationToast({
  zone,
  tableId,
  onClaim,
  onDismiss,
}: {
  zone: SeatingZone;
  tableId: string;
  onClaim?: () => void;
  onDismiss?: () => void;
}) {
  return (
    <div className="glass-overlay rounded-2xl shadow-float p-5 max-w-md w-full animate-fade-up">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-full bg-aspire-navy text-white flex items-center justify-center">
          <Bell size={18} />
        </div>
        <div className="flex-1">
          <div className="swiss-eyebrow">Table available</div>
          <p className="mt-1 text-aspire-navy text-[0.98rem]">
            <strong className="font-medium">{ZONE_META[zone].label} #{tableId}</strong> is ready for you. Please claim within 15 minutes.
          </p>
          <div className="mt-4 flex gap-2">
            <button onClick={onClaim} className="btn-primary py-2.5 px-4 text-[0.7rem]">
              <Check size={14} /> Claim
            </button>
            <button
              onClick={onDismiss}
              className="px-4 py-2.5 rounded-full border border-aspire-border text-[0.7rem] uppercase tracking-widest text-navy-500 hover:text-aspire-navy"
            >
              Release
            </button>
          </div>
        </div>
        <button onClick={onDismiss} aria-label="Close" className="text-navy-500 hover:text-aspire-navy">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export function QueueTicker({ items }: { items: string[] }) {
  const seq = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-aspire-border bg-aspire-soft/60">
      <div className="flex whitespace-nowrap animate-ticker py-3">
        {seq.map((it, i) => (
          <span key={i} className="px-8 text-[0.78rem] uppercase tracking-widest text-aspire-navy/80">
            <span className="text-aspire-taupe mr-2">●</span>{it}
          </span>
        ))}
      </div>
    </div>
  );
}

export function OccupancyBars({ data }: { data: { hour: string; value: number }[] }) {
  return (
    <div className="grid grid-cols-15 gap-1.5 items-end h-40" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
      {data.map((d) => {
        const h = Math.max(4, d.value);
        const tone =
          d.value > 80 ? '#8E4A2E' : d.value > 65 ? '#B58062' : d.value > 45 ? '#C8A98F' : '#DCC9B9';
        return (
          <div key={d.hour} className="flex flex-col items-center gap-1 group">
            <div
              className="w-full rounded-t-md transition-all group-hover:opacity-80"
              style={{ height: `${h}%`, background: tone }}
              title={`${d.hour}:00 — ${d.value}% full`}
            />
            <span className="text-[0.6rem] text-navy-500">{d.hour}</span>
          </div>
        );
      })}
    </div>
  );
}
