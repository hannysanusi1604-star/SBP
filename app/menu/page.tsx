'use client';

import { MenuExplorer } from '@/components/MenuExplorer';
import { useLocale } from '@/components/LocaleProvider';

export default function MenuPage() {
  const { t } = useLocale();
  return (
    <div className="pb-16">
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 pb-6">
        <div className="swiss-eyebrow">— {t('menu.subtitle')}</div>
        <h1 className="serif-heading text-4xl sm:text-5xl mt-2">{t('menu.title')}</h1>
      </section>
      <MenuExplorer />
    </div>
  );
}
