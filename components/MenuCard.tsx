'use client';

import { Dish } from '@/lib/menu-data';
import { AllergenIcon, DietIcon, Flame, Snowflake, SwissCross, Globe, Sparkle, ArrowRight } from './icons';
import { useLocale } from './LocaleProvider';
import { SmartImage } from './SmartImage';

type Props = {
  dish: Dish;
  onOpen: () => void;
};

export function MenuCard({ dish, onOpen }: Props) {
  const { t } = useLocale();

  return (
    <button
      onClick={onOpen}
      className="group text-left bg-white/80 dark:bg-navy-700/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-ivory-200/60 dark:border-navy-500/30 shadow-soft hover:shadow-lift transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 animate-fade-up"
    >
      <div className="relative aspect-[4/3]">
        <SmartImage src={dish.image} alt={dish.name} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          {dish.source === 'local' ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-navy-900/70 px-2.5 py-1 text-[0.66rem] uppercase tracking-wider text-navy-900 dark:text-ivory-50"
              title={t('menu.local')}
            >
              <SwissCross size={12} /> {t('menu.local')}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-navy-900/60 px-2.5 py-1 text-[0.66rem] uppercase tracking-wider text-navy-500 dark:text-ivory-100">
              <Globe size={12} /> {t('menu.international')}
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {dish.premium && (
            <span className="inline-flex items-center gap-1 rounded-full bg-navy-900 text-gold-300 px-2.5 py-1 text-[0.66rem] uppercase tracking-wider">
              <Sparkle size={12} /> Suite
            </span>
          )}
          <span
            className={`h-7 w-7 rounded-full flex items-center justify-center ${
              dish.temperature === 'hot'
                ? 'bg-white/90 text-[#C0481E]'
                : 'bg-white/90 text-[#2E7BB8]'
            }`}
            title={dish.temperature === 'hot' ? t('menu.hot') : t('menu.cold')}
          >
            {dish.temperature === 'hot' ? <Flame size={13} /> : <Snowflake size={13} />}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="serif-heading text-[1.3rem] leading-tight">
            {dish.name}
          </h3>
          {dish.price && (
            <span className="text-[0.75rem] tracking-wider text-gold-600 dark:text-gold-300 whitespace-nowrap pt-1">
              {dish.price}
            </span>
          )}
        </div>
        <p className="mt-2 text-[0.88rem] text-navy-500 dark:text-ivory-100 leading-relaxed line-clamp-2">
          {dish.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-navy-500 dark:text-ivory-100">
            {dish.dietary.slice(0, 3).map((d) => (
              <span
                key={d}
                className="h-7 w-7 rounded-full bg-ivory-100 dark:bg-navy-900/40 flex items-center justify-center"
                title={t(`diet.${d}`)}
              >
                <DietIcon kind={d} size={14} />
              </span>
            ))}
            {dish.allergens.length > 0 && (
              <span className="ml-1 inline-flex items-center gap-1 text-[0.65rem] uppercase tracking-wider text-navy-500/70 dark:text-ivory-200/70">
                <span className="hidden sm:inline">{t('menu.allergens')}</span>
                {dish.allergens.slice(0, 3).map((a) => (
                  <AllergenIcon
                    key={a}
                    kind={a}
                    size={14}
                    className="opacity-70"
                  />
                ))}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-wider text-gold-600 dark:text-gold-300 opacity-0 group-hover:opacity-100 transition-opacity">
            {t('menu.viewdetails')} <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </button>
  );
}
