'use client';

import { useTranslations, useMessages } from 'next-intl';

interface RouteBlock {
  title: string;
  duration?: string;
  overview?: string;
  desc?: string;
  steps: string[];
}

export default function ItinerariesSection() {
  const t = useTranslations('itineraries');
  const messages = useMessages() as any;
  const data = (messages?.itineraries || {}) as {
    title: string;
    subtitle: string;
    generalTitle: string;
    halfDay: RouteBlock;
    fullDay: RouteBlock;
    audienceTitle: string;
    families: RouteBlock;
    photography: RouteBlock;
    accessible: RouteBlock;
  };

  return (
    <section id="itineraries" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <h3 className="font-semibold mb-4 text-lg" style={{ color: 'var(--text-primary)' }}>
          {t('generalTitle')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <RouteCard block={data.halfDay} tone="duration" />
          <RouteCard block={data.fullDay} tone="duration" />
        </div>

        <h3 className="font-semibold mb-4 text-lg" style={{ color: 'var(--text-primary)' }}>
          {t('audienceTitle')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <RouteCard block={data.families} tone="audience" />
          <RouteCard block={data.photography} tone="audience" />
          <RouteCard block={data.accessible} tone="audience" />
        </div>
      </div>
    </section>
  );
}

function RouteCard({ block, tone }: { block: RouteBlock; tone: 'duration' | 'audience' }) {
  const badge = block.duration || tone === 'audience' ? block.duration : undefined;
  return (
    <div
      className="rounded-xl p-5 h-full"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <h4 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
          {block.title}
        </h4>
        {block.duration && (
          <span
            className="text-xs px-2 py-1 rounded-full flex-shrink-0"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {block.duration}
          </span>
        )}
      </div>
      {block.overview && (
        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
          {block.overview}
        </p>
      )}
      {block.desc && (
        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
          {block.desc}
        </p>
      )}
      <ol className="space-y-2">
        {block.steps.map((step, i) => (
          <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {i + 1}
            </span>
            <span className="leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
