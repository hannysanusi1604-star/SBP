'use client';

import { useLocale } from '@/components/LocaleProvider';
import { AllergenIcon, DietIcon } from '@/components/icons';
import { Allergen, Dietary } from '@/lib/menu-data';

const dietary: Dietary[] = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'halal-friendly',
  'nut-free',
  'dairy-free',
];

const allergens: Allergen[] = [
  'gluten',
  'dairy',
  'nuts',
  'shellfish',
  'eggs',
  'soy',
  'sesame',
];

export default function DietaryPage() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-10 pb-16">
      <div className="swiss-eyebrow">— Aspire</div>
      <h1 className="serif-heading text-4xl sm:text-5xl mt-2">
        {t('dietary.title')}
      </h1>
      <p className="mt-3 text-navy-500 dark:text-ivory-100 max-w-2xl leading-relaxed">
        {t('dietary.subtitle')}
      </p>

      <section className="mt-10">
        <h2 className="swiss-eyebrow mb-4">{t('menu.dietary')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {dietary.map((d) => (
            <div
              key={d}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-navy-700/40 border border-ivory-200/60 dark:border-navy-500/30"
            >
              <div className="h-10 w-10 rounded-full bg-sage-500/15 text-sage-500 flex items-center justify-center">
                <DietIcon kind={d} size={18} />
              </div>
              <div className="text-[0.9rem]">{t(`diet.${d}`)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="swiss-eyebrow mb-4">{t('menu.allergens')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {allergens.map((a) => (
            <div
              key={a}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-navy-700/40 border border-ivory-200/60 dark:border-navy-500/30"
            >
              <div className="h-10 w-10 rounded-full bg-ivory-200/60 dark:bg-navy-900/40 text-navy-700 dark:text-ivory-100 flex items-center justify-center">
                <AllergenIcon kind={a} size={18} />
              </div>
              <div className="text-[0.9rem]">{t(`allergen.${a}`)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-gold-500/30 bg-gold-500/5 p-6 sm:p-8">
        <div className="swiss-eyebrow">— important</div>
        <p className="mt-2 text-[0.98rem] leading-relaxed text-navy-700 dark:text-ivory-100">
          {t('dietary.contact')}
        </p>
      </section>
    </div>
  );
}
