'use client';

import { useEffect, useRef, useState } from 'react';
import { Locale, locales } from '@/lib/translations';
import { useLocale } from './LocaleProvider';
import { Check, Globe } from './icons';

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const current = locales.find((l) => l.code === locale);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-9 px-3 rounded-full border border-ivory-200 dark:border-navy-700 flex items-center gap-2 text-[0.72rem] uppercase tracking-wider hover:border-gold-400 transition-colors"
        aria-label={t('lang.title')}
      >
        <Globe size={14} />
        <span>{current?.code.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-navy-700 shadow-lift border border-ivory-200/60 dark:border-navy-500/40 overflow-hidden animate-fade-in z-50">
          <div className="px-4 py-2.5 swiss-eyebrow border-b border-ivory-200/60 dark:border-navy-500/40">
            {t('lang.title')}
          </div>
          <ul>
            {locales.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => {
                    setLocale(l.code as Locale);
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-ivory-100 dark:hover:bg-navy-500/40 transition-colors text-[0.9rem]"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[0.75rem] uppercase tracking-wider text-navy-500 dark:text-ivory-200 w-6">
                      {l.code}
                    </span>
                    <span>{l.native}</span>
                  </span>
                  {l.code === locale && (
                    <Check size={14} className="text-gold-500" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
