'use client';

import { TABLES, ZONE_META, type SeatingZone, type Table } from '@/lib/lounge-data';

type Props = {
  selectedId: string | null;
  filterZone: SeatingZone | null;
  onSelect: (table: Table) => void;
};

export function SeatingMap({ selectedId, filterZone, onSelect }: Props) {
  return (
    <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden border border-aspire-border bg-gradient-to-br from-aspire-soft to-white">
      {/* Floor markings */}
      <div className="absolute inset-0 opacity-40">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M5 0 L0 0 L0 5" stroke="#DADADA" strokeWidth="0.1" fill="none" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Window edge */}
      <div className="absolute top-0 right-0 h-full w-[18%] bg-gradient-to-l from-aspire-card/60 to-transparent">
        <div className="absolute right-3 top-3 swiss-eyebrow text-aspire-navy/70">Runway view</div>
      </div>
      {/* Entry */}
      <div className="absolute bottom-2 left-2 swiss-eyebrow text-aspire-navy/60">Entry</div>

      {/* Zone labels */}
      <ZoneLabel x={18} y={6}  label="Quiet Zone"  color={ZONE_META.quiet.color} />
      <ZoneLabel x={54} y={6}  label="Workstation" color={ZONE_META.workstation.color} />
      <ZoneLabel x={22} y={48} label="Family Area" color={ZONE_META.family.color} />
      <ZoneLabel x={80} y={6}  label="Window"      color={ZONE_META.window.color} />

      {/* Tables */}
      {TABLES.map((t) => {
        const dimmed = filterZone && t.zone !== filterZone;
        const selected = t.id === selectedId;
        const color = ZONE_META[t.zone].color;
        return (
          <button
            key={t.id}
            onClick={() => t.available && onSelect(t)}
            disabled={!t.available}
            aria-label={`Table ${t.id}, ${t.seats} seats, ${ZONE_META[t.zone].label}`}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[0.65rem] font-medium transition-all ${
              !t.available
                ? 'opacity-30 cursor-not-allowed'
                : dimmed
                ? 'opacity-30'
                : 'hover:scale-110'
            } ${selected ? 'ring-4 ring-aspire-navy scale-110 z-10' : ''}`}
            style={{
              left: `${t.position.x}%`,
              top: `${t.position.y}%`,
              width: `${28 + t.seats * 4}px`,
              height: `${28 + t.seats * 4}px`,
              background: t.available ? color : '#DADADA',
              color: '#1F2A44',
              boxShadow: selected
                ? '0 8px 22px -8px rgba(31,42,68,0.5)'
                : '0 4px 10px -4px rgba(31,42,68,0.2)',
            }}
          >
            {t.id}
          </button>
        );
      })}
    </div>
  );
}

function ZoneLabel({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <div
      className="absolute text-[0.65rem] uppercase tracking-widest text-aspire-navy/70"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span
        className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
        style={{ background: color }}
      />
      {label}
    </div>
  );
}
