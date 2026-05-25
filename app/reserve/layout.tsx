import { X } from '@/components/icons';
import Link from 'next/link';

export default function ReserveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[80vh] pb-24">
      {/* Modal-style top bar like Aspire screenshot */}
      <div className="relative">
        <div className="mx-auto max-w-5xl pt-8 pb-2 px-5 flex items-center justify-center">
          <div className="font-medium tracking-[0.42em] text-lg text-aspire-navy">ASPIRE</div>
        </div>
        <Link
          href="/"
          aria-label="Close"
          className="absolute top-7 right-5 sm:right-10 h-10 w-10 rounded-full border border-aspire-border bg-white text-aspire-navy flex items-center justify-center hover:bg-aspire-soft"
        >
          <X size={16} />
        </Link>
      </div>
      <div className="mx-auto max-w-5xl px-5">{children}</div>
    </div>
  );
}
