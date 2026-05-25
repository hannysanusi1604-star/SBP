'use client';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-aspire-border/60 bg-aspire-bg">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-4 gap-10">
        <div>
          <div className="font-medium tracking-[0.42em] text-lg text-aspire-navy">ASPIRE</div>
          <div className="swiss-eyebrow mt-1">Lounge Reservations</div>
          <p className="mt-4 text-[0.88rem] text-navy-500 leading-relaxed max-w-xs">
            Premium airport lounges across Europe. Reserve a table, join the queue, or check in with a tap.
          </p>
        </div>

        <div>
          <div className="swiss-eyebrow mb-3">Reserve</div>
          <div className="space-y-1.5 text-[0.88rem] text-navy-500">
            <a href="/reserve" className="block hover:text-aspire-navy">Lounge booking</a>
            <a href="/tables" className="block hover:text-aspire-navy">Table selection</a>
            <a href="/queue" className="block hover:text-aspire-navy">Virtual queue</a>
            <a href="/dashboard" className="block hover:text-aspire-navy">My bookings</a>
          </div>
        </div>

        <div>
          <div className="swiss-eyebrow mb-3">Lounges</div>
          <div className="space-y-1.5 text-[0.88rem] text-navy-500">
            <div>Zurich · ZRH</div>
            <div>Geneva · GVA</div>
            <div>Basel · BSL</div>
            <div>Aberdeen · ABZ</div>
          </div>
        </div>

        <div>
          <div className="swiss-eyebrow mb-3">Company</div>
          <div className="space-y-1.5 text-[0.88rem] text-navy-500">
            <a href="/admin" className="block hover:text-aspire-navy">Operator portal</a>
            <a href="/menu" className="block hover:text-aspire-navy">In-lounge menu</a>
            <a href="/about" className="block hover:text-aspire-navy">About</a>
            <a href="/feedback" className="block hover:text-aspire-navy">Feedback</a>
          </div>
        </div>
      </div>
      <div className="hairline mx-auto max-w-7xl" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 flex items-center justify-between text-[0.72rem] uppercase tracking-wider text-navy-500/70">
        <span>© Aspire Reservations</span>
        <span>Designed with calm.</span>
      </div>
    </footer>
  );
}
