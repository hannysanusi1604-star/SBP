'use client';

import { useLocale } from '@/components/LocaleProvider';
import { SmartImage } from '@/components/SmartImage';
import { SwissCross } from '@/components/icons';

export default function AboutPage() {
  const { t } = useLocale();
  const items = [
    {
      key: 'farmers',
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
    },
    {
      key: 'cheese',
      img: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1400&q=80',
    },
    {
      key: 'water',
      img: 'https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&w=1400&q=80',
    },
    {
      key: 'coffee',
      img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 pb-16">
      <div className="swiss-eyebrow inline-flex items-center gap-2">
        <SwissCross size={14} /> Swiss sourcing
      </div>
      <h1 className="serif-heading text-4xl sm:text-5xl mt-2">
        {t('about.title')}
      </h1>
      <p className="mt-3 text-navy-500 dark:text-ivory-100 max-w-2xl leading-relaxed">
        {t('about.subtitle')}
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((it, i) => (
          <article
            key={it.key}
            className="rounded-3xl overflow-hidden bg-white dark:bg-navy-700/40 border border-ivory-200/60 dark:border-navy-500/30 shadow-soft animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="relative aspect-[5/3]">
              <SmartImage src={it.img} alt="" className="h-full w-full" />
            </div>
            <div className="p-6">
              <div className="swiss-eyebrow">0{i + 1}</div>
              <h3 className="serif-heading text-2xl mt-1.5">
                {t(`about.${it.key}.title`)}
              </h3>
              <p className="mt-2 text-[0.92rem] text-navy-500 dark:text-ivory-100 leading-relaxed">
                {t(`about.${it.key}.body`)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
