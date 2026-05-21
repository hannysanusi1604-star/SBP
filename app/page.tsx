'use client';

import Link from 'next/link';
import { useLocale } from '@/components/LocaleProvider';
import { SmartImage } from '@/components/SmartImage';
import { ArrowRight, QR, Sparkle, SwissCross } from '@/components/icons';

export default function HomePage() {
  const { t } = useLocale();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <SmartImage
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="absolute inset-0 h-full w-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory-50/40 via-ivory-50/60 to-ivory-50 dark:from-navy-900/30 dark:via-navy-900/60 dark:to-navy-900" />
        </div>

        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-12 sm:pt-20 pb-16 sm:pb-28">
          <div className="max-w-2xl animate-fade-up">
            <div className="swiss-eyebrow">{t('home.eyebrow')}</div>
            <h1 className="serif-heading text-4xl sm:text-6xl md:text-7xl mt-3 leading-[1.02]">
              {t('home.welcome')}
            </h1>
            <p className="mt-5 text-[1.05rem] sm:text-[1.15rem] text-navy-500 dark:text-ivory-100 max-w-xl leading-relaxed">
              {t('home.subtitle')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/menu"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-navy-900 dark:bg-gold-500 text-ivory-50 dark:text-navy-900 uppercase tracking-wider text-[0.78rem] hover:opacity-90 transition-all"
              >
                {t('home.cta.menu')}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/premium"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-navy-900/30 dark:border-ivory-100/30 text-navy-900 dark:text-ivory-50 uppercase tracking-wider text-[0.78rem] hover:border-gold-500 transition-colors"
              >
                <Sparkle size={14} />
                {t('home.cta.premium')}
              </Link>
            </div>
          </div>

          {/* QR / table card */}
          <div className="mt-14 sm:mt-20 max-w-md card-glass rounded-3xl p-6 border border-white/60 shadow-soft animate-fade-up">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-navy-900 text-ivory-50 flex items-center justify-center flex-shrink-0">
                <QR size={22} />
              </div>
              <div>
                <div className="swiss-eyebrow">{t('home.qr.title')}</div>
                <p className="mt-1.5 text-[0.96rem] text-navy-700 dark:text-ivory-100 leading-relaxed">
                  {t('home.qr.body')}
                </p>
                <div className="mt-3 text-[0.75rem] uppercase tracking-wider text-gold-600 dark:text-gold-300">
                  {t('home.hours')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three-pillar quick links */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <FeatureCard
            href="/menu"
            eyebrow="01"
            title={t('nav.menu')}
            body="Today’s buffet, refreshed continuously by our chefs."
            image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
          />
          <FeatureCard
            href="/drinks"
            eyebrow="02"
            title={t('nav.drinks')}
            body="Espresso bar, alpine water and cold-pressed juices."
            image="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
          />
          <FeatureCard
            href="/premium"
            eyebrow="03"
            title={t('nav.premium')}
            body="Discreet table service for Suite Lounge guests."
            image="https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&w=1200&q=80"
            premium
          />
        </div>
      </section>

      {/* Story strip */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 mt-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-up">
            <div className="swiss-eyebrow inline-flex items-center gap-2">
              <SwissCross size={14} /> About our sourcing
            </div>
            <h2 className="serif-heading text-3xl sm:text-5xl mt-3">
              From Swiss valleys, lakes and farms.
            </h2>
            <p className="mt-4 text-navy-500 dark:text-ivory-100 leading-relaxed">
              We work with alpine cheesemakers, lake fisheries and family farms
              within 200 km of the lounge. Local first, world-aware — quietly.
            </p>
            <Link
              href="/about"
              className="mt-5 inline-flex items-center gap-2 text-gold-600 dark:text-gold-300 uppercase tracking-wider text-[0.78rem] hover:gap-3 transition-all"
            >
              {t('nav.about')} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-soft">
            <SmartImage
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80"
              alt="Swiss alpine pasture"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  href,
  eyebrow,
  title,
  body,
  image,
  premium,
}: {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  premium?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group relative rounded-3xl overflow-hidden bg-white dark:bg-navy-700/40 border border-ivory-200/60 dark:border-navy-500/30 shadow-soft hover:shadow-lift transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[5/3]">
        <SmartImage src={image} alt="" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-navy-900/10 to-transparent" />
        {premium && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-navy-900 text-gold-300 px-2.5 py-1 text-[0.66rem] uppercase tracking-wider">
            <Sparkle size={12} /> Suite
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between">
          <span className="swiss-eyebrow">{eyebrow}</span>
          <ArrowRight
            size={14}
            className="text-navy-500 group-hover:text-gold-500 transition-colors group-hover:translate-x-1"
          />
        </div>
        <h3 className="serif-heading text-2xl mt-1.5">{title}</h3>
        <p className="mt-2 text-[0.9rem] text-navy-500 dark:text-ivory-100 leading-relaxed">
          {body}
        </p>
      </div>
    </Link>
  );
}
