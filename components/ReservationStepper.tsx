'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight } from './icons';

const STEPS = [
  { n: 1, label: 'Lounge',  href: '/reserve' },
  { n: 2, label: 'Schedule', href: '/reserve/schedule' },
  { n: 3, label: 'Guests',   href: '/reserve/guests' },
  { n: 4, label: 'Payment',  href: '/reserve/payment' },
];

export function ReservationStepper({ current }: { current: 1 | 2 | 3 | 4 }) {
  const back = current > 1 ? STEPS[current - 2].href : '/';
  return (
    <div className="flex items-center justify-center gap-3 text-[0.92rem] text-aspire-navy">
      <Link
        href={back}
        className="inline-flex items-center gap-1.5 text-navy-500 hover:text-aspire-navy transition-colors"
      >
        <span className="inline-block rotate-180"><ChevronRight size={14} /></span>
        Back
      </Link>
      <span className="step-pill">Step {current} of 4</span>
    </div>
  );
}

export function ReservationProgress({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <div className="mx-auto max-w-3xl mt-6 mb-2 grid grid-cols-4 gap-3 px-5">
      {STEPS.map((s) => {
        const active = s.n === current;
        const done = s.n < current;
        return (
          <div
            key={s.n}
            className={`flex items-center gap-2 px-3 py-2 rounded-full border text-[0.7rem] uppercase tracking-wider transition-all ${
              active
                ? 'bg-aspire-navy text-white border-aspire-navy'
                : done
                ? 'bg-aspire-card text-aspire-navy border-aspire-card'
                : 'bg-white text-navy-500 border-aspire-border'
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full flex items-center justify-center text-[0.65rem] ${
                active ? 'bg-white text-aspire-navy' : done ? 'bg-aspire-taupe text-white' : 'bg-aspire-soft text-navy-500'
              }`}
            >
              {s.n}
            </span>
            <span className="hidden sm:inline">{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function StepperActions({
  backHref,
  nextHref,
  nextLabel = 'Continue',
  disabled,
  onNext,
}: {
  backHref?: string;
  nextHref?: string;
  nextLabel?: string;
  disabled?: boolean;
  onNext?: () => void;
}) {
  return (
    <div className="mt-10 flex items-center justify-between gap-4">
      {backHref ? (
        <Link href={backHref} className="btn-outline">
          <span className="rotate-180 inline-block"><ChevronRight size={14} /></span>
          Back
        </Link>
      ) : <span />}
      {nextHref ? (
        <Link
          href={nextHref}
          onClick={onNext}
          aria-disabled={disabled}
          className={`btn-primary ${disabled ? 'opacity-40 pointer-events-none' : ''}`}
        >
          {nextLabel}
          <ArrowRight size={14} />
        </Link>
      ) : (
        <button
          onClick={onNext}
          disabled={disabled}
          className={`btn-primary ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          {nextLabel}
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}
