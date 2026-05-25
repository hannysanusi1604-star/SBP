'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ReservationStepper, ReservationProgress } from '@/components/ReservationStepper';
import { BookingSummary } from '@/components/BookingSummary';
import { Check, ChevronRight } from '@/components/icons';
import { useBooking } from '@/components/BookingProvider';

export default function PaymentStep() {
  const { booking } = useBooking();
  const [method, setMethod] = useState<'card' | 'apple' | 'twint'>('card');
  const [accept, setAccept] = useState(false);
  const valid = accept;

  return (
    <div>
      <ReservationStepper current={4} />
      <ReservationProgress current={4} />

      <div className="text-center mt-6 mb-10">
        <h1 className="serif-heading text-4xl sm:text-6xl text-aspire-navy">Review and Payment</h1>
      </div>

      {/* Faster checkout banner — mirrors Aspire screenshot */}
      <div className="card-aspire p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="max-w-2xl">
          <div className="serif-heading text-2xl text-aspire-navy">Faster checkout?</div>
          <p className="mt-2 text-[0.95rem] text-aspire-navy/80 leading-relaxed">
            Log in or register for an account to check-out quickly and manage all of your bookings in one place. Logging in will update the price to display in your preferred currency.
          </p>
        </div>
        <button className="px-7 py-3 rounded-xl border border-aspire-navy text-aspire-navy bg-white hover:bg-aspire-navy hover:text-white transition-colors uppercase tracking-widest text-[0.78rem]">
          Login
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <BookingSummary />

          <section className="card-cream p-6 sm:p-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="serif-heading text-2xl text-aspire-navy">Payment method</h3>
              <span className="text-[0.7rem] uppercase tracking-widest text-navy-500">Secure · 3DS</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mb-6">
              <PayPill active={method === 'card'} onClick={() => setMethod('card')} label="Card" />
              <PayPill active={method === 'apple'} onClick={() => setMethod('apple')} label="Apple Pay" />
              <PayPill active={method === 'twint'} onClick={() => setMethod('twint')} label="TWINT" />
            </div>

            {method === 'card' && (
              <div className="space-y-4">
                <Input label="Card number" placeholder="1234 5678 9012 3456" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiry" placeholder="MM / YY" />
                  <Input label="CVC" placeholder="123" />
                </div>
                <Input label="Name on card" placeholder={booking.guestName || 'Lukas Zimmermann'} />
              </div>
            )}
            {method === 'apple' && (
              <div className="p-6 rounded-2xl bg-aspire-soft text-center text-aspire-navy">
                You&apos;ll confirm with Face ID on the next screen.
              </div>
            )}
            {method === 'twint' && (
              <div className="p-6 rounded-2xl bg-aspire-soft text-center text-aspire-navy">
                Scan the QR code with your TWINT app to complete the payment.
              </div>
            )}

            <label className="mt-6 flex items-start gap-3 text-[0.88rem] text-navy-500 cursor-pointer">
              <input
                type="checkbox"
                checked={accept}
                onChange={(e) => setAccept(e.target.checked)}
                className="mt-1 accent-aspire-navy"
              />
              <span>I agree to Aspire&apos;s lounge access terms and cancellation policy (free cancellation up to 24 hr before arrival).</span>
            </label>
          </section>
        </div>

        <aside className="lg:col-span-2 space-y-4">
          <div className="card-aspire p-6">
            <div className="swiss-eyebrow text-aspire-navy/70">Add-on</div>
            <div className="mt-2 serif-heading text-xl text-aspire-navy">Reserve a specific table</div>
            <p className="mt-2 text-[0.92rem] text-aspire-navy/80">
              Pick your seat — quiet, workstation, family or runway view — before you arrive.
            </p>
            <Link href="/tables" className="mt-4 inline-flex items-center gap-2 text-aspire-navy underline underline-offset-4">
              Open table map <ChevronRight size={14} />
            </Link>
          </div>

          <div className="card-cream p-6">
            <div className="swiss-eyebrow">Included</div>
            <ul className="mt-3 space-y-2 text-[0.92rem] text-aspire-navy">
              {[
                'Up to 2 hr 15 min stay',
                'Hot & cold buffet, premium bar',
                'Wi-Fi, workstations, showers',
                'Real-time queue notifications',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-4 w-4 rounded-full bg-aspire-taupe text-white flex items-center justify-center flex-shrink-0">
                    <Check size={10} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/dashboard?confirmed=1"
            aria-disabled={!valid}
            className={`btn-primary w-full justify-center text-center ${valid ? '' : 'opacity-40 pointer-events-none'}`}
          >
            Confirm reservation
            <ChevronRight size={14} />
          </Link>
          <p className="text-[0.72rem] text-navy-500 text-center">You won&apos;t be charged until your stay begins.</p>
        </aside>
      </div>
    </div>
  );
}

function PayPill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`py-3 rounded-xl border text-[0.85rem] transition-all ${
        active ? 'bg-aspire-navy text-white border-aspire-navy' : 'bg-white text-aspire-navy border-aspire-border hover:border-aspire-taupe'
      }`}
    >
      {label}
    </button>
  );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <div className="text-[0.72rem] uppercase tracking-widest text-navy-500 mb-2">{label}</div>
      <input placeholder={placeholder} className="input-cream" />
    </label>
  );
}
