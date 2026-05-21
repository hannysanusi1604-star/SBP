'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Dish, Dietary, categories, dishes } from '@/lib/menu-data';
import { MenuCard } from './MenuCard';
import { DishDetail } from './DishDetail';
import { useLocale } from './LocaleProvider';
import { DietIcon, Search, Sliders, X } from './icons';

const dietaryFilters: Dietary[] = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'halal-friendly',
  'nut-free',
  'dairy-free',
];

export function MenuExplorer({ initialCategory }: { initialCategory?: string }) {
  const { t } = useLocale();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(initialCategory || 'starters');
  const [filters, setFilters] = useState<Dietary[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState<Dish | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dishes.filter((d) => {
      if (filters.length && !filters.every((f) => d.dietary.includes(f)))
        return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      );
    });
  }, [filters, query]);

  const grouped = useMemo(() => {
    const map: Record<string, Dish[]> = {};
    for (const cat of categories) map[cat.id] = [];
    for (const d of filtered) map[d.category]?.push(d);
    return map;
  }, [filtered]);

  const scrollToCategory = (id: string) => {
    setActive(id);
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 110;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const offset = 150;
      let current = active;
      for (const cat of categories) {
        const el = sectionRefs.current[cat.id];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top - offset <= 0) current = cat.id;
      }
      if (current !== active) setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [active]);

  const toggleFilter = (f: Dietary) => {
    setFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );
  };

  return (
    <div>
      {/* Search + filter bar */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-500"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('menu.search')}
              className="lounge-input w-full h-12 pl-11 pr-4 rounded-full bg-white dark:bg-navy-700/40 border border-ivory-200 dark:border-navy-500/40 text-[0.95rem] placeholder:text-navy-500/60"
            />
          </div>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={`h-12 px-5 rounded-full border flex items-center gap-2 uppercase tracking-wider text-[0.72rem] transition-colors ${
              filters.length || filtersOpen
                ? 'bg-navy-900 dark:bg-gold-500 text-ivory-50 dark:text-navy-900 border-navy-900 dark:border-gold-500'
                : 'border-ivory-200 dark:border-navy-500/40'
            }`}
          >
            <Sliders size={14} /> {t('menu.filters')}
            {filters.length > 0 && (
              <span className="ml-1 h-5 min-w-5 px-1.5 rounded-full bg-gold-400 text-navy-900 text-[0.65rem] flex items-center justify-center">
                {filters.length}
              </span>
            )}
          </button>
        </div>

        {filtersOpen && (
          <div className="mt-3 p-5 rounded-3xl bg-white dark:bg-navy-700/40 border border-ivory-200/60 dark:border-navy-500/30 animate-fade-up">
            <div className="flex items-center justify-between mb-3">
              <div className="swiss-eyebrow">{t('menu.filters')}</div>
              {filters.length > 0 && (
                <button
                  onClick={() => setFilters([])}
                  className="text-[0.72rem] uppercase tracking-wider text-navy-500 inline-flex items-center gap-1 hover:text-navy-900 dark:hover:text-ivory-50"
                >
                  <X size={12} /> {t('menu.clear')}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {dietaryFilters.map((f) => {
                const on = filters.includes(f);
                return (
                  <button
                    key={f}
                    onClick={() => toggleFilter(f)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.8rem] transition-colors border ${
                      on
                        ? 'bg-sage-500 text-white border-sage-500'
                        : 'bg-ivory-100 dark:bg-navy-900/40 text-navy-700 dark:text-ivory-100 border-ivory-200 dark:border-navy-500/30 hover:border-sage-500/50'
                    }`}
                  >
                    <DietIcon kind={f} size={14} />
                    {t(`diet.${f}`)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sticky category nav */}
      <div
        ref={navRef}
        className="sticky top-[57px] z-30 mt-5 bg-ivory-50/85 dark:bg-navy-900/80 backdrop-blur-md border-b border-ivory-200/60 dark:border-navy-700/40"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3 -mx-2 px-2">
            {categories.map((c) => {
              const on = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => scrollToCategory(c.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[0.78rem] uppercase tracking-wider transition-all ${
                    on
                      ? 'bg-navy-900 dark:bg-gold-500 text-ivory-50 dark:text-navy-900'
                      : 'text-navy-500 dark:text-ivory-100 hover:text-navy-900 dark:hover:text-ivory-50'
                  }`}
                >
                  {t(c.labelKey)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 space-y-14">
        {categories.map((cat) => {
          const list = grouped[cat.id] || [];
          if (!list.length && filters.length === 0 && !query) return null;
          return (
            <section
              key={cat.id}
              ref={(el) => {
                sectionRefs.current[cat.id] = el;
              }}
              id={cat.id}
              className="scroll-mt-32"
            >
              <div className="flex items-end justify-between mb-5">
                <div>
                  <div className="swiss-eyebrow">— {t('menu.subtitle')}</div>
                  <h2 className="serif-heading text-3xl sm:text-4xl mt-1.5">
                    {t(cat.labelKey)}
                  </h2>
                </div>
                <span className="text-[0.75rem] tracking-wider text-navy-500/70 dark:text-ivory-200/60">
                  {list.length} {list.length === 1 ? 'dish' : 'dishes'}
                </span>
              </div>

              {list.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-ivory-200 dark:border-navy-500/40 p-10 text-center text-navy-500 dark:text-ivory-200">
                  {t('menu.empty')}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {list.map((d) => (
                    <MenuCard
                      key={d.id}
                      dish={d}
                      onOpen={() => setSelected(d)}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <DishDetail dish={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
