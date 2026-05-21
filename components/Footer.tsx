'use client';

import { useLocale } from './LocaleProvider';
import { SwissCross } from './icons';

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="mt-24 border-t border-ivory-200/60 dark:border-navy-700/60">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-sm bg-navy-900 flex items-center justify-center">
              <SwissCross size={18} />
            </div>
            <div className="leading-tight">
              <div className="serif-heading text-lg">{t('brand.line1')}</div>
              <div className="swiss-eyebrow">{t('brand.line2')}</div>
            </div>
          </div>
          <p className="mt-4 text-[0.88rem] text-navy-500 dark:text-ivory-100 leading-relaxed max-w-xs">
            {t('footer.note')}
          </p>
        </div>

        <div>
          <div className="swiss-eyebrow mb-3">{t('home.hours')}</div>
          <div className="space-y-1 text-[0.88rem] text-navy-500 dark:text-ivory-100">
            <div>Zürich Airport · Terminal A</div>
            <div>Genève Aéroport · Terminal 1</div>
            <div>Basel EuroAirport · Departures</div>
          </div>
        </div>

        <div>
          <div className="swiss-eyebrow mb-3">— Aspire</div>
          <div className="space-y-1 text-[0.88rem] text-navy-500 dark:text-ivory-100">
            <a href="/dietary" className="block hover:text-navy-900 dark:hover:text-ivory-50">
              {t('nav.dietary')}
            </a>
            <a href="/about" className="block hover:text-navy-900 dark:hover:text-ivory-50">
              {t('nav.about')}
            </a>
            <a href="/feedback" className="block hover:text-navy-900 dark:hover:text-ivory-50">
              {t('nav.feedback')}
            </a>
          </div>
        </div>
      </div>
      <div className="hairline mx-auto max-w-6xl" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-6 flex items-center justify-between text-[0.72rem] uppercase tracking-wider text-navy-500/70 dark:text-ivory-200/60">
        <span>© Aspire Lounge Switzerland</span>
        <span>Crafted in Zürich</span>
      </div>
    </footer>
  );
}
