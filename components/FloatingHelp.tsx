'use client';

import { useEffect, useState } from 'react';
import { useLocale } from './LocaleProvider';
import { Bell, Check, QR, X } from './icons';

export function FloatingHelp() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [called, setCalled] = useState(false);

  useEffect(() => {
    if (!called) return;
    const tm = setTimeout(() => setCalled(false), 5000);
    return () => clearTimeout(tm);
  }, [called]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-5 z-40 h-14 w-14 rounded-full bg-navy-900 text-ivory-50 shadow-lift flex items-center justify-center hover:scale-105 active:scale-100 transition-transform"
        aria-label={t('help.title')}
      >
        <QR size={22} />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gold-400 ring-2 ring-ivory-50 dark:ring-navy-900" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-navy-900/30 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-navy-700 rounded-t-3xl sm:rounded-3xl shadow-lift overflow-hidden m-0 sm:m-5 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-5">
              <div>
                <div className="swiss-eyebrow">{t('home.qr.title')}</div>
                <h3 className="serif-heading text-2xl mt-1">{t('help.title')}</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-9 w-9 rounded-full border border-ivory-200 dark:border-navy-500 flex items-center justify-center"
                aria-label={t('help.close')}
              >
                <X size={16} />
              </button>
            </div>
            <p className="px-5 text-[0.95rem] text-navy-500 dark:text-ivory-100 leading-relaxed">
              {t('help.body')}
            </p>

            <div className="p-5">
              {!called ? (
                <button
                  onClick={() => setCalled(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-navy-900 dark:bg-gold-500 text-ivory-50 dark:text-navy-900 uppercase tracking-wider text-[0.78rem] hover:opacity-90 transition-opacity"
                >
                  <Bell size={16} /> {t('help.callstaff')}
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 py-3.5 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-300 uppercase tracking-wider text-[0.78rem]">
                  <Check size={16} /> {t('help.called')}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
