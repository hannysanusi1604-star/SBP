'use client';

import { useLocale } from '@/components/LocaleProvider';
import { SmartImage } from '@/components/SmartImage';

export default function DrinksPage() {
  const { t } = useLocale();
  const stations = [
    {
      key: 'station1',
      img: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1400&q=80',
    },
    {
      key: 'station2',
      img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=1400&q=80',
    },
    {
      key: 'station3',
      img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1400&q=80',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 pb-16">
      <div className="swiss-eyebrow">— Aspire</div>
      <h1 className="serif-heading text-4xl sm:text-5xl mt-2">
        {t('drinks.title')}
      </h1>
      <p className="mt-3 text-navy-500 dark:text-ivory-100 max-w-2xl leading-relaxed">
        {t('drinks.subtitle')}
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {stations.map((s, i) => (
          <div
            key={s.key}
            className="rounded-3xl overflow-hidden bg-white dark:bg-navy-700/40 border border-ivory-200/60 dark:border-navy-500/30 shadow-soft animate-fade-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative aspect-[4/3]">
              <SmartImage src={s.img} alt="" className="h-full w-full" />
            </div>
            <div className="p-6">
              <div className="swiss-eyebrow">0{i + 1}</div>
              <h3 className="serif-heading text-2xl mt-1.5">
                {t(`drinks.${s.key}.title`)}
              </h3>
              <p className="mt-2 text-[0.92rem] text-navy-500 dark:text-ivory-100 leading-relaxed">
                {t(`drinks.${s.key}.body`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
