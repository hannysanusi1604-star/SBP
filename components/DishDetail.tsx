'use client';

import { useEffect } from 'react';
import { Dish } from '@/lib/menu-data';
import { useLocale } from './LocaleProvider';
import { useOrder } from './OrderProvider';
import {
  AllergenIcon,
  DietIcon,
  Flame,
  Globe,
  Snowflake,
  SwissCross,
  X,
  Plus,
  Sparkle,
} from './icons';
import { SmartImage } from './SmartImage';

export function DishDetail({
  dish,
  onClose,
}: {
  dish: Dish | null;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const { add } = useOrder();

  useEffect(() => {
    if (!dish) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [dish, onClose]);

  if (!dish) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-navy-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-ivory-50 dark:bg-navy-700 rounded-t-3xl sm:rounded-3xl shadow-lift overflow-hidden sm:m-5 max-h-[92vh] flex flex-col animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] flex-shrink-0">
          <SmartImage src={dish.image} alt={dish.name} className="h-full w-full" priority />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 dark:bg-navy-900/70 flex items-center justify-center shadow-soft"
            aria-label={t('menu.close')}
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.66rem] uppercase tracking-wider ${
                dish.temperature === 'hot'
                  ? 'bg-white text-[#C0481E]'
                  : 'bg-white text-[#2E7BB8]'
              }`}
            >
              {dish.temperature === 'hot' ? (
                <Flame size={12} />
              ) : (
                <Snowflake size={12} />
              )}
              {dish.temperature === 'hot' ? t('menu.hot') : t('menu.cold')}
            </span>
            {dish.source === 'local' ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[0.66rem] uppercase tracking-wider text-navy-900">
                <SwissCross size={12} /> {t('menu.local')}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[0.66rem] uppercase tracking-wider text-navy-500">
                <Globe size={12} /> {t('menu.international')}
              </span>
            )}
            {dish.premium && (
              <span className="inline-flex items-center gap-1 rounded-full bg-navy-900 text-gold-300 px-2.5 py-1 text-[0.66rem] uppercase tracking-wider">
                <Sparkle size={12} /> Suite
              </span>
            )}
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex items-start justify-between gap-3">
            <h2 className="serif-heading text-3xl">{dish.name}</h2>
            {dish.price && (
              <span className="text-[0.95rem] tracking-wider text-gold-600 dark:text-gold-300">
                {dish.price}
              </span>
            )}
          </div>
          <p className="mt-3 text-[0.96rem] text-navy-500 dark:text-ivory-100 leading-relaxed">
            {dish.description}
          </p>

          {dish.chefNote && (
            <div className="mt-5 rounded-2xl border border-gold-500/30 bg-gold-500/5 p-4">
              <div className="swiss-eyebrow mb-1.5">{t('menu.chefnote')}</div>
              <p className="text-[0.9rem] italic text-navy-700 dark:text-ivory-100 leading-relaxed">
                {dish.chefNote}
              </p>
            </div>
          )}

          {dish.dietary.length > 0 && (
            <div className="mt-5">
              <div className="swiss-eyebrow mb-2">{t('menu.dietary')}</div>
              <div className="flex flex-wrap gap-2">
                {dish.dietary.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1.5 rounded-full bg-sage-500/10 text-sage-500 dark:bg-sage-500/20 px-3 py-1.5 text-[0.78rem]"
                  >
                    <DietIcon kind={d} size={14} />
                    {t(`diet.${d}`)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {dish.allergens.length > 0 && (
            <div className="mt-5">
              <div className="swiss-eyebrow mb-2">{t('menu.allergens')}</div>
              <div className="flex flex-wrap gap-2">
                {dish.allergens.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 rounded-full bg-ivory-200/60 dark:bg-navy-900/40 px-3 py-1.5 text-[0.78rem] text-navy-700 dark:text-ivory-100"
                  >
                    <AllergenIcon kind={a} size={14} />
                    {t(`allergen.${a}`)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {dish.premium && (
            <button
              onClick={() => {
                add(dish);
                onClose();
              }}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-navy-900 dark:bg-gold-500 text-ivory-50 dark:text-navy-900 uppercase tracking-wider text-[0.78rem] hover:opacity-90 transition-opacity"
            >
              <Plus size={16} /> {t('menu.order')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
