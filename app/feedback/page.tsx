'use client';

import { useState } from 'react';
import { useLocale } from '@/components/LocaleProvider';
import { dishes } from '@/lib/menu-data';
import { Check, Star } from '@/components/icons';

export default function FeedbackPage() {
  const { t } = useLocale();
  const [overall, setOverall] = useState(0);
  const [food, setFood] = useState(0);
  const [service, setService] = useState(0);
  const [dishId, setDishId] = useState('');
  const [dishRating, setDishRating] = useState(0);
  const [comment, setComment] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-md px-5 sm:px-8 pt-24 pb-16 text-center animate-fade-up">
        <div className="mx-auto h-16 w-16 rounded-full bg-gold-500/15 text-gold-600 flex items-center justify-center">
          <Check size={28} />
        </div>
        <h1 className="serif-heading text-3xl mt-5">{t('feedback.thanks')}</h1>
        <p className="mt-3 text-navy-500 dark:text-ivory-100 leading-relaxed">
          {t('footer.note')}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 sm:px-8 pt-10 pb-16">
      <div className="swiss-eyebrow">— Aspire</div>
      <h1 className="serif-heading text-4xl sm:text-5xl mt-2">
        {t('feedback.title')}
      </h1>
      <p className="mt-3 text-navy-500 dark:text-ivory-100 leading-relaxed">
        {t('feedback.subtitle')}
      </p>

      <form onSubmit={onSubmit} className="mt-10 space-y-8">
        <RatingRow
          label={t('feedback.overall')}
          value={overall}
          onChange={setOverall}
        />
        <RatingRow
          label={t('feedback.food')}
          value={food}
          onChange={setFood}
        />
        <RatingRow
          label={t('feedback.service')}
          value={service}
          onChange={setService}
        />

        <div>
          <label className="swiss-eyebrow block mb-3">
            {t('feedback.dishrating')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-3">
            <select
              value={dishId}
              onChange={(e) => setDishId(e.target.value)}
              className="lounge-input h-12 px-4 rounded-full bg-white dark:bg-navy-700/40 border border-ivory-200 dark:border-navy-500/30 text-[0.95rem]"
            >
              <option value="">{t('feedback.choose')}</option>
              {dishes.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <div className="h-12 px-4 rounded-full bg-white dark:bg-navy-700/40 border border-ivory-200 dark:border-navy-500/30 flex items-center justify-center">
              <Stars value={dishRating} onChange={setDishRating} />
            </div>
          </div>
        </div>

        <div>
          <label className="swiss-eyebrow block mb-3">
            {t('feedback.comment')}
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('feedback.commentpl')}
            rows={4}
            className="lounge-input w-full rounded-3xl bg-white dark:bg-navy-700/40 border border-ivory-200 dark:border-navy-500/30 px-4 py-3 text-[0.95rem]"
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-navy-900 dark:bg-gold-500 text-ivory-50 dark:text-navy-900 uppercase tracking-wider text-[0.78rem] hover:opacity-90 transition-opacity"
        >
          {t('feedback.submit')}
        </button>
      </form>
    </div>
  );
}

function RatingRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-[0.95rem]">{label}</div>
      <Stars value={value} onChange={onChange} />
    </div>
  );
}

function Stars({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="p-1 hover:scale-110 active:scale-100 transition-transform"
          aria-label={`${n} stars`}
        >
          <Star size={22} filled={n <= value} />
        </button>
      ))}
    </div>
  );
}
