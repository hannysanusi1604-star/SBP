'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLocale } from './LocaleProvider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SwissCross } from './icons';

export function Header() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = [
    { href: '/search', label: 'Lounges' },
    { href: '/reserve', label: 'Reserve' },
    { href: '/tables', label: 'Tables' },
    { href: '/queue', label: 'Queue' },
    { href: '/dashboard', label: 'My Stay' },
    { href: '/admin', label: 'Staff' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-aspire-bg/85 border-b border-aspire-border/60 dark:bg-navy-900/70 dark:border-navy-700/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3" aria-label="Aspire">
          <div className="leading-none">
            <div className="font-medium tracking-[0.42em] text-[1.05rem] text-aspire-navy">
              ASPIRE
            </div>
            <div className="swiss-eyebrow text-[0.55rem] mt-0.5">Lounge Reservations</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-[0.78rem] tracking-wide uppercase">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-1 transition-colors ${
                  active
                    ? 'text-navy-900 dark:text-ivory-50'
                    : 'text-navy-500 hover:text-navy-900 dark:hover:text-ivory-50'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-gold-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            className="md:hidden h-9 w-9 rounded-full border border-ivory-200 dark:border-navy-700 flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <span className="block w-4 h-px bg-current relative">
              <span className="absolute left-0 -top-1.5 block w-4 h-px bg-current" />
              <span className="absolute left-0 top-1.5 block w-4 h-px bg-current" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-ivory-200/60 dark:border-navy-700/60 bg-ivory-50/95 dark:bg-navy-900/95">
          <nav className="px-5 py-3 flex flex-col gap-1 text-[0.85rem] uppercase tracking-wide">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-2 ${
                  pathname === item.href
                    ? 'text-navy-900 dark:text-ivory-50'
                    : 'text-navy-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
