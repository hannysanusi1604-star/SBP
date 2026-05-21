'use client';

import { useMemo, useState } from 'react';
import { useLocale } from '@/components/LocaleProvider';
import { useOrder, OrderStatus } from '@/components/OrderProvider';
import { dishes } from '@/lib/menu-data';
import { SmartImage } from '@/components/SmartImage';
import {
  Check,
  Minus,
  Plus,
  Sparkle,
  X,
  ArrowRight,
} from '@/components/icons';

const STATUS_ORDER: OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'ontheway',
  'delivered',
];

export default function PremiumPage() {
  const { t } = useLocale();
  const {
    items,
    add,
    remove,
    status,
    placeOrder,
    etaMinutes,
    reference,
    note,
    setNote,
    clear,
  } = useOrder();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const premiumDishes = useMemo(
    () => dishes.filter((d) => d.premium),
    [],
  );

  const total = items.length;
  const totalLabel =
    items.reduce((acc, i) => acc + i.qty, 0) + (total === 1 ? ' item' : ' items');

  const onPlaceOrder = () => {
    placeOrder();
    setConfirmOpen(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 pb-16">
      <div className="flex items-center gap-2">
        <Sparkle size={16} className="text-gold-500" />
        <span className="swiss-eyebrow text-gold-600 dark:text-gold-300">
          {t('premium.eyebrow')}
        </span>
      </div>
      <h1 className="serif-heading text-4xl sm:text-5xl mt-2">
        {t('premium.title')}
      </h1>
      <p className="mt-3 text-navy-500 dark:text-ivory-100 max-w-2xl leading-relaxed">
        {t('premium.subtitle')}
      </p>
      <div className="mt-4 text-[0.78rem] uppercase tracking-wider text-gold-600 dark:text-gold-300">
        {t('premium.access')}
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {premiumDishes.map((d) => {
            const inOrder = items.find((i) => i.dish.id === d.id);
            return (
              <div
                key={d.id}
                className="rounded-3xl overflow-hidden bg-white dark:bg-navy-700/40 border border-ivory-200/60 dark:border-navy-500/30 shadow-soft"
              >
                <div className="relative aspect-[5/3]">
                  <SmartImage src={d.image} alt={d.name} className="h-full w-full" />
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-navy-900 text-gold-300 px-2.5 py-1 text-[0.66rem] uppercase tracking-wider">
                    <Sparkle size={12} /> Suite
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="serif-heading text-xl leading-tight">
                      {d.name}
                    </h3>
                    <span className="text-[0.8rem] tracking-wider text-gold-600 dark:text-gold-300 whitespace-nowrap pt-1">
                      {d.price}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.85rem] text-navy-500 dark:text-ivory-100 leading-relaxed line-clamp-2">
                    {d.description}
                  </p>
                  <div className="mt-4">
                    {inOrder ? (
                      <div className="inline-flex items-center gap-3 rounded-full border border-navy-900/15 dark:border-ivory-100/15 px-2 py-1.5">
                        <button
                          onClick={() => remove(d.id)}
                          className="h-7 w-7 rounded-full bg-ivory-100 dark:bg-navy-900/50 flex items-center justify-center"
                          aria-label="Remove one"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center text-[0.9rem]">
                          {inOrder.qty}
                        </span>
                        <button
                          onClick={() => add(d)}
                          className="h-7 w-7 rounded-full bg-navy-900 dark:bg-gold-500 text-ivory-50 dark:text-navy-900 flex items-center justify-center"
                          aria-label="Add one"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => add(d)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-navy-900/20 dark:border-ivory-100/30 text-[0.78rem] uppercase tracking-wider hover:border-gold-500 transition-colors"
                      >
                        <Plus size={14} /> {t('premium.cta')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order panel */}
        <aside className="lg:sticky lg:top-32 self-start">
          <div className="rounded-3xl bg-navy-900 text-ivory-50 p-6 shadow-lift">
            <div className="flex items-center justify-between">
              <div className="swiss-eyebrow text-gold-300">
                {t('premium.order.title')}
              </div>
              {items.length > 0 && (
                <button
                  onClick={clear}
                  className="text-[0.7rem] uppercase tracking-wider text-ivory-200/70 hover:text-ivory-50 inline-flex items-center gap-1"
                >
                  <X size={12} /> {t('menu.clear')}
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <p className="mt-4 text-[0.92rem] text-ivory-100/80 leading-relaxed">
                {t('premium.order.empty')}
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-ivory-50/10">
                {items.map((i) => (
                  <li
                    key={i.dish.id}
                    className="py-3 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-[0.95rem]">{i.dish.name}</div>
                      <div className="text-[0.72rem] tracking-wider text-gold-300/80">
                        {i.dish.price} · ×{i.qty}
                      </div>
                    </div>
                    <button
                      onClick={() => remove(i.dish.id)}
                      className="h-7 w-7 rounded-full bg-ivory-50/10 flex items-center justify-center hover:bg-ivory-50/20"
                      aria-label="Remove"
                    >
                      <Minus size={13} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4">
              <label className="swiss-eyebrow text-gold-300 block mb-2">
                {t('premium.order.note')}
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t('premium.order.notepl')}
                rows={2}
                className="lounge-input w-full rounded-2xl bg-ivory-50/5 border border-ivory-50/15 px-4 py-3 text-[0.9rem] placeholder:text-ivory-100/40 focus:bg-ivory-50/10"
              />
            </div>

            <div className="mt-5 flex items-center justify-between text-[0.8rem] tracking-wider text-ivory-100/80">
              <span>{t('premium.order.total')}</span>
              <span>{totalLabel}</span>
            </div>

            <button
              disabled={items.length === 0}
              onClick={onPlaceOrder}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-gold-500 text-navy-900 uppercase tracking-wider text-[0.78rem] hover:bg-gold-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {t('premium.order.place')} <ArrowRight size={14} />
            </button>

            {status !== 'idle' && (
              <div className="mt-5">
                <div className="text-[0.72rem] uppercase tracking-wider text-gold-300 mb-2">
                  {t('premium.estimated')} ·{' '}
                  <span className="text-ivory-50">
                    {etaMinutes} {t('premium.minutes')}
                  </span>
                </div>
                <OrderStatusTrack status={status} />
              </div>
            )}
          </div>
        </aside>
      </div>

      {confirmOpen && status !== 'idle' && (
        <ConfirmModal
          reference={reference}
          eta={etaMinutes}
          onClose={() => setConfirmOpen(false)}
        />
      )}
    </div>
  );
}

function OrderStatusTrack({ status }: { status: OrderStatus }) {
  const { t } = useLocale();
  const currentIdx = STATUS_ORDER.indexOf(status);
  return (
    <ol className="space-y-2">
      {STATUS_ORDER.map((s, i) => {
        const done = i <= currentIdx;
        return (
          <li key={s} className="flex items-center gap-3">
            <span
              className={`h-5 w-5 rounded-full flex items-center justify-center transition-colors ${
                done ? 'bg-gold-400 text-navy-900' : 'bg-ivory-50/10 text-ivory-100/60'
              }`}
            >
              {done ? <Check size={12} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
            </span>
            <span
              className={`text-[0.85rem] ${
                done ? 'text-ivory-50' : 'text-ivory-100/50'
              }`}
            >
              {t(`premium.status.${s}`)}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function ConfirmModal({
  reference,
  eta,
  onClose,
}: {
  reference: string | null;
  eta: number;
  onClose: () => void;
}) {
  const { t } = useLocale();
  return (
    <div
      className="fixed inset-0 z-50 bg-navy-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-navy-700 rounded-t-3xl sm:rounded-3xl shadow-lift overflow-hidden sm:m-5 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-7 text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-gold-500/15 text-gold-600 flex items-center justify-center">
            <Check size={26} />
          </div>
          <div className="swiss-eyebrow mt-4">{t('premium.confirm.ref')}</div>
          <div className="serif-heading text-3xl mt-1">{reference}</div>
          <h3 className="serif-heading text-2xl mt-4">
            {t('premium.confirm.title')}
          </h3>
          <p className="mt-2 text-[0.95rem] text-navy-500 dark:text-ivory-100 leading-relaxed">
            {t('premium.confirm.body')}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-ivory-100 dark:bg-navy-900/50 px-4 py-2 text-[0.8rem] tracking-wider">
            {t('premium.confirm.eta')} ·{' '}
            <span className="text-gold-600 dark:text-gold-300">
              {eta} {t('premium.minutes')}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full py-4 border-t border-ivory-200/60 dark:border-navy-500/30 uppercase tracking-wider text-[0.78rem]"
        >
          {t('menu.close')}
        </button>
      </div>
    </div>
  );
}
